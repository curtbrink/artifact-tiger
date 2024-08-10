import charactersApi from '@/api/characters/characters.api';
import { Character } from '@/api/characters/characters.models';
import itemsApi from '@/api/items/items.api';
import { CraftingSkill, Item } from '@/api/items/items.models';
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
    myCharacters: [] as Character[],
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
      this.myCharacters = (await charactersApi.getMyCharacters()).data;
      this.isLoaded = true;
    },
    replaceCharacter(newCharacter: Character) {
      // wholesale replace the matching character. this will generally happen as a result of an action
      const charIndex = this.myCharacters.findIndex(
        (c: Character) => c.name === newCharacter.name,
      );
      if (charIndex > -1) {
        this.myCharacters.splice(charIndex, 1, newCharacter);
      }
    },
  },
  getters: {
    getCharacterByName: (state) => (characterName: string) =>
      state.myCharacters.find((c: Character) => c.name === characterName),
    getResourcesBySkill: (state) => (skillName: CraftingSkill) => {
      return state.resources.filter(
        (resource: Resource) => resource.skill === skillName,
      );
    },
    getMapTileByResource: (state) => (resourceName: string) =>
      state.maps.find((m: Map) => m.content?.code === resourceName),
    getMapTileByContentType: (state) => (contentType: string) =>
      state.maps.find((m: Map) => m.content?.type === contentType),
  },
});
