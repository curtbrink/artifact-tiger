<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in browserStorageService.hasAuthToken() ? regularItems : authItems"
        :key="i"
        :to="{ path: item.routePath }"
        :prepend-icon="item.icon"
        :title="item.label"></v-list-item>
      <v-divider />
      <!-- <v-list-item
        v-if="currentLocationStore.currentSystemSymbol"
        :to="{ path: '/system-map' }"
        prepend-icon="mdi-map"
        title="System Map" />
      <v-list-item
        v-if="shipStore.selectedShip"
        :to="{ path: '/controls' }"
        prepend-icon="mdi-rocket-launch"
        title="Cockpit" />
      <v-list-item
        v-if="shipyardStore.shipyardAccessible"
        :to="{ path: '/shipyard' }"
        prepend-icon="mdi-rocket-launch"
        title="Shipyard" />
      <v-list-item
        v-if="marketStore.marketAccessible"
        :to="{ path: '/market' }"
        prepend-icon="mdi-currency-usd"
        title="Market" /> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import browserStorageService from '@/services/browser-storage.service';

const authItems = [
  {
    icon: 'mdi-account',
    routePath: '/auth',
    label: 'Log In',
  },
];
const regularItems = [
  {
    icon: 'mdi-home',
    routePath: '/',
    label: 'Waiting Room',
  },
  {
    icon: 'mdi-account',
    routePath: '/control',
    label: 'Character'
  }
];
</script>
