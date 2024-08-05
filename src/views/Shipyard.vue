<template>
  <v-row align="center" justify="center">
    <v-col
      v-for="(item, i) in shipyardStore.currentShipyard?.ships"
      :key="i"
      cols="3">
      <ShipyardShipCard :ship="item" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useShipyardStore } from '@/store/shipyard';
import ShipyardShipCard from '@/components/ship/ShipyardShipCard.vue';

const shipyardStore = useShipyardStore();
</script>
