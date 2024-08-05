<template>
  <v-row align="center" justify="center">
    <v-col v-for="(item, i) in contractStore.contracts" :key="i" cols="3">
      <ContractCard :contract="item" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useContractStore } from '@/store/contract';
import ContractCard from '@/components/contract/ContractCard.vue';

const contractStore = useContractStore();
</script>
