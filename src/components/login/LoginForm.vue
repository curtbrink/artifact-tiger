<template>
  <div>
    <v-text-field
      v-model="username"
      label="Username"></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"></v-text-field>
    <v-btn block @click="attemptLogin">Log In</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import browserStorageService from '@/services/browser-storage.service';
import router from '@/router';
import tokenApi from '@/api/token/token.api';

const username = ref('');
const password = ref('');

async function attemptLogin() {
  const authResponse = await tokenApi.generateToken({ username: username.value, password: password.value });
  browserStorageService.setAuthToken(authResponse.token);
  router.push({ path: '/' });
}
</script>
