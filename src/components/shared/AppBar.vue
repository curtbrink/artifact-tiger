<template>
  <v-app-bar class="pl-5 title-bar">
    <b>TRADE-TIGER</b>
    <template v-slot:append>
      <v-container class="fill-width">
        <v-row>
          <v-col cols="3">
            <div v-if="loadingSpinner.isLoading">
              <v-progress-circular indeterminate :size="25" :width="5" />
            </div>
          </v-col>
          <v-col cols="3">
            <div v-if="agentStore.loggedIn">
              <v-icon>mdi-currency-usd</v-icon>
              {{ prettyNumber(agentStore.agent?.credits ?? 0) }}
            </div>
          </v-col>
          <v-col cols="3">
            <div v-if="currentLocationStore.currentWaypoint">
              <v-icon>mdi-flare</v-icon>
              {{ currentLocationStore.currentSystemSymbol }}
            </div>
          </v-col>
          <v-col cols="3">
            <div v-if="currentLocationStore.currentWaypoint">
              <v-icon>mdi-map-marker</v-icon>
              {{ currentLocationStore.currentWaypointSymbol }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAgentStore } from '@/store/agent';
import { prettyNumber } from '@/api/models/misc.types';
import { useLoadingSpinner } from '@/store/loading-spinner';
import { useCurrentLocationStore } from '@/store/current-location';

const agentStore = useAgentStore();
const currentLocationStore = useCurrentLocationStore();
const loadingSpinner = useLoadingSpinner();
</script>

<style>
.title-bar {
  font-family: 'Audiowide', cursive;
}

.fill-width {
  min-width: 900px;
}
</style>
