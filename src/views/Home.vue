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
      <v-card>
        <v-card-text>{{ goldShieldTree }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-text>{{ gatheringRequirement }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-text>{{ craftingRequirement }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useCraftingActions } from '@/store/crafting';
import { useEncyclopedia } from '@/store/encyclopedia';
import { useOrchestrator } from '@/store/orchestrator';
import { computed } from 'vue';

const encyclopedia = useEncyclopedia();
const characterList = computed(() => encyclopedia.myCharacters);

const orchestrator = useOrchestrator();

const crafting = useCraftingActions();
const goldShieldTree = crafting.createCraftingTreeNode('gold_shield', 5);

const startingBank = computed(() => encyclopedia.myBank);
const startingGathering = {};
crafting.getGatheringRequirements(
  goldShieldTree!,
  startingGathering,
  startingBank.value,
);

const gatheringRequirement = computed(() => startingGathering);
const craftingRequirement = computed(() =>
  crafting.getCraftingRequirements(goldShieldTree!),
);
</script>
