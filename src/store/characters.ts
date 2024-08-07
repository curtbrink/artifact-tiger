import charactersApi from '@/api/characters/characters.api';
import { Character } from '@/api/characters/characters.models';
import { defineStore } from 'pinia';

export const useCharacters = defineStore('characters', {
  state: () => ({
    characterList: [] as Character[],
  }),
  actions: {
    async fetchAllMyCharacters() {
      this.characterList = (await charactersApi.getMyCharacters()).data;
    },
  },
});
