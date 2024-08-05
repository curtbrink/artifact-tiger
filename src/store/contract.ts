import { defineStore } from 'pinia';
import { Contract } from '@/api/models/contract.model';
import { iteratePagedData } from '@/api/models/misc.types';
import contractApi from '@/api/api/contract/contract.api';
import { useAgentStore } from '@/store/agent';
import { TradeGoodSymbol } from '@/api/models/market.model';
import { useShipStore } from '@/store/ship';

export const useContractStore = defineStore('contract', {
  state: () => ({
    contracts: [] as Contract[],
  }),
  actions: {
    async getAllContracts() {
      this.contracts = await iteratePagedData(contractApi.getMyContracts);
    },
    async ensureLoaded() {
      if (this.contracts.length) {
        return Promise.resolve();
      }
      return this.getAllContracts();
    },
    async acceptContract(contractId: string) {
      // validate id
      const validatedContract = this.contracts.find(
        (it) => it.id === contractId,
      );
      if (!validatedContract || validatedContract.accepted) {
        return;
      }

      const acceptResponse = await contractApi.acceptContract(contractId);
      const { agent, contract } = acceptResponse.data;

      // update contracts
      this.contracts = this.contracts.map((existing) => {
        return existing.id === contract.id ? contract : existing;
      });

      const agentStore = useAgentStore();
      agentStore.setAgent(agent);
    },
    async deliverCargo(
      contractId: string,
      shipSymbol: string,
      tradeSymbol: TradeGoodSymbol,
      units: number,
    ) {
      const deliverResponse = await contractApi.deliverCargo(contractId, {
        shipSymbol,
        tradeSymbol,
        units,
      });
      const shipStore = useShipStore();
      await shipStore.patchCargo(shipSymbol, deliverResponse.data.cargo);
      await this.replaceContract(contractId, deliverResponse.data.contract);
    },
    async replaceContract(contractId: string, newContract: Contract) {
      this.contracts = this.contracts.map((contract) =>
        contract.id === contractId ? newContract : contract,
      );
    },
  },
});
