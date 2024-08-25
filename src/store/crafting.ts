import { defineStore } from 'pinia';
import { useEncyclopedia } from './encyclopedia';
import { BankItem } from '@/api/items/items.models';

export type CraftingTreeNode = {
  itemCode: string;
  quantity: number;
  raw: boolean;
  ingredients: CraftingTreeNode[];
};

export const useCraftingActions = defineStore('craftingActions', {
  state: () => ({}),
  actions: {
    getCraftingRequirements(node: CraftingTreeNode): any[] {
      const actionList = [];
      const nonRawIngredients = node.ingredients.filter((it) => !it.raw);
      for (const ingredient of nonRawIngredients) {
        actionList.push(...this.getCraftingRequirements(ingredient));
      }
      actionList.push({ code: node.itemCode, qty: node.quantity });
      return actionList;
    },
    getGatheringRequirements(
      node: CraftingTreeNode,
      currentGatheringSteps: any,
      adjustedBank: BankItem[],
    ) {
      // walk a tree node to get its gathering requirements
      // 1. does the bank have any of this?
      const bankSlotIdx = adjustedBank.findIndex(
        (slot) => slot.code === node.itemCode,
      );
      if (bankSlotIdx > -1 && adjustedBank[bankSlotIdx].quantity > 0) {
        const numberToUseFromBank = Math.min(
          node.quantity,
          adjustedBank[bankSlotIdx].quantity,
        );
        adjustedBank.splice(bankSlotIdx, 1, {
          code: adjustedBank[bankSlotIdx].code,
          quantity: adjustedBank[bankSlotIdx].quantity - numberToUseFromBank,
        });
        const newQuantity = node.quantity - numberToUseFromBank;
        node = this.createCraftingTreeNode(node.itemCode, newQuantity)!;
      }

      // 2. am I a raw resource?
      if (node.raw) {
        if (!currentGatheringSteps[node.itemCode]) {
          currentGatheringSteps[node.itemCode] = 0;
        }
        currentGatheringSteps[node.itemCode] += node.quantity;
        return;
      }

      // 3. recurse with ingredients
      for (const ingredient of node.ingredients) {
        this.getGatheringRequirements(
          ingredient,
          currentGatheringSteps,
          adjustedBank,
        );
      }
    },
    createCraftingTreeNode(
      itemCode: string,
      quantity: number,
    ): CraftingTreeNode | null {
      const encyclopedia = useEncyclopedia();
      const itemDetails = encyclopedia.getItemByCode(itemCode);
      if (!itemDetails) {
        return null;
      }

      if (!itemDetails.craft) {
        return { itemCode, quantity, raw: true, ingredients: [] };
      }

      const numCraftsRequiredForQuantity = Math.ceil(
        quantity / itemDetails.craft.quantity,
      );

      const craftingIngredients = itemDetails.craft.items.map(
        (ingredient) =>
          this.createCraftingTreeNode(
            ingredient.code,
            numCraftsRequiredForQuantity * ingredient.quantity,
          )!,
      );

      return {
        itemCode,
        quantity,
        raw: false,
        ingredients: craftingIngredients,
      };
    },
  },
});
