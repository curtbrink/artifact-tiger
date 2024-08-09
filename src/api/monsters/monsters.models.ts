import { DropRate } from '../resources/resources.models';

export interface Monster {
  name: string;
  code: string;
  level: number;
  hp: number;

  attack_fire: number;
  attack_earth: number;
  attack_water: number;
  attack_air: number;

  res_fire: number;
  res_earth: number;
  res_water: number;
  res_air: number;

  min_gold: number;
  max_gold: number;

  drops: DropRate[];
}

export interface QueryMonstersRequest {
  page: number;
  size: number;
  drop?: string;
  max_level?: number;
  min_level?: number;
}
