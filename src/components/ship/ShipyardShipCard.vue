<template>
  <v-card>
    <v-card-title>
      {{ ship.type }}
      <span class="subtitle">$ {{ prettyNumber(ship.purchasePrice) }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        {{ ship.description }}
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-currency-usd"
              @click="shipyardStore.purchaseShip(ship.type)"
              >Purchase</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { prettyNumber } from '@/api/models/misc.types';
import { ShipyardShip } from '@/api/models/shipyard.model';
import { useShipyardStore } from '@/store/shipyard';

const props = defineProps<{
  ship: ShipyardShip;
}>();

const shipyardStore = useShipyardStore();
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>
