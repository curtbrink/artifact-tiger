import { ShipyardShipType } from '@/api/models/shipyard.model';

export interface NavigateShipRequest {
  waypointSymbol: string;
}

export interface PurchaseShipRequest {
  shipType: ShipyardShipType;
  waypointSymbol: string;
}
