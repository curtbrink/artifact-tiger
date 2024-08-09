import { CraftingSkill } from '../items/items.models';

export interface DropRate {
  code: string;
  rate: number;
  min_quantity: number;
  max_quantity: number;
}

export interface Resource {
  name: string;
  code: string;
  skill: CraftingSkill;
  level: number;
  drops: DropRate[];
}

export interface QueryResourcesRequest {
  size: number;
  page: number;
  drop?: string;
  max_level?: number;
  min_level?: number;
  skill?: CraftingSkill;
}
