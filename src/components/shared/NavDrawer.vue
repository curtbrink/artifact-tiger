<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in browserStorageService.hasAuthToken()
          ? regularItems
          : authItems"
        :key="i"
        :to="{ path: item.routePath }"
        :prepend-icon="item.icon"
        :title="item.label"></v-list-item>
      <v-divider />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import browserStorageService from '@/services/browser-storage.service';
import { useEncyclopedia } from '@/store/encyclopedia';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const encyclopedia = useEncyclopedia();
const regularItems = computed(() => [
  {
    icon: 'mdi-home',
    routePath: '/',
    label: 'Waiting Room',
  },
  ...encyclopedia.myCharacters.map((char) => ({
    icon: 'mdi-account',
    routePath: `/control/${char.name}`,
    label: char.name,
  })),
]);

const authItems = [
  {
    icon: 'mdi-account',
    routePath: '/auth',
    label: 'Log In',
  },
];
</script>
