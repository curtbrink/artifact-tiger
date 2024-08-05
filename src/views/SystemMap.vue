<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <VuePlotly :data="plottedData" :layout="layout"></VuePlotly>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { VuePlotly } from 'vue3-plotly';
import { useCurrentLocationStore } from '@/store/current-location';
import { Waypoint, WaypointType } from '@/api/models/waypoint.model';
import { computed } from 'vue';

const currentLocationStore = useCurrentLocationStore();

const waypointGroups: any = {
  planet: [WaypointType.Planet, WaypointType.GasGiant, WaypointType.Moon],
  asteroid: [
    WaypointType.Asteroid,
    WaypointType.AsteroidBase,
    WaypointType.EngineeredAsteroid,
    WaypointType.AsteroidField,
  ],
  artificial: [
    WaypointType.FuelStation,
    WaypointType.OrbitalStation,
    WaypointType.JumpGate,
  ],
  other: [
    WaypointType.ArtificialGravityWell,
    WaypointType.GravityWell,
    WaypointType.DebrisField,
    WaypointType.Nebula,
  ],
};

const markerStyle: any = {
  planet: '#eee',
  asteroid: '#f00',
  artificial: '#0f0',
  other: '#00f',
};

const markerPriority: any = {
  planet: 0,
  asteroid: 1,
  artificial: 2,
  other: 3,
};

function compileWaypointCoordinates(waypoints: Waypoint[]) {
  const compilation = [] as any[];
  for (const wp of waypoints) {
    const existingRecord = compilation.find(
      (comp) => comp.x === wp.x && comp.y === wp.y,
    );
    const markerType = Object.keys(waypointGroups).filter((grp) =>
      waypointGroups[grp].includes(wp.type),
    )[0];
    if (existingRecord) {
      existingRecord.symbols.push(wp.symbol);
      if (
        markerPriority[markerType] < markerPriority[existingRecord.markerType]
      ) {
        existingRecord.markerType = markerType;
      }
    } else {
      compilation.push({
        x: wp.x,
        y: wp.y,
        symbols: [wp.symbol],
        markerType,
      });
    }
  }
  return compilation;
}

function getDataForWaypointGroup(
  compiledWaypoints: any[],
  group: 'planet' | 'asteroid' | 'artificial' | 'other',
) {
  const filteredWaypoints = compiledWaypoints.filter(
    (wp) => wp.markerType === group,
  );
  return {
    x: filteredWaypoints.map((wp) => wp.x),
    y: filteredWaypoints.map((wp) => wp.y),
    text: filteredWaypoints.map((wp) => wp.symbols.join(', ')),
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: markerStyle[group],
    },
  };
}

const compiledWaypoints = computed(() => {
  return compileWaypointCoordinates(currentLocationStore.systemWaypoints);
});

const plottedData = [
  getDataForWaypointGroup(compiledWaypoints.value, 'planet'),
  getDataForWaypointGroup(compiledWaypoints.value, 'asteroid'),
  getDataForWaypointGroup(compiledWaypoints.value, 'artificial'),
  getDataForWaypointGroup(compiledWaypoints.value, 'other'),
];
const layout = {
  paper_bgcolor: '#121212',
  plot_bgcolor: '#121212',
  width: 900,
  height: 900,
};
</script>
