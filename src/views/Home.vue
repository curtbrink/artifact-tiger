<template>
  <v-row align="center" justify="center">
    <v-col cols="2">
      <v-card>
        <v-card-text>
          This is the home page, you should have an auth token now!<br /><br />
          You have {{ characterText }}.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import charactersApi from '@/api/characters/characters.api';
import { useCharacters } from '@/store/characters';
import { computed, onMounted, ref } from 'vue';

const characterStore = useCharacters();

onMounted(async () => {
  await characterStore.fetchAllMyCharacters();
});

const numCharacters = computed(() => characterStore.characterList.length);
const multipleChars = computed(() => numCharacters.value !== 1);
const characterText = computed(() => `${numCharacters.value} character${multipleChars.value ? 's' : ''}`);
</script>
