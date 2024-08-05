<template>
  <v-app>
    <v-main>
      <AppBar />
      <NavDrawer />
      <v-container fill-height fluid>
        <suspense>
          <router-view />
        </suspense>
      </v-container>
      <TradeTigerSnackbar />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavDrawer from '@/components/shared/NavDrawer.vue';
import { onBeforeMount } from 'vue';
import AppBar from '@/components/shared/AppBar.vue';
import { useLoadingSpinner } from '@/store/loading-spinner';
import { useAgentStore } from '@/store/agent';
import { useShipStore } from '@/store/ship';
import { useContractStore } from '@/store/contract';
import { useFactionStore } from '@/store/faction';
import { useSystemStore } from '@/store/system';
import { useShipyardStore } from '@/store/shipyard';
import TradeTigerSnackbar from '@/components/shared/TradeTigerSnackbar.vue';
import { useSnackbar } from '@/store/snackbar';

onBeforeMount(() => {
  document.title = 'Trade Tiger';

  const storeLoadingHook = ({
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }: {
    after: any;
    onError: any;
  }) => {
    const loadingSpinner = useLoadingSpinner();
    loadingSpinner.setLoading();

    after(() => {
      loadingSpinner.setLoaded();
    });

    onError((e: any) => {
      useSnackbar().showError(e);
      loadingSpinner.setLoaded();
    });
  };

  const listOfStores = [
    useAgentStore(),
    useShipStore(),
    useContractStore(),
    useFactionStore(),
    useSystemStore(),
    useShipyardStore(),
  ];
  for (const store of listOfStores) {
    store.$onAction(storeLoadingHook);
  }
});
</script>

<style>
@font-face {
  font-family: 'Audiowide';
  font-display: block;
  src: url('/fonts/Audiowide-Regular.ttf');
}
</style>
