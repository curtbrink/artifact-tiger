import { Waypoint } from '@/api/models/waypoint.model';
import { DateString } from '@/api/models/misc.types';
import { TradeGood, TradeGoodSymbol } from '@/api/models/market.model';

export enum ShipRole {
  Fabricator = 'FABRICATOR',
  Harvester = 'HARVESTER',
  Hauler = 'HAULER',
  Interceptor = 'INTERCEPTOR',
  Excavator = 'EXCAVATOR',
  Transport = 'TRANSPORT',
  Repair = 'REPAIR',
  Surveyor = 'SURVEYOR',
  Command = 'COMMAND',
  Carrier = 'CARRIER',
  Patrol = 'PATROL',
  Satellite = 'SATELLITE',
  Explorer = 'EXPLORER',
  Refinery = 'REFINERY',
}

export interface ShipRegistration {
  name: string;
  factionSymbol: string;
  role: ShipRole;
}

export type ShipNavigationRouteWaypoint = Pick<
  Waypoint,
  'symbol' | 'type' | 'systemSymbol' | 'x' | 'y'
>;

export interface ShipNavigationRoute {
  destination: ShipNavigationRouteWaypoint;
  origin: ShipNavigationRouteWaypoint;
  departureTime: DateString;
  arrival: DateString;
}

export enum ShipNavigationStatus {
  InTransit = 'IN_TRANSIT',
  InOrbit = 'IN_ORBIT',
  Docked = 'DOCKED',
}

export enum ShipNavigationFlightMode {
  Drift = 'DRIFT',
  Stealth = 'STEALTH',
  Cruise = 'CRUISE',
  Burn = 'BURN',
}

export interface ShipNavigation {
  systemSymbol: string;
  waypointSymbol: string;
  route: ShipNavigationRoute;
  status: ShipNavigationStatus;
  flightMode: ShipNavigationFlightMode;
}

export enum ShipCrewRotation {
  Strict = 'STRICT',
  Relaxed = 'RELAXED',
}

export interface ShipCrew {
  current: number;
  required: number;
  capacity: number;
  rotation: ShipCrewRotation;
  morale: number;
  wages: number;
}

export enum ShipFrameSymbol {
  Probe = 'FRAME_PROBE',
  Drone = 'FRAME_DRONE',
  Interceptor = 'FRAME_INTERCEPTOR',
  Racer = 'FRAME_RACER',
  Fighter = 'FRAME_FIGHTER',
  Frigate = 'FRAME_FRIGATE',
  Shuttle = 'FRAME_SHUTTLE',
  Explorer = 'FRAME_EXPLORER',
  Miner = 'FRAME_MINER',
  LightFreighter = 'FRAME_LIGHT_FREIGHTER',
  HeavyFreighter = 'FRAME_HEAVY_FREIGHTER',
  Transport = 'FRAME_TRANSPORT',
  Destroyer = 'FRAME_DESTROYER',
  Cruiser = 'FRAME_CRUISER',
  Carrier = 'FRAME_CARRIER',
}

export interface ShipRequirements {
  power: number;
  crew: number;
  slots: number;
}

export interface ShipFrame {
  symbol: ShipFrameSymbol;
  name: string;
  description: string;
  condition: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: ShipRequirements;
}

export enum ShipReactorSymbol {
  SolarI = 'REACTOR_SOLAR_I',
  FusionI = 'REACTOR_FUSION_I',
  FissionI = 'REACTOR_FISSION_I',
  ChemicalI = 'REACTOR_CHEMICAL_I',
  AntimatterI = 'REACTOR_ANTIMATTER_I',
}

export interface ShipReactor {
  symbol: ShipReactorSymbol;
  name: string;
  description: string;
  condition: number;
  powerOutput: number;
  requirements: ShipRequirements;
}

export enum ShipEngineSymbol {
  ImpulseDriveI = 'ENGINE_IMPULSE_DRIVE_I',
  IonDriveI = 'ENGINE_ION_DRIVE_I',
  IonDriveII = 'ENGINE_ION_DRIVE_II',
  HyperDriveI = 'ENGINE_HYPER_DRIVE_I',
}

export interface ShipEngine {
  symbol: ShipEngineSymbol;
  name: string;
  description: string;
  condition: number;
  speed: number;
  requirements: ShipRequirements;
}

