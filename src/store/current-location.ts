import { defineStore } from 'pinia';
import { Waypoint, WaypointTraitSymbol } from '@/api/models/waypoint.model';
import { ShipNavigation } from '@/api/models/ship.model';
import { iteratePagedData } from '@/api/models/misc.types';
import waypointApi from '@/api/api/waypoint/waypoint.api';
import { Market } from '@/api/models/market.model';
import { useMarketStore } from '@/store/market';
import { useShipyardStore } from '@/store/shipyard';

function waypointHasTrait(trait: WaypointTraitSymbol, waypoint?: Waypoint) {
  if (!waypoint) {
    return false;
  }
  return waypoint.traits.map((it) => it.symbol).includes(trait);
}

export const useCurrentLocationStore = defineStore('currentLocation', {
  state: () => ({
    currentSystemSymbol: undefined as string | undefined,
    currentWaypointSymbol: undefined as string | undefined,

    systemWaypoints: [] as Waypoint[],
    currentWaypoint: undefined as Waypoint | undefined,

    market: undefined as Market | undefined,
  }),
  actions: {
    async updateCurrentLocation(nav: ShipNavigation) {
      const systemChanged = this.currentSystemSymbol !== nav.systemSymbol;
      this.currentSystemSymbol = nav.systemSymbol;
      this.currentWaypointSymbol = nav.waypointSymbol;

      if (systemChanged || this.systemWaypoints.length === 0) {
        this.systemWaypoints = await iteratePagedData(
          waypointApi.getWaypointCallbackForSystem(this.currentSystemSymbol),
        );

        const marketStore = useMarketStore();
        const marketWaypoints = this.systemWaypoints
          .filter((wp) => waypointHasTrait(WaypointTraitSymbol.Marketplace, wp))
          .map((wp) => ({
            systemSymbol: wp.systemSymbol,
            waypointSymbol: wp.symbol,
          }));
        await marketStore.getMarketsForWaypoints(marketWaypoints);
      }
      this.currentWaypoint = this.systemWaypoints.find(
        (it) => it.symbol === this.currentWaypointSymbol,
      );

      // grab market data if market is available
      const marketStore = useMarketStore();
      if (
        waypointHasTrait(WaypointTraitSymbol.Marketplace, this.currentWaypoint)
      ) {
        await marketStore.getMarketForWaypoint(
          this.currentSystemSymbol,
          this.currentWaypointSymbol,
        );
      } else {
        marketStore.clearMarket();
      }

      // grab shipyard data if shipyard is available
      const shipyardStore = useShipyardStore();
      if (
        waypointHasTrait(WaypointTraitSymbol.Shipyard, this.currentWaypoint)
      ) {
        await shipyardStore.getShipyardForWaypoint(
          this.currentSystemSymbol,
          this.currentWaypointSymbol,
        );
      } else {
        shipyardStore.clearShipyard();
      }
    },
  },
  getters: {},
});
