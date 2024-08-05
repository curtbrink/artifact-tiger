<template>
  <v-card>
    <v-card-title>
      Inventory
      <span class="subtitle">
        {{ ship.cargo.units }} / {{ ship.cargo.capacity }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-for="(item, i) in ship.cargo.inventory" :key="i" cols="2">
            <v-card variant="outlined">
              <v-card-title>{{ item.units }}</v-card-title>
              <v-card-text>{{ item.name }}</v-card-text>
              <v-card-actions>
                <v-btn
                  block
                  variant="outlined"
                  @click="jettisonCargo(item.symbol)">
                  Jettison
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { useShipStore } from '@/store/ship';

const shipStore = useShipStore();
const ship = shipStore.selectedShip!;

async function jettisonCargo(symbol: string) {
  const amountToJettison =
    ship.cargo.inventory.find((it) => it.symbol === symbol)?.units ?? 0;
  if (amountToJettison) {
    await shipStore.jettisonCargo(ship.symbol, symbol, amountToJettison);
  }
}
</script>
