<template>
  <v-row align="center" justify="center">
    <v-col cols="2">
      <v-card>
        <v-card-text>
          This is the home page, you should have an auth token now!<br /><br />
          This is your agent symbol: lol not anymore<br /><br />
          You have 0 total cookies.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import charactersApi from '@/api/characters/characters.api';
import { onMounted } from 'vue';

onMounted(async () => {
  await charactersApi.getMyCharacters();
});
</script>
