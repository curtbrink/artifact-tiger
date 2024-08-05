import spacetradersApi from '@/api/api/spacetraders.api';
import { PagedResponseData, ResponseData } from '@/api/models/misc.types';
import { Waypoint } from '@/api/models/waypoint.model';
import { Shipyard } from '@/api/models/shipyard.model';
import { Market } from '@/api/models/market.model';

const waypointApi = {
  getWaypointsForSystem: (system: string, limit: number, page: number) =>
    `systems/${system}/waypoints?page=${page}&limit=${limit}`,
  getShipyardForWaypoint: (system: string, waypoint: string) =>
    `systems/${system}/waypoints/${waypoint}/shipyard`,
  getMarketForWaypoint: (system: string, waypoint: string) =>
    `systems/${system}/waypoints/${waypoint}/market`,
};

export default {
  getWaypointCallbackForSystem(
    systemId: string,
  ): (limit: number, page: number) => Promise<PagedResponseData<Waypoint>> {
    const sysId = systemId;
    return (limit, page) => {
      return spacetradersApi
        .get(waypointApi.getWaypointsForSystem(sysId, limit, page))
        .then((res) => res.data);
    };
  },

  async getShipyardForWaypoint(
    systemSymbol: string,
    waypointSymbol: string,
  ): Promise<ResponseData<Shipyard>> {
    return spacetradersApi
      .get(waypointApi.getShipyardForWaypoint(systemSymbol, waypointSymbol))
      .then((res) => res.data);
  },

  async getMarketForWaypoint(
    systemSymbol: string,
    waypointSymbol: string,
  ): Promise<ResponseData<Market>> {
    return spacetradersApi
      .get(waypointApi.getMarketForWaypoint(systemSymbol, waypointSymbol))
      .then((res) => res.data);
  },
};
