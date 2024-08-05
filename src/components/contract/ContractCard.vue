<template>
  <v-card>
    <v-card-title>
      {{ contract.id }}
      <span class="subtitle">{{ subtitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span>Deadline: {{ prettyDate(contract.terms.deadline) }}</span
          ><br />
          <span>Expires: {{ prettyDate(contract.expiration) }}</span
          ><br />
        </v-col>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-center">Deliver</th>
                <th class="text-center">Destination</th>
                <th class="text-center">Required</th>
                <th class="text-center">Fulfilled</th>
                <th class="text-center">Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in contract.terms.deliver" :key="i">
                <td class="text-center">{{ item.tradeSymbol }}</td>
                <td class="text-center">{{ item.destinationSymbol }}</td>
                <td class="text-center">{{ item.unitsRequired }}</td>
                <td class="text-center">{{ item.unitsFulfilled }}</td>
                <td class="text-center">
                  <v-progress-linear
                    rounded
                    striped
                    height="10"
                    color="light-blue"
                    :model-value="getProgressValue(item)" />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <ContractPayout :payout="contract.terms.payment" />
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-check-bold"
              :disabled="contract.accepted"
              @click="contractStore.acceptContract(contract.id)"
              >{{ acceptButtonLabel }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-package-variant-closed-plus"
              :disabled="!canDeliver"
              @click="deliverAll"
              >Deliver</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { Contract, ContractDelivery } from '@/api/models/contract.model';
import { computed } from 'vue';
import ContractPayout from '@/components/contract/ContractPayout.vue';
import { useContractStore } from '@/store/contract';
import { prettyDate } from '@/api/models/misc.types';
import { useCurrentLocationStore } from '@/store/current-location';
import { useShipStore } from '@/store/ship';

const props = defineProps<{
  contract: Contract;
}>();

const contractStore = useContractStore();
const currentLocationStore = useCurrentLocationStore();
const shipStore = useShipStore();

const subtitle = computed(() => {
  return `${props.contract.factionSymbol.toLowerCase()} | ${props.contract.type.toLowerCase()}`;
});

const acceptButtonLabel = computed(() => {
  return `Accept${props.contract.accepted ? 'ed' : ''}`;
});

const deliverableGoods = computed(() => {
  return props.contract.terms.deliver.map((term) => {
    const goodIsNeeded = term.unitsRequired > term.unitsFulfilled;
    const sameSystem =
      term.destinationSymbol === currentLocationStore.currentWaypointSymbol;
    const goodInInventory = shipStore.selectedShip!.cargo.inventory.find(
      (inv) => inv.symbol === term.tradeSymbol,
    );

    const deliverable = (goodIsNeeded &&
      sameSystem &&
      goodInInventory) as boolean;
    return {
      ...term,
      deliverable,
      deliverableAmount: deliverable ? goodInInventory!.units : undefined,
    };
  });
});

const canDeliver = computed(() =>
  deliverableGoods.value.some((good) => good.deliverable),
);

async function deliverAll() {
  for (const good of deliverableGoods.value) {
    if (!good.deliverable || good.deliverableAmount === undefined) continue;
    await contractStore.deliverCargo(
      props.contract.id,
      shipStore.selectedShip!.symbol,
      good.tradeSymbol,
      good.deliverableAmount,
    );
  }
}

function getProgressValue(term: ContractDelivery) {
  return (term.unitsFulfilled / term.unitsRequired) * 100;
}
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>
