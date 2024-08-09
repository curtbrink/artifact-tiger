import itemsApi from '@/api/items/items.api';
import { Item } from '@/api/items/items.models';
import mapsApi from '@/api/maps/maps.api';
import { Map } from '@/api/maps/maps.models';
import monstersApi from '@/api/monsters/monsters.api';
import { Monster } from '@/api/monsters/monsters.models';
import resourcesApi from '@/api/resources/resources.api';
import { Resource } from '@/api/resources/resources.models';
import { iteratePagedData } from '@/api/types';
import { defineStore } from 'pinia';

export const useEncyclopedia = defineStore('encyclopedia', {
  state: () => ({
    isLoaded: false,
    items: [] as Item[],
    maps: [] as Map[],
    resources: [] as Resource[],
    monsters: [] as Monster[],
  }),
  actions: {
    async loadAllGameData() {
      if (this.isLoaded) {
        return; // only need to load encyclopedia data once when required
      }
      this.maps = await iteratePagedData(mapsApi.getAllMaps);
      this.items = await iteratePagedData(itemsApi.getAllItems);
      this.resources = await iteratePagedData(resourcesApi.getAllResources);
      this.monsters = await iteratePagedData(monstersApi.getAllMonsters);
      this.isLoaded = true;
    },
  },
});
