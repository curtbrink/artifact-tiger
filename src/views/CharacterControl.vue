<template>
  <v-row align="center" justify="center">
    <v-col cols="2">
      <v-card>
        <v-card-title>
          {{ character.name }}
        </v-card-title>
        <v-card-text> You're controlling this character :3 </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title>Movement</v-card-title>
        <v-card-text>
          <v-text-field v-model="xDest" label="X" type="number"></v-text-field>
          <v-text-field v-model="yDest" label="Y" type="number"></v-text-field>
          <v-btn block variant="outlined" @click="moveCharacter">Go!</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Actions</v-card-title>
        <v-card-text>
          <v-btn block variant="outlined" @click="fight">Fight!</v-btn>
          <v-btn block variant="outlined" @click="gather">Gather!</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useCharacters } from '@/store/characters';
import { computed, onMounted, ref } from 'vue';

const characterStore = useCharacters();

const character = computed(() => characterStore.selectedCharacter);

const xDest = ref(character.value.x);
const yDest = ref(character.value.y);

async function moveCharacter() {
  await characterStore.moveCharacter(xDest.value, yDest.value);
}
async function fight() {
  await characterStore.fight();
}
async function gather() {
  await characterStore.gather();
}
</script>
