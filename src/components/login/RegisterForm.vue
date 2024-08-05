<template>
  <div>
    <v-text-field v-model="selectedName" label="Pick a name"></v-text-field>
    <v-select
      v-model="selectedFaction"
      :items="factionOptions"
      label="Pick a faction"></v-select>
    <v-btn block @click="registerNewAgent">Register</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authService from '@/services/browser-storage.service';
import router from '@/router';
import { FactionName } from '@/api/models/faction-name.enum';
import { useAgentStore } from '@/store/agent';

const selectedName = ref<string>('');
const selectedFaction = ref<FactionName>(FactionName.Cosmic);

const factionOptions = Object.values(FactionName).filter((it) =>
  isNaN(Number(it)),
);

const agentStore = useAgentStore();

async function registerNewAgent() {
  await agentStore.register(selectedName.value, selectedFaction.value);
  await router.push({ path: '/' });
}
</script>
