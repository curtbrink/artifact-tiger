<template>
  <v-snackbar
    v-model="snackbar.visible"
    :timeout="5000"
    :color="snackbar.color">
    <v-row align="center">
      <v-col>
        {{ snackbar.message }}
      </v-col>
    </v-row>
  </v-snackbar>
</template>
<script lang="ts" setup>
import { watchEffect } from 'vue';
import { useSnackbar } from '@/store/snackbar';

const snackbar = useSnackbar();

watchEffect(() => {
  if (!snackbar.visible) {
    setTimeout(() => snackbar.reset(), 1000);
  }
});
</script>
