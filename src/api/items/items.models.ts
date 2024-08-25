export enum CraftingSkill {
  Weaponcrafting = 'weaponcrafting',
  Gearcrafting = 'gearcrafting',
  Jewelrycrafting = 'jewelrycrafting',
  Cooking = 'cooking',
  Mining = 'mining',
  Woodcutting = 'woodcutting',
  Fishing = 'fishing',
}

export interface ItemEffect {
  name: string;
  value: string;
}

export interface ItemCraftComponent {
  code: string;
  quantity: number;
}

export interface ItemCraft {
  skill: CraftingSkill;
  level: number;
  quantity: number;
  items: ItemCraftComponent[];
}

export interface Item {
  name: string;
  code: string;
  level: number;
  type: string;
  subtype: string;
  description: string;
  effects: ItemEffect[];
  craft: ItemCraft;
}

export interface BankItem {
  code: string;
  quantity: number;
}

export enum ItemType {
  Consumable = 'consumable',
  BodyArmor = 'body_armor',
  Weapon = 'weapon',
  Resource = 'resource',
  LegArmor = 'leg_armor',
  Helmet = 'helmet',
  Boots = 'boots',
  Shield = 'shield',
  Amulet = 'amulet',
  Ring = 'ring',
}

export interface QueryItemsRequest {
  page: number;
  size: number;
  craft_material?: string;
  craft_skill?: CraftingSkill;
  max_leve?: number;
  min_level?: number;
  name?: string;
  type?: ItemType;
}
