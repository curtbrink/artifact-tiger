<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-select
          label="Filter to specific trait..."
          v-model="selectedTrait"
          :items="traitOptions"
          clearable
          @click:clear="clearSelectedTrait" />
      </v-col>
      <v-col cols="4">
        <v-select
          label="Filter to specific import..."
          v-model="selectedImport"
          :items="importOptions"
          clearable
          @click:clear="clearSelectedImport" />
      </v-col>
      <v-col cols="4">
        <v-select
          label="Filter to specific export..."
          v-model="selectedExport"
          :items="exportOptions"
          clearable
          @click:clear="clearSelectedExport" />
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="formattedItems"
        item-value="symbol"
        v-model:sort-by="sortBy"
        items-per-page="-1"
        class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <div v-if="item.symbol === props.currentWaypoint">
            <v-icon>mdi-map-marker-account</v-icon> You are here
          </div>
          <div v-else>
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-rocket"
              @click="shipStore.navigateSelectedShip(item.symbol)"
              >Move To</v-btn
            >
          </div>
        </template>
        <template v-slot:item.market="{ item }">
          <div v-if="itemHasMarket(item)">
            <v-tooltip location="top" :text="getExports(item)">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">mdi-arrow-up</v-icon>
              </template>
            </v-tooltip>
            <v-tooltip location="top" :text="getImports(item)">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">mdi-arrow-down</v-icon>
              </template>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { Waypoint, WaypointTraitSymbol } from '@/api/models/waypoint.model';
import { useShipStore } from '@/store/ship';
import { useCurrentLocationStore } from '@/store/current-location';
import { computed, ref } from 'vue';
import { useMarketStore } from '@/store/market';
import { TradeGoodSymbol, TradeSymbolValues } from '@/api/models/market.model';

const props = defineProps<{
  waypoints: Waypoint[];
  currentWaypoint: string | undefined;
}>();

const selectedTrait = ref(null);
const selectedImport = ref(null);
const selectedExport = ref(null);

const traitOptions = Object.values(WaypointTraitSymbol).sort();
const importOptions = Object.values(TradeSymbolValues).sort();
const exportOptions = importOptions;

function clearSelectedTrait() {
  selectedTrait.value = null;
}
function clearSelectedImport() {
  selectedImport.value = null;
}
function clearSelectedExport() {
  selectedExport.value = null;
}

const shipStore = useShipStore();
const currentLocationStore = useCurrentLocationStore();
const marketStore = useMarketStore();

function getDistance(waypoint: Waypoint) {
  const xDiff =
    Math.max(waypoint.x, currentLocationStore.currentWaypoint!.x) -
    Math.min(waypoint.x, currentLocationStore.currentWaypoint!.x);
  const yDiff =
    Math.max(waypoint.y, currentLocationStore.currentWaypoint!.y) -
    Math.min(waypoint.y, currentLocationStore.currentWaypoint!.y);

  return Math.round(Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
}

function itemHasMarket(waypoint: any) {
  return (
    marketStore.waypointMarkets.find(
      (market) => market.symbol === waypoint.symbol,
    ) !== undefined
  );
}

function getExports(waypoint: any) {
  return (
    'Exports: ' +
    marketStore.waypointMarkets
      .find((market) => market.symbol === waypoint.symbol)!
      .exports.map((exp) => exp.name)
      .join(', ')
  );
}

function getImports(waypoint: any) {
  return (
    'Imports: ' +
    marketStore.waypointMarkets
      .find((market) => market.symbol === waypoint.symbol)!
      .imports.map((exp) => exp.name)
      .join(', ')
  );
}

const headers: any[] = [
  { title: 'Waypoint', align: 'center', sortable: true, key: 'symbol' },
  { title: 'Type', align: 'center', sortable: false, key: 'type' },
  {
    title: 'Coordinates',
    align: 'center',
    sortable: false,
    key: 'coordinates',
  },
  { title: 'Distance', align: 'center', sortable: true, key: 'distance' },
  { title: 'Traits', align: 'center', sortable: false, key: 'traits' },
  { title: 'Market', align: 'center', sortable: false, key: 'market' },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions' },
];

const formattedItems = computed(() => {
  return props.waypoints
    .filter(
      (it) =>
        selectedTrait.value === null ||
        it.traits.map((trait) => trait.symbol).includes(selectedTrait.value),
    )
    .filter(
      (it) =>
        selectedImport.value === null ||
        marketStore.waypointMarkets
          .find((market) => market.symbol === it.symbol)
          ?.imports.map((imp) => imp.symbol)
          .includes(selectedImport.value),
    )
    .filter(
      (it) =>
        selectedExport.value === null ||
        marketStore.waypointMarkets
          .find((market) => market.symbol === it.symbol)
          ?.exports.map((exp) => exp.symbol)
          .includes(selectedExport.value),
    )
    .map((it) => ({
      symbol: it.symbol,
      type: it.type,
      coordinates: `( ${it.x}, ${it.y} )`,
      distance: getDistance(it),
      traits: it.traits.map((trait) => trait.symbol).join(' | '),
    }));
});

const sortBy: any[] = [
  {
    key: 'symbol',
    order: 'asc',
  },
];
</script>
