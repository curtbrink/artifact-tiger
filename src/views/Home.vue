<template>
  <v-row align="center" justify="center">
    <v-col cols="2">
      <v-card v-for="character of characterStore.characterList">
        <v-card-title>
          {{ character.name }}
        </v-card-title>
        <v-card-text>
          Select this character to control it.
        </v-card-text>
        <v-card-actions>
          <v-btn 
            block 
            variant="outlined"
            @click="selectAndRedirect(character.name)"
            >Select</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useCharacters } from '@/store/characters';
import { computed, onMounted, ref } from 'vue';

const characterStore = useCharacters();

onMounted(async () => {
  await characterStore.fetchAllMyCharacters();
});

async function selectAndRedirect(name: string) {
  await characterStore.selectCharacter(name);
  router.push('/control');
}
</script>
