<template>
  <v-row align="center" justify="center">
    <v-col cols="2">
      <v-card>
        <v-card-text>
          This is the home page, you should have an auth token now!<br /><br />
          This is your agent symbol: {{ agentStore.agent?.symbol }}<br /><br />
          You have {{ shipStore.totalShips }} total ship(s).
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useAgentStore } from '@/store/agent';
import { useShipStore } from '@/store/ship';

const agentStore = useAgentStore();
const shipStore = useShipStore();
</script>
