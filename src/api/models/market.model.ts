import {
  ShipEngineSymbol,
  ShipModuleSymbol,
  ShipMountSymbol,
  ShipReactorSymbol,
} from '@/api/models/ship.model';
import { DateString } from '@/api/models/misc.types';

export enum TradeGoodSymbol {
  PreciousStones = 'PRECIOUS_STONES',
  QuartzSand = 'QUARTZ_SAND',
  SiliconCrystals = 'SILICON_CRYSTALS',
  AmmoniaIce = 'AMMONIA_ICE',
  LiquidHydrogen = 'LIQUID_HYDROGEN',
  LiquidNitrogen = 'LIQUID_NITROGEN',
  IceWater = 'ICE_WATER',
  ExoticMatter = 'EXOTIC_MATTER',
  AdvancedCircuitry = 'ADVANCED_CIRCUITRY',
  GravitonEmitters = 'GRAVITON_EMITTERS',
  Iron = 'IRON',
  IronOre = 'IRON_ORE',
  Copper = 'COPPER',
  CopperOre = 'COPPER_ORE',
  Aluminum = 'ALUMINUM',
  AluminumOre = 'ALUMINUM_ORE',
  Silver = 'SILVER',
  SilverOre = 'SILVER_ORE',
  Gold = 'GOLD',
  GoldOre = 'GOLD_ORE',
  Platinum = 'PLATINUM',
  PlatinumOre = 'PLATINUM_ORE',
  Diamonds = 'DIAMONDS',
  Uranite = 'URANITE',
  UraniteOre = 'URANITE_ORE',
  Meritium = 'MERITIUM',
  MeritiumOre = 'MERITIUM_ORE',
  Hydrocarbon = 'HYDROCARBON',
  Antimatter = 'ANTIMATTER',
  Fertilizers = 'FERTILIZERS',
  Fabrics = 'FABRICS',
  Food = 'FOOD',
  Jewelry = 'JEWELRY',
  Machinery = 'MACHINERY',
  Firearms = 'FIREARMS',
  AssaultRifles = 'ASSAULT_RIFLES',
  MilitaryEquipment = 'MILITARY_EQUIPMENT',
  Explosives = 'EXPLOSIVES',
  LabInstruments = 'LAB_INSTRUMENTS',
  Ammunition = 'AMMUNITION',
  Electronics = 'ELECTRONICS',
  ShipPlating = 'SHIP_PLATING',
  ShipParts = 'SHIP_PARTS',
  Equipment = 'EQUIPMENT',
  Fuel = 'FUEL',
  Medicine = 'MEDICINE',
  Drugs = 'DRUGS',
  Clothing = 'CLOTHING',
  Microprocessors = 'MICROPROCESSORS',
  Plastics = 'PLASTICS',
  QuantumStabilizers = 'QUANTUM_STABILIZERS',
  Polynucleotides = 'POLYNUCLEOTIDES',
  Biocomposites = 'BIOCOMPOSITES',
  Nanobots = 'NANOBOTS',
  AIMainframes = 'AI_MAINFRAMES',
  QuantumDrives = 'QUANTUM_DRIVES',
  RoboticDrones = 'ROBOTIC_DRONES',
  CyberImplants = 'CYBER_IMPLANTS',
  GeneTherapeutics = 'GENE_THERAPEUTICS',
  NeuralChips = 'NEURAL_CHIPS',
  MoodRegulators = 'MOOD_REGULATORS',
  ViralAgents = 'VIRAL_AGENTS',
  MicroFusionGenerators = 'MICRO_FUSION_GENERATORS',
  Supergrains = 'SUPERGRAINS',
  LaserRifles = 'LASER_RIFLES',
  Holographics = 'HOLOGRAPHICS',
  ShipSalvage = 'SHIP_SALVAGE',
  RelicTech = 'RELIC_TECH',
  NovelLifeforms = 'NOVEL_LIFEFORMS',
  BotanicalSpecimens = 'BOTANICAL_SPECIMENS',
  CulturalArtifacts = 'CULTURAL_ARTIFACTS',
  FabMats = 'FAB_MATS',
}

export type TradeSymbol =
  | TradeGoodSymbol
  | ShipReactorSymbol
  | ShipEngineSymbol
  | ShipModuleSymbol
  | ShipMountSymbol;

export const TradeSymbolValues = {
  ...TradeGoodSymbol,
  ...ShipReactorSymbol,
  ...ShipEngineSymbol,
  ...ShipModuleSymbol,
  ...ShipMountSymbol,
};

export interface TradeGood {
  symbol: TradeSymbol;
  name: string;
  description: string;
}

export enum TradeType {
  Export = 'EXPORT',
  Import = 'IMPORT',
  Exchange = 'EXCHANGE',
}

export enum TradeSupply {
  Scarce = 'SCARCE',
  Limited = 'LIMITED',
  Moderate = 'MODERATE',
  High = 'HIGH',
  Abundant = 'ABUNDANT',
}

export enum TradeActivity {
  Weak = 'WEAK',
  Growing = 'GROWING',
  Strong = 'STRONG',
}

export interface MarketTradeGood {
  symbol: TradeSymbol;
  type: TradeType;
  tradeVolume: number;
  supply: TradeSupply;
  activity: TradeActivity;
  purchasePrice: number;
  sellPrice: number;
}

export enum TransactionType {
  Purchase = 'PURCHASE',
  Sell = 'SELL',
}

export interface MarketTransaction {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: TradeSymbol;
  type: TransactionType;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: DateString;
}

export interface Market {
  symbol: string;
  exports: TradeGood[];
  imports: TradeGood[];
  exchange: TradeGood[];
  tradeGoods: MarketTradeGood[];
  transactions: MarketTransaction[];
}
