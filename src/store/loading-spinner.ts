import { defineStore } from 'pinia';

export const useLoadingSpinner = defineStore('loadingSpinner', {
  state: () => ({
    queue: 0,
  }),
  actions: {
    setLoading() {
      this.queue += 1;
    },
    setLoaded() {
      this.queue -= 1;
      if (this.queue < 0) {
        this.queue = 0;
      }
    },
  },
  getters: {
    isLoading: (state) => state.queue > 0,
  },
});
