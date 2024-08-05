import { defineStore } from 'pinia';
import {
  Ship,
  ShipCargo,
  ShipCooldown,
  ShipFuel,
  ShipNavigation,
  ShipNavigationStatus,
} from '@/api/models/ship.model';
import shipApi from '@/api/api/ship/ship.api';
import { iteratePagedData } from '@/api/models/misc.types';
import { useCurrentLocationStore } from '@/store/current-location';
import { useAgentStore } from '@/store/agent';
import browserStorageService from '@/services/browser-storage.service';
import { useSnackbar } from '@/store/snackbar';
import { TradeGoodSymbol } from '@/api/models/market.model';

export const useShipStore = defineStore('ship', {
  state: () => ({
    ships: [] as Ship[],
    selectedShip: undefined as Ship | undefined,
    autoExtractingShips: [] as string[],
  }),
  actions: {
    async getAllShips() {
      this.ships = await iteratePagedData(shipApi.getMyShips);
      await this.selectShip();
    },
    async ensureLoaded() {
      if (!this.selectedShip) {
        if (!this.ships.length) {
          return this.getAllShips();
        } else {
          return this.selectShip();
        }
      }
      return;
    },
    async selectShip(symbol?: string) {
      const shipIdToFind =
        symbol ?? browserStorageService.getSelectedShip() ?? '';
      const foundShip = this.ships.find((it) => it.symbol === shipIdToFind);

      this.selectedShip = foundShip ? foundShip : this.ships[0];

      browserStorageService.setSelectedShip(this.selectedShip.symbol);

      const currentLocationStore = useCurrentLocationStore();
      await currentLocationStore.updateCurrentLocation(this.selectedShip.nav);
    },
    async addShip(ship: Ship) {
      this.ships.push(ship);
    },
    async dockShip(symbol: string) {
      const response = await shipApi.dockShip(symbol);
      await this.patchNav(symbol, response.data.nav);

      const snackbar = useSnackbar();
      snackbar.showError('you just docked the ship!');
    },
    async orbitShip(symbol: string) {
      const response = await shipApi.orbitShip(symbol);
      await this.patchNav(symbol, response.data.nav);
    },
    async navigateSelectedShip(waypoint: string) {
      if (
        !this.selectedShip ||
        this.selectedShip.nav.status === ShipNavigationStatus.InTransit
      ) {
        return;
      }
      if (this.selectedShip.nav.status !== ShipNavigationStatus.InOrbit) {
        await this.orbitShip(this.selectedShip.symbol);
      }
      const navigationResponse = await shipApi.navigateShip(
        this.selectedShip.symbol,
        waypoint,
      );
      const { nav, fuel } = navigationResponse.data;
      await this.patchNav(this.selectedShip.symbol, nav);
      await this.patchFuel(this.selectedShip.symbol, fuel);

      const currentLocationStore = useCurrentLocationStore();
      await currentLocationStore.updateCurrentLocation(nav);
    },
    async refreshNav(shipSymbol: string) {
      const response = await shipApi.refreshShipNav(shipSymbol);
      await this.patchShipProperty(shipSymbol, 'nav', response.data);
    },
    async refreshCooldown(shipSymbol: string) {
      const response = await shipApi.refreshShipCooldown(shipSymbol);
      const newCooldown = response.data ? response.data : { totalSeconds: 0 };
      await this.patchShipProperty(shipSymbol, 'cooldown', newCooldown);
    },
    async refuelShip(shipSymbol: string) {
      const response = await shipApi.refuelShip(shipSymbol);
      const agentStore = useAgentStore();
      agentStore.setAgent(response.data.agent);
      await this.patchFuel(shipSymbol, response.data.fuel);
    },
    async extractResources(shipSymbol: string, auto?: boolean) {
      const snackbar = useSnackbar();
      this.autoExtractingShips = this.autoExtractingShips.filter(
        (it) => it !== shipSymbol,
      );
      const response = await shipApi.extractResources(shipSymbol);
      await this.patchCooldown(shipSymbol, response.data.cooldown);
      await this.patchCargo(shipSymbol, response.data.cargo);
      snackbar.showError(
        `${shipSymbol} received ${response.data.extraction.yield.units} ${response.data.extraction.yield.symbol}`,
      );

      if (auto) {
        // nice, let's try automating until full

        // first off, apply cargo whitelist (configurable later but hardcoded for now)
        const cargoWhitelist = [
          TradeGoodSymbol.IronOre,
          TradeGoodSymbol.AluminumOre,
          TradeGoodSymbol.CopperOre,
        ];
        if (!cargoWhitelist.includes(response.data.extraction.yield.symbol)) {
          // immediately jettison
          await this.jettisonCargo(
            shipSymbol,
            response.data.extraction.yield.symbol,
            response.data.extraction.yield.units,
          );
        } else if (response.data.cargo.units === response.data.cargo.capacity) {
          // check for full cargo first and stop if full
          snackbar.showError(
            `${shipSymbol} has halted extraction due to full cargo!`,
          );
          return;
        }

        this.autoExtractingShips.push(shipSymbol);
        const timeout = response.data.cooldown.remainingSeconds * 1000 + 1000; // remaining seconds plus one as a buffer
        setTimeout(async () => {
          await this.extractResources(shipSymbol, true);
        }, timeout);
      }
    },
    async sellCargo(shipSymbol: string, cargoType: string, amount: number) {
      const payload = {
        symbol: cargoType,
        units: amount,
      };
      const response = await shipApi.sellCargo(shipSymbol, payload);
      await this.patchCargo(shipSymbol, response.data.cargo);
      const agentStore = useAgentStore();
      agentStore.setAgent(response.data.agent);
    },
    async jettisonCargo(shipSymbol: string, cargoType: string, amount: number) {
      const payload = {
        symbol: cargoType,
        units: amount,
      };
      const response = await shipApi.jettisonCargo(shipSymbol, payload);
      await this.patchCargo(shipSymbol, response.data.cargo);

      useSnackbar().showError(
        `${shipSymbol} jettisoned cargo: ${amount} units of ${cargoType}`,
      );
    },
    async patchNav(shipSymbol: string, newNav: ShipNavigation) {
      console.log('patchNav');
      await this.patchShipProperty(shipSymbol, 'nav', newNav);
    },
    async patchFuel(shipSymbol: string, newFuel: ShipFuel) {
      await this.patchShipProperty(shipSymbol, 'fuel', newFuel);
    },
    async patchCooldown(shipSymbol: string, newCooldown: ShipCooldown) {
      await this.patchShipProperty(shipSymbol, 'cooldown', newCooldown);
    },
    async patchCargo(shipSymbol: string, newCargo: ShipCargo) {
      await this.patchShipProperty(shipSymbol, 'cargo', newCargo);
    },
    async patchShipProperty(symbol: string, prop: string, val: any) {
      const ship = this.ships.find((it) => it.symbol === symbol);
      if (!ship) {
        const selectedShipSymbol = this.selectedShip?.symbol;
        await this.reloadAndSelect(selectedShipSymbol);
      } else {
        // @ts-ignore
        ship[prop] = val;
      }
    },
    async reloadAndSelect(shipSymbol?: string) {
      await this.getAllShips();
      if (shipSymbol) {
        await this.selectShip(shipSymbol);
      }
    },
  },
  getters: {
    totalShips: (state) => state.ships.length,
  },
});
