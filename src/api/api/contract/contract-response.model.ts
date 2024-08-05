import { Agent } from '@/api/models/agent.model';
import { Contract } from '@/api/models/contract.model';
import { ShipCargo } from '@/api/models/ship.model';

export interface AcceptContractResponse {
  agent: Agent;
  contract: Contract;
}

export interface DeliverCargoResponse {
  contract: Contract;
  cargo: ShipCargo;
}
