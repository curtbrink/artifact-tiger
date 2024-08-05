<template>
  <v-card>
    <v-tabs v-model="selectedTab" fixed-tabs>
      <v-tab value="loginTab">Log In</v-tab>
      <v-tab value="registerTab">Register</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="selectedTab">
        <v-window-item value="loginTab">
          <LoginForm />
        </v-window-item>
        <v-window-item value="registerTab">
          <RegisterForm />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm.vue';

const selectedTab = ref('loginTab');
</script>
