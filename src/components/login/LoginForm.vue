<template>
  <div>
    <v-text-field
      v-model="selectedAuthToken"
      label="Enter auth token"></v-text-field>
    <v-btn block @click="saveToken">Log In</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import browserStorageService from '@/services/browser-storage.service';
import router from '@/router';

const selectedAuthToken = ref('');

function saveToken() {
  browserStorageService.setAuthToken(selectedAuthToken.value);
  router.push({ path: '/' });
}
</script>
