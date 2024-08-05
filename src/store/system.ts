import { defineStore } from 'pinia';
import { Waypoint } from '@/api/models/waypoint.model';

export const useSystemStore = defineStore('system', {
  state: () => ({
    systemWaypoints: [] as Waypoint[],
  }),
  actions: {},
  getters: {},
});
