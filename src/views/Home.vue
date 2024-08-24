<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card v-for="character of characterList">
        <v-card-title>
          {{ character.name }}
        </v-card-title>
        <v-card-text>
          Currently:
          {{ orchestrator.characterOrchestrationName(character.name) }}
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useEncyclopedia } from '@/store/encyclopedia';
import { useOrchestrator } from '@/store/orchestrator';
import { computed } from 'vue';

const encyclopedia = useEncyclopedia();
const characterList = computed(() => encyclopedia.myCharacters);

const orchestrator = useOrchestrator();
</script>
