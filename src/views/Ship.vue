<template>
  <v-row align="center" justify="center">
    <v-col v-for="(item, i) in shipStore.ships" :key="i" cols="3">
      <ShipCard :ship="item" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useShipStore } from '@/store/ship';
import ShipCard from '@/components/ship/ShipCard.vue';

const shipStore = useShipStore();
</script>
