import { TradeGoodSymbol } from '@/api/models/market.model';

export interface DeliverCargoRequest {
  shipSymbol: string;
  tradeSymbol: TradeGoodSymbol;
  units: number;
}
