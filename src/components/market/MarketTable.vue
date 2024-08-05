<template>
  <v-data-table
    :headers="headers"
    :items="marketStore.currentMarket?.tradeGoods"
    item-value="symbol"
    v-model:sort-by="sortBy"
    items-per-page="-1"
    class="elevation-1">
    <template v-slot:item.actions="{ item }">
      <div v-if="item.type === 'IMPORT'">
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-currency-usd"
          :disabled="!cargoOwned(item.symbol)"
          @click="sellAll(item.symbol)"
          >Sell All</v-btn
        >
      </div>
    </template>
  </v-data-table>
</template>
<script lang="ts" setup>
import { useMarketStore } from '@/store/market';
import { useShipStore } from '@/store/ship';
import { TradeGoodSymbol } from '@/api/models/market.model';

const marketStore = useMarketStore();
const shipStore = useShipStore();
const shipCargo = shipStore.selectedShip?.cargo;

const headers: any[] = [
  { title: 'Name', align: 'center', sortable: true, key: 'symbol' },
  { title: 'Type', align: 'center', sortable: false, key: 'type' },
  { title: 'Supply', align: 'center', sortable: false, key: 'supply' },
  { title: 'PP', align: 'center', sortable: false, key: 'purchasePrice' },
  { title: 'SP', align: 'center', sortable: false, key: 'sellPrice' },
  { title: 'Vol', align: 'center', sortable: false, key: 'tradeVolume' },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions' },
] as any[];

const sortBy: any[] = [
  {
    key: 'symbol',
    order: 'asc',
  },
];

async function sellAll(cargoType: string) {
  const numberToSell =
    shipCargo?.inventory.find((it) => it.symbol === cargoType)?.units ?? 0;
  await shipStore.sellCargo(
    shipStore.selectedShip!.symbol,
    cargoType,
    numberToSell,
  );
}

function cargoOwned(cargoType: TradeGoodSymbol) {
  const ownedCargoTypes = shipCargo?.inventory.map((it) => it.symbol) ?? [];
  return ownedCargoTypes.includes(cargoType);
}
</script>
