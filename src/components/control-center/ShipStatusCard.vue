<template>
  <v-card v-if="shipStore.selectedShip">
    <v-card-title>
      {{ selectedShip.registration.name }}
      <span class="subtitle">{{ selectedShip.registration.role }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-card variant="outlined">
            <v-card-title>Status</v-card-title>
            <v-card-text>{{ status }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card variant="outlined">
            <v-card-title>Fuel</v-card-title>
            <v-card-text> {{ currentFuel }} / {{ fuelCapacity }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="status === 'In Transit'">
        <v-col>
          <v-card variant="outlined">
            <v-card-title>Journey</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  Origin: {{ selectedShip.nav.route.origin.symbol }}<br />
                  (time): {{ prettyDate(selectedShip.nav.route.departureTime)
                  }}<br />
                  Destination: {{ selectedShip.nav.route.destination.symbol
                  }}<br />
                  (time): {{ prettyDate(selectedShip.nav.route.arrival) }}
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="9">
                  <v-progress-linear
                    :model-value="routeProgressPercent"
                    height="10"
                    striped
                    color="light-blue" />
                </v-col>
                <v-col cols="3">
                  <v-btn @click="updateNow">Refresh</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="status === 'Cooldown'">
        <v-col>
          <v-card variant="outlined">
            <v-card-title>Cooldown</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  On cooldown until: {{ selectedShip.cooldown.expiration }}
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="9">
                  <v-progress-linear
                    :model-value="cooldownProgressPercent"
                    height="10"
                    striped
                    color="light-blue" />
                </v-col>
                <v-col cols="3">
                  <v-btn @click="updateNow">Refresh</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { ShipNavigationStatus } from '@/api/models/ship.model';
import { DateString, prettyDate } from '@/api/models/misc.types';
import dayjs from 'dayjs';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useShipStore } from '@/store/ship';
import { useMarketStore } from '@/store/market';

const shipStore = useShipStore();
const marketStore = useMarketStore();
const selectedShip = shipStore.selectedShip!;

let now = ref(dayjs());

function updateNow() {
  now.value = dayjs();
}
onMounted(() => {
  updateNow();
});

const status = computed(() => {
  if (shipStore.autoExtractingShips.includes(selectedShip.symbol)) {
    return 'Ship is extracting resources until full';
  }
  if (selectedShip.cooldown.totalSeconds > 0) {
    return 'Cooldown';
  }
  switch (selectedShip.nav.status) {
    case ShipNavigationStatus.InTransit:
      return 'In Transit';
    case ShipNavigationStatus.Docked:
      return 'Docked';
    case ShipNavigationStatus.InOrbit:
      return 'In Orbit';
    default:
      return '';
  }
});

const cooldownProgressPercent = computed(() => {
  if (status.value !== 'Cooldown') {
    return 0;
  }
  const expiration = dayjs(selectedShip.cooldown.expiration);
  const start = expiration.subtract(
    selectedShip.cooldown.totalSeconds,
    'second',
  );

  const elapsedSeconds = now.value.diff(start, 'second');
  return (elapsedSeconds / selectedShip.cooldown.totalSeconds) * 100;
});

const routeProgressPercent = computed(() => {
  if (status.value !== 'In Transit') {
    return 0;
  }
  const depart = dayjs(selectedShip.nav.route.departureTime);
  const arrive = dayjs(selectedShip.nav.route.arrival);

  const totalSeconds = arrive.diff(depart, 'second');
  const elapsedSeconds = now.value.diff(depart, 'second');
  return (elapsedSeconds / totalSeconds) * 100;
});

const currentFuel = computed(() => selectedShip.fuel.current);
const fuelCapacity = computed(() => selectedShip.fuel.capacity);

watchEffect(async () => {
  if (routeProgressPercent.value > 100) {
    await shipStore.refreshNav(selectedShip.symbol);
    await marketStore.getMarketForWaypoint(
      selectedShip.nav.systemSymbol,
      selectedShip.nav.waypointSymbol,
    );
  }
});
watchEffect(async () => {
  if (cooldownProgressPercent.value > 100) {
    await shipStore.refreshCooldown(selectedShip.symbol);
  }
});
</script>
