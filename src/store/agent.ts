// Utilities
import { defineStore } from 'pinia';
import registerApi from '@/api/api/register/register.api';
import { FactionName } from '@/api/models/faction-name.enum';
import { Agent } from '@/api/models/agent.model';
import browserStorageService from '@/services/browser-storage.service';
import { useShipStore } from '@/store/ship';
import { useFactionStore } from '@/store/faction';
import { useContractStore } from '@/store/contract';
import agentApi from '@/api/api/agent/agent.api';
import { useSnackbar } from '@/store/snackbar';

export const useAgentStore = defineStore('agent', {
  state: () => ({
    agent: undefined as Agent | undefined,
  }),
  getters: {
    loggedIn: (state) => state.agent !== undefined,
  },
  actions: {
    async ensureLoaded() {
      if (this.agent) {
        return Promise.resolve();
      }
      try {
        const agentResponse = await agentApi.getMyAgent();
        this.agent = agentResponse.data;
      } catch (e) {}
    },
    async register(name: string, faction: FactionName) {
      const newAgentResponse = await registerApi.register({
        faction,
        symbol: name,
      });
      const newAgentData = newAgentResponse.data;
      browserStorageService.setAuthToken(newAgentData.token);

      // set agent
      this.agent = newAgentData.agent;

      // set ship
      const shipStore = useShipStore();
      shipStore.ships.push(newAgentData.ship);

      // set faction
      const factionStore = useFactionStore();
      factionStore.faction = newAgentData.faction;

      // set contract
      const contractStore = useContractStore();
      contractStore.contracts = [newAgentData.contract];
    },
    setAgent(agent: Agent) {
      this.agent = agent;
    },
  },
});
