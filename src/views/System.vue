<template>
  <SystemTable
    :waypoints="currentLocationStore.systemWaypoints"
    :currentWaypoint="currentLocationStore.currentWaypointSymbol" />
</template>

<script lang="ts" setup>
import SystemTable from '@/components/system/SystemTable.vue';
import { useCurrentLocationStore } from '@/store/current-location';

const currentLocationStore = useCurrentLocationStore();
</script>
