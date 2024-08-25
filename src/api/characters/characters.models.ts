import { BankItem, Item } from '../items/items.models';

export enum CharacterSkin {
  Man1 = 'men1',
  Man2 = 'men2',
  Man3 = 'men3',
  Woman1 = 'women1',
  Woman2 = 'women2',
  Woman3 = 'women3',
}

export interface InventorySlot {
  slot: number;
  code: string;
  quantity: number;
}

export enum EquipSlot {
  Weapon = 'weapon',
  Shield = 'shield',
  Helmet = 'helmet',
  BodyArmor = 'body_armor',
  LegArmor = 'leg_armor',
  Boots = 'boots',
  Ring1 = 'ring1',
  Ring2 = 'ring2',
  Amulet = 'amulet',
  Artifact1 = 'artifact1',
  Artifact2 = 'artifact2',
  Artifact3 = 'artifact3',
  Consumable1 = 'consumable1',
  Consumable2 = 'consumable2',
}

export interface Character {
  name: string;
  skin: CharacterSkin;

  level: number;
  xp: number;
  max_xp: number;
  total_xp: number;

  gold: number;
  speed: number;

  mining_level: number;
  mining_xp: number;
  mining_max_xp: number;

  woodcutting_level: number;
  woodcutting_xp: number;
  woodcutting_max_xp: number;

  fishing_level: number;
  fishing_xp: number;
  fishing_max_xp: number;

  weaponcrafting_level: number;
  weaponcrafting_xp: number;
  weaponcrafting_max_xp: number;

  gearcrafting_level: number;
  gearcrafting_xp: number;
  gearcrafting_max_xp: number;

  jewelrycrafting_level: number;
  jewelrycrafting_xp: number;
  jewelrycrafting_max_xp: number;

  cooking_level: number;
  cooking_xp: number;
  cooking_max_xp: number;

  hp: number;
  haste: number;
  critical_strike: number;
  stamina: number;

  attack_fire: number;
  attack_earth: number;
  attack_water: number;
  attack_air: number;

  dmg_fire: number;
  dmg_earth: number;
  dmg_water: number;
  dmg_air: number;

  res_fire: number;
  res_earth: number;
  res_water: number;
  res_air: number;

  x: number;
  y: number;

  cooldown: number;
  cooldown_expiration: string;

  weapon_slot: string;
  shield_slot: string;
  helmet_slot: string;
  body_armor_slot: string;
  leg_armor_slot: string;
  boots_slot: string;
  ring1_slot: string;
  ring2_slot: string;
  amulet_slot: string;
  artifact1_slot: string;
  artifact2_slot: string;
  artifact3_slot: string;
  consumable1_slot: string;
  consumable1_slot_quantity: number;
  consumable2_slot: string;
  consumable2_slot_quantity: number;

  task: string;
  task_type: string;
  task_progress: number;
  task_total: number;

  inventory_max_items: number;
  inventory: InventorySlot[];
}

export interface MoveCharacterRequest {
  x: number;
  y: number;
}

export interface MoveCharacterResponse {
  cooldown: any; // todo type
  destination: any; // todo type
  character: Character;
}

export interface FightResponse {
  cooldown: any; // todo type
  fight: any; // todo type
  character: Character;
}

export interface GatheringResponse {
  cooldown: any; // todo type
  details: any; // todo type
  character: Character;
}

export interface UnequipResponse {
  cooldown: any;
  slot: EquipSlot;
  item: any;
  character: Character;
}

export interface DepositBankRequest {
  quantity: number;
  code: string;
}

export interface DepositBankResponse {
  cooldown: any;
  item: Item;
  bank: BankItem[];
  character: Character;
}
