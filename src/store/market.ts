import { defineStore } from 'pinia';
import { Market, TradeGoodSymbol } from '@/api/models/market.model';
import waypointApi from '@/api/api/waypoint/waypoint.api';

export const useMarketStore = defineStore('market', {
  state: () => ({
    currentMarket: undefined as Market | undefined,
    waypointMarkets: [] as Market[],
  }),
  actions: {
    clearMarket() {
      this.currentMarket = undefined;
    },
    async getMarketForWaypoint(systemSymbol: string, waypointSymbol: string) {
      const response = await waypointApi.getMarketForWaypoint(
        systemSymbol,
        waypointSymbol,
      );
      this.currentMarket = response.data;
    },
    async getMarketsForWaypoints(
      waypoints: { systemSymbol: string; waypointSymbol: string }[],
    ) {
      this.waypointMarkets = [];
      for (const wp of waypoints) {
        const response = await waypointApi.getMarketForWaypoint(
          wp.systemSymbol,
          wp.waypointSymbol,
        );
        this.waypointMarkets.push(response.data);
      }
    },
  },
  getters: {
    marketAccessible(): boolean {
      return !!this.currentMarket && !!this.currentMarket.tradeGoods;
    },
    canRefuel(): boolean {
      return (
        !!this.currentMarket &&
        this.currentMarket.tradeGoods &&
        this.currentMarket.tradeGoods
          .map((it) => it.symbol)
          .includes(TradeGoodSymbol.Fuel)
      );
    },
  },
});
