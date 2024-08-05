import { FactionName } from '@/api/models/faction-name.enum';

export interface RegisterRequest {
  faction: FactionName;
  symbol: string;
}
