<template>
  <v-row align="center" justify="center">
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
          Currently:
          {{ orchestrator.characterOrchestrationName(character.name) }}
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  block
                  variant="outlined"
                  @click="setOnMiningOrchestration(character.name)"
                  :disabled="isOnOrchestration"
                  >Do Mining!</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  block
                  variant="outlined"
                  @click="setOnFishingOrchestration(character.name)"
                  :disabled="isOnOrchestration"
                  >Do Fishing!</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  block
                  variant="outlined"
                  @click="setOnWoodcuttingOrchestration(character.name)"
                  :disabled="isOnOrchestration"
                  >Do Woodcutting!</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  block
                  variant="outlined"
                  @click="
                    orchestrator.removeCharacterOrchestration(character.name)
                  "
                  :disabled="!isOnOrchestration"
                  >Cancel Orchestration!</v-btn
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
import { Character } from '@/api/characters/characters.models';
import { useActions } from '@/store/actions';
import { useEncyclopedia } from '@/store/encyclopedia';
import { useOrchestrator } from '@/store/orchestrator';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const encyclopedia = useEncyclopedia();
const orchestrator = useOrchestrator();
const actionLibrary = useActions();

const currentRoute = useRoute();

const character = computed(
  () =>
    encyclopedia.getCharacterByName(currentRoute.params.charName as string) ??
    ({} as Character),
);

const currentOrchestration = computed(() =>
  orchestrator.characterOrchestrationName(character.value.name),
);
const isOnOrchestration = computed(() => currentOrchestration.value !== 'N/A');

async function setOnMiningOrchestration(name: string) {
  await orchestrator.addCharacterOrchestration(
    name,
    'Powerleveling Mining',
    [actionLibrary.powerlevelMining, actionLibrary.emptyInventory],
    { shouldLoop: true },
  );
}
async function setOnFishingOrchestration(name: string) {
  await orchestrator.addCharacterOrchestration(
    name,
    'Powerleveling Fishing',
    [actionLibrary.powerlevelFishing, actionLibrary.emptyInventory],
    { shouldLoop: true },
  );
}
async function setOnWoodcuttingOrchestration(name: string) {
  await orchestrator.addCharacterOrchestration(
    name,
    'Powerleveling Woodcutting',
    [actionLibrary.powerlevelWoodcutting, actionLibrary.emptyInventory],
    { shouldLoop: true },
  );
}
</script>
