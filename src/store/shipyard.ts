import { defineStore } from 'pinia';
import waypointApi from '@/api/api/waypoint/waypoint.api';
import { Shipyard, ShipyardShipType } from '@/api/models/shipyard.model';
import { useShipStore } from '@/store/ship';
import shipApi from '@/api/api/ship/ship.api';
import { useAgentStore } from '@/store/agent';

export const useShipyardStore = defineStore('shipyard', {
  state: () => ({
    shipyardSystemSymbol: undefined as string | undefined,
    currentShipyard: undefined as Shipyard | undefined,
  }),
  actions: {
    clearShipyard() {
      this.currentShipyard = undefined;
    },
    async getShipyardForWaypoint(systemSymbol: string, waypointSymbol: string) {
      this.shipyardSystemSymbol = systemSymbol;
      const shipyardResponse = await waypointApi.getShipyardForWaypoint(
        systemSymbol,
        waypointSymbol,
      );
      this.currentShipyard = shipyardResponse.data;
    },
    async purchaseShip(shipType: ShipyardShipType) {
      if (!this.currentShipyard || !this.shipyardSystemSymbol) {
        return;
      }
      const waypoint = this.currentShipyard.symbol;
      const purchaseShipResponse = await shipApi.purchaseShip(
        shipType,
        waypoint,
      );
      const { agent, ship } = purchaseShipResponse.data;

      const agentStore = useAgentStore();
      agentStore.setAgent(agent);
      const shipStore = useShipStore();
      await shipStore.addShip(ship);

      await this.getShipyardForWaypoint(
        this.shipyardSystemSymbol,
        this.currentShipyard.symbol,
      );
    },
  },
  getters: {
    shipyardAccessible(): boolean {
      return !!this.currentShipyard;
    },
  },
});
