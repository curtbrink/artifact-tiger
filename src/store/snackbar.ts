import { defineStore } from 'pinia';

export const useSnackbar = defineStore('snackbar', {
  state: () => ({
    message: '',
    color: '',
    visible: false,
  }),
  actions: {
    showError(errorMessage: string) {
      this.message = errorMessage;
      this.color = 'error';
      this.visible = true;
    },
    reset() {
      this.message = '';
      this.color = '';
      this.visible = false;
    },
  },
});
