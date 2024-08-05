import { DateString } from '@/api/models/misc.types';
import { TradeGood, TradeGoodSymbol } from '@/api/models/market.model';

export enum ContractType {
  Procurement = 'PROCUREMENT',
  Transport = 'TRANSPORT',
  Shuttle = 'SHUTTLE',
}

export interface ContractPayment {
  onAccepted: number;
  onFulfilled: number;
}

export interface ContractDelivery {
  tradeSymbol: TradeGoodSymbol;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

export interface ContractTerms {
  deadline: DateString;
  payment: ContractPayment;
  deliver: ContractDelivery[];
}

export interface Contract {
  id: string;
  factionSymbol: string;
  type: ContractType;
  terms: ContractTerms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: DateString;
}