export enum ShipModuleSymbol {
  MineralProcessorI = 'MODULE_MINERAL_PROCESSOR_I',
  CargoHoldI = 'MODULE_CARGO_HOLD_I',
  CrewQuartersI = 'MODULE_CREW_QUARTERS_I',
  EnvoyQuartersI = 'MODULE_ENVOY_QUARTERS_I',
  PassengerCabinI = 'MODULE_PASSENGER_CABIN_I',
  MicroRefineryI = 'MODULE_MICRO_REFINERY_I',
  OreRefineryI = 'MODULE_ORE_REFINERY_I',
  FuelRefineryI = 'MODULE_FUEL_REFINERY_I',
  ScienceLabI = 'MODULE_SCIENCE_LAB_I',
  JumpDriveI = 'MODULE_JUMP_DRIVE_I',
  JumpDriveII = 'MODULE_JUMP_DRIVE_II',
  JumpDriveIII = 'MODULE_JUMP_DRIVE_III',
  WarpDriveI = 'MODULE_WARP_DRIVE_I',
  WarpDriveII = 'MODULE_WARP_DRIVE_II',
  WarpDriveIII = 'MODULE_WARP_DRIVE_III',
  ShieldGeneratorI = 'MODULE_SHIELD_GENERATOR_I',
  ShieldGeneratorII = 'MODULE_SHIELD_GENERATOR_II',
}

export interface ShipModule {
  symbol: ShipModuleSymbol;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: ShipRequirements;
}

export enum ShipMountSymbol {
  GasSiphonI = 'MOUNT_GAS_SIPHON_I',
  GasSiphonII = 'MOUNT_GAS_SIPHON_II',
  GasSiphonIII = 'MOUNT_GAS_SIPHON_III',
  SurveyorI = 'MOUNT_SURVEYOR_I',
  SurveyorII = 'MOUNT_SURVEYOR_II',
  SurveyorIII = 'MOUNT_SURVEYOR_III',
  SensorArrayI = 'MOUNT_SENSOR_ARRAY_I',
  SensorArrayII = 'MOUNT_SENSOR_ARRAY_II',
  SensorArrayIII = 'MOUNT_SENSOR_ARRAY_III',
  MiningLaserI = 'MOUNT_MINING_LASER_I',
  MiningLaserII = 'MOUNT_MINING_LASER_II',
  MiningLaserIII = 'MOUNT_MINING_LASER_III',
  LaserCannonI = 'MOUNT_LASER_CANNON_I',
  MissileLauncherI = 'MOUNT_MISSILE_LAUNCHER_I',
  TurretI = 'MOUNT_TURRET_I',
}

export enum ShipMountDeposit {
  QuartzSand = 'QUARTZ_SAND',
  SiliconCrystals = 'SILICON_CRYSTALS',
  PreciousStones = 'PRECIOUS_STONES',
  IceWater = 'ICE_WATER',
  AmmoniaIce = 'AMMONIA_ICE',
  IronOre = 'IRON_ORE',
  CopperOre = 'COPPER_ORE',
  SilverOre = 'SILVER_ORE',
  AluminumOre = 'ALUMINUM_ORE',
  GoldOre = 'GOLD_ORE',
  PlatinumOre = 'PLATINUM_ORE',
  Diamonds = 'DIAMONDS',
  UraniteOre = 'URANITE_ORE',
  MeritiumOre = 'MERITIUM_ORE',
}

export interface ShipMount {
  symbol: ShipMountSymbol;
  name: string;
  description: string;
  strength: number;
  deposits: ShipMountDeposit[];
  requirements: ShipRequirements;
}

export interface ShipCargoItem {
  symbol: TradeGoodSymbol;
  name: string;
  description: string;
  units: number;
}

export interface ShipCargo {
  capacity: number;
  units: number;
  inventory: ShipCargoItem[];
}

export interface ShipFuelConsumption {
  amount: number;
  timestamp: DateString;
}

export interface ShipFuel {
  current: number;
  capacity: number;
  consumed: ShipFuelConsumption;
}

export interface ShipCooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: DateString;
}

export interface Ship {
  symbol: string;
  registration: ShipRegistration;
  nav: ShipNavigation;
  crew: ShipCrew;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  modules: ShipModule[];
  mounts: ShipMount[];
  cargo: ShipCargo;
  fuel: ShipFuel;
  cooldown: ShipCooldown;
}
