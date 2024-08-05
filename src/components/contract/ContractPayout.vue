<template>
  <v-row>
    <v-col cols="6">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" class="payment-amount mt-0 mb-1 py-0">
            <span>{{ formatNumber(payout.onAccepted) }}</span>
          </v-col>
          <v-col cols="12" class="payment-subtitle mb-0 mt-1 py-0">
            <span>on acceptance</span>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-divider vertical />
    <v-col cols="6">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" class="payment-amount mt-0 mb-1 py-0">
            <span>{{ formatNumber(payout.onFulfilled) }}</span>
          </v-col>
          <v-col cols="12" class="payment-subtitle mb-0 mt-1 py-0">
            <span>on completion</span>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ContractPayment } from '@/api/models/contract.model';

const props = defineProps<{
  payout: ContractPayment;
}>();

function formatNumber(number: number) {
  return '$ ' + new Intl.NumberFormat('en-US').format(number);
}
</script>

<style>
.payment-amount {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
}
.payment-subtitle {
  text-align: center;
  font-weight: normal;
  font-style: italic;
}
</style>
