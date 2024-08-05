<template>
  <v-card>
    <v-card-title>
      {{ ship.registration.name }}
      <span class="subtitle">{{ ship.registration.role }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <div v-if="!isMoving(ship)">
          Status: {{ ship.nav.status }} at {{ ship.nav.waypointSymbol }}
        </div>
        <div v-else>
          <v-row align="center">
            <v-col cols="6">
              Status: In transit<br />
              Depart: {{ ship.nav.route.origin.symbol }}<br />
              (time): {{ prettyDate(ship.nav.route.departureTime) }}<br />
              Destination: {{ ship.nav.route.destination.symbol }}<br />
              (time): {{ prettyDate(ship.nav.route.arrival) }}
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-progress-linear
                    :model-value="getRouteProgress(ship)"
                    height="10"
                    striped
                    color="light-blue" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    prepend-icon="mdi-refresh"
                    @click="shipStore.refreshNav(ship.symbol)"
                    >Refresh</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-check-bold"
              :disabled="isSelected(ship)"
              @click="shipStore.selectShip(ship.symbol)"
              >{{ isSelected(ship) ? 'Selected' : 'Select' }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-flare"
              @click="shipStore.dockShip(ship.symbol)"
              >Dock</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-rocket-launch"
              @click="shipStore.orbitShip(ship.symbol)"
              >Orbit</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="showRefuel(ship)">
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-barrel"
              @click="shipStore.refuelShip(ship.symbol)"
              :disabled="!canRefuel(ship)"
              >Refuel</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { Ship, ShipNavigationStatus } from '@/api/models/ship.model';
import { useShipStore } from '@/store/ship';
import dayjs from 'dayjs';
import { prettyDate } from '@/api/models/misc.types';
import { useMarketStore } from '@/store/market';

const props = defineProps<{
  ship: Ship;
}>();

const shipStore = useShipStore();
const marketStore = useMarketStore();

function isSelected(ship: Ship) {
  return shipStore.selectedShip?.symbol === ship.symbol;
}
function isMoving(ship: Ship) {
  return ship.nav.status === ShipNavigationStatus.InTransit;
}
function getRouteProgress(ship: Ship) {
  const depart = dayjs(ship.nav.route.departureTime);
  const arrive = dayjs(ship.nav.route.arrival);
  const now = dayjs();

  const totalSeconds = arrive.diff(depart, 'second');
  const elapsedSeconds = now.diff(depart, 'second');
  return (elapsedSeconds / totalSeconds) * 100;
}
function showRefuel(ship: Ship) {
  return isSelected(ship) && marketStore.canRefuel;
}
function canRefuel(ship: Ship) {
  return showRefuel(ship) && ship.fuel.current < ship.fuel.capacity;
}
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>
