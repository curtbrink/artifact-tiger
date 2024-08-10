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
import AppBar from '@/components/shared/AppBar.vue';
import NavDrawer from '@/components/shared/NavDrawer.vue';
import TradeTigerSnackbar from '@/components/shared/TradeTigerSnackbar.vue';
import { onBeforeMount } from 'vue';
import { useCharacterLoops } from './store/characters';
import { useEncyclopedia } from './store/encyclopedia';
import { useLoadingSpinner } from './store/loading-spinner';
import { useSnackbar } from './store/snackbar';

onBeforeMount(() => {
  document.title = 'Artifact Tiger';

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

  const listOfStores = [useEncyclopedia(), useCharacterLoops()];

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
