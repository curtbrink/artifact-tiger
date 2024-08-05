import { Agent } from '@/api/models/agent.model';
import { Contract } from '@/api/models/contract.model';
import { Faction } from '@/api/models/faction.model';
import { Ship } from '@/api/models/ship.model';

export interface RegisterResponse {
  token: string;
  agent: Agent;
  contract: Contract;
  faction: Faction;
  ship: Ship;
}
