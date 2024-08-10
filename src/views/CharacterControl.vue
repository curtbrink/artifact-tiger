<template>
  <v-row align="center" justify="center" v-for="character of characterList">
    <v-col cols="2">
      <v-card>
        <v-card-title>
          {{ character.name }}
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Loops</v-card-title>
        <v-card-text>
          <span
            v-if="!!characterLoopController.getCharacterLoop(character.name)"
            >On loop:
            {{ characterLoopController.getCharacterLoop(character.name) }}</span
          >
          <span v-else>Not on a loop!</span>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  block
                  variant="outlined"
                  @click="setMiningLoop(character.name)"
                  :disabled="
                    !!characterLoopController.getCharacterLoop(character.name)
                  "
                  >Do Mining!</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  block
                  variant="outlined"
                  @click="cancelMiningLoop(character.name)"
                  :disabled="
                    !characterLoopController.getCharacterLoop(character.name)
                  "
                  >Cancel Mining!</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useCharacterLoops } from '@/store/characters';
import { useEncyclopedia } from '@/store/encyclopedia';
import { computed } from 'vue';

const encyclopedia = useEncyclopedia();
const characterLoopController = useCharacterLoops();

const characterList = computed(() => encyclopedia.myCharacters);

async function setMiningLoop(name: string) {
  await characterLoopController.placeCharacterOnLoop(name, 'powerlevel_mining');
}
async function cancelMiningLoop(name: string) {
  await characterLoopController.removeCharacterFromLoop(name);
}
</script>
