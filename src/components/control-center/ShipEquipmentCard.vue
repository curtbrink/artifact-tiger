<template>
  <v-card>
    <v-card-title> Outfitting </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-card variant="outlined">
              <v-card-title>Frame</v-card-title>
              <v-card-text>{{ ship.frame.name }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card variant="outlined">
              <v-card-title>Reactor</v-card-title>
              <v-card-text>{{ ship.reactor.name }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card variant="outlined">
              <v-card-title>Engine</v-card-title>
              <v-card-text>{{ ship.engine.name }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card variant="outlined">
              <v-card-title>Modules</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" v-for="(item, i) in ship.modules" :key="i">
                      <v-card variant="outlined">
                        <v-card-text>{{ item.name }}</v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card variant="outlined">
              <v-card-title>Mounts</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" v-for="(item, i) in ship.mounts" :key="i">
                      <v-card variant="outlined">
                        <v-card-text>{{ item.name }}</v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
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
