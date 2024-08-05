import { DateString } from '@/api/models/misc.types';

export enum WaypointType {
  Planet = 'PLANET',
  GasGiant = 'GAS_GIANT',
  Moon = 'MOON',
  OrbitalStation = 'ORBITAL_STATION',
  JumpGate = 'JUMP_GATE',
  AsteroidField = 'ASTEROID_FIELD',
  Nebula = 'NEBULA',
  DebrisField = 'DEBRIS_FIELD',
  GravityWell = 'GRAVITY_WELL',
  Asteroid = 'ASTEROID',
  EngineeredAsteroid = 'ENGINEERED_ASTEROID',
  AsteroidBase = 'ASTEROID_BASE',
  ArtificialGravityWell = 'ARTIFICIAL_GRAVITY_WELL',
  FuelStation = 'FUEL_STATION',
}

export interface WaypointOrbital {
  symbol: string;
}

export interface WaypointFaction {
  symbol: string;
}

export enum WaypointTraitSymbol {
  Uncharted = 'UNCHARTED',
  Marketplace = 'MARKETPLACE',
  Shipyard = 'SHIPYARD',
  Outpost = 'OUTPOST',
  ScatteredSettlements = 'SCATTERED_SETTLEMENTS',
  SprawlingCities = 'SPRAWLING_CITIES',
  MegaStructures = 'MEGA_STRUCTURES',
  Overcrowded = 'OVERCROWDED',
  HighTech = 'HIGH_TECH',
  Corrupt = 'CORRUPT',
  Bureaucratic = 'BUREAUCRATIC',
  TradingHub = 'TRADING_HUB',
  Industrial = 'INDUSTRIAL',
  BlackMarket = 'BLACK_MARKET',
  ResearchFacility = 'RESEARCH_FACILITY',
  MilitaryBase = 'MILITARY_BASE',
  SurveillanceOutpost = 'SURVEILLANCE_OUTPOST',
  ExplorationOutpost = 'EXPLORATION_OUTPOST',
  MineralDeposits = 'MINERAL_DEPOSITS',
  CommonMetalDeposits = 'COMMON_METAL_DEPOSITS',
  PreciousMetalDeposits = 'PRECIOUS_METAL_DEPOSITS',
  RareMetalDeposits = 'RARE_METAL_DEPOSITS',
  MethanePools = 'METHANE_POOLS',
  IceCrystals = 'ICE_CRYSTALS',
  ExplosiveGases = 'EXPLOSIVE_GASES',
  StrongMagnetosphere = 'STRONG_MAGNETOSPHERE',
  VibrantAuroras = 'VIBRANT_AURORAS',
  SaltFlats = 'SALT_FLATS',
  Canyons = 'CANYONS',
  PerpetualDaylight = 'PERPETUAL_DAYLIGHT',
  PerpetualOvercast = 'PERPETUAL_OVERCAST',
  DrySeabeds = 'DRY_SEABEDS',
  MagmaSeas = 'MAGMA_SEAS',
  Supervolcanoes = 'SUPERVOLCANOES',
  AshClouds = 'ASH_CLOUDS',
  VastRuins = 'VAST_RUINS',
  MutatedFlora = 'MUTATED_FLORA',
  Terraformed = 'TERRAFORMED',
  ExtremeTemperatures = 'EXTREME_TEMPERATURES',
  ExtremePressure = 'EXTREME_PRESSURE',
  DiverseLife = 'DIVERSE_LIFE',
  ScarceLife = 'SCARCE_LIFE',
  Fossils = 'FOSSILS',
  WeakGravity = 'WEAK_GRAVITY',
  StrongGravity = 'STRONG_GRAVITY',
  CrushingGravity = 'CRUSHING_GRAVITY',
  ToxicAtmosphere = 'TOXIC_ATMOSPHERE',
  CorrosiveAtmosphere = 'CORROSIVE_ATMOSPHERE',
  BreathableAtmosphere = 'BREATHABLE_ATMOSPHERE',
  Jovian = 'JOVIAN',
  Rocky = 'ROCKY',
  Volcanic = 'VOLCANIC',
  Frozen = 'FROZEN',
  Swamp = 'SWAMP',
  Barren = 'BARREN',
  Temperate = 'TEMPERATE',
  Jungle = 'JUNGLE',
  Ocean = 'OCEAN',
  Stripped = 'STRIPPED',
}

export interface WaypointTrait {
  symbol: WaypointTraitSymbol;
  name: string;
  description: string;
}

export interface Chart {
  waypointSymbol: string;
  submittedBy: string;
  submittedOn: DateString;
}

export interface Waypoint {
  symbol: string;
  type: WaypointType;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: WaypointOrbital[];
  factions: WaypointFaction[];
  traits: WaypointTrait[];
  chart: Chart;
}
