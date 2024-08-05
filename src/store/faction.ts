import { defineStore } from 'pinia';
import { Faction } from '@/api/models/faction.model';

export const useFactionStore = defineStore('faction', {
  state: () => ({
    faction: undefined as Faction | undefined,
  }),
  actions: {},
});
