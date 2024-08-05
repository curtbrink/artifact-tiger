import { DateString } from '@/api/models/misc.types';
import {
  ShipEngine,
  ShipFrame,
  ShipModule,
  ShipMount,
  ShipReactor,
} from '@/api/models/ship.model';

export interface ShipyardTransaction {
  waypointSymbol: string;
  shipSymbol: string;
  price: number;
  agentSymbol: string;
  timestamp: DateString;
}

export enum ShipyardShipType {
  Probe = 'SHIP_PROBE',
  MiningDrone = 'SHIP_MINING_DRONE',
  Interceptor = 'SHIP_INTERCEPTOR',
  LightHauler = 'SHIP_LIGHT_HAULER',
  CommandFrigate = 'SHIP_COMMAND_FRIGATE',
  Explorer = 'SHIP_EXPLORER',
  HeavyFreighter = 'SHIP_HEAVY_FREIGHTER',
  LightShuttle = 'SHIP_LIGHT_SHUTTLE',
  OreHound = 'SHIP_ORE_HOUND',
  RefiningFreighter = 'SHIP_REFINING_FREIGHTER',
}

export interface ShipyardShip {
  type: ShipyardShipType;
  name: string;
  description: string;
  purchasePrice: number;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  modules: ShipModule[];
  mounts: ShipMount[];
}

export interface Shipyard {
  symbol: string;
  shipTypes: Pick<ShipyardShip, 'type'>[];
  transactions: ShipyardTransaction[];
  ships: ShipyardShip[];
}
