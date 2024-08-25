import { Character } from '@/api/characters/characters.models';
import { defineStore } from 'pinia';
import { ActionCode, useOrchestrator } from './orchestrator';
import { useEncyclopedia } from './encyclopedia';
import charactersApi from '@/api/characters/characters.api';
import { CraftingSkill } from '@/api/items/items.models';
import { Resource } from '@/api/resources/resources.models';

export const useActions = defineStore('actions', {
  state: () => ({}),
  actions: {
    // where to go from here:
    //   - action for crafting a specific item of a specific quantity
    //   - action for fighting a specific monster
    //   - action for retrieving and equipping equipment out of the bank
    //   - etc
    // then we can start composing standard lists of these actions
    // i.e. "craft complex item" -> break down into gathering actions and crafting actions
    async powerlevelMining(me: Character, data: any): Promise<ActionCode> {
      return this.powerlevelGathering(me, {
        ...data,
        skill: CraftingSkill.Mining,
        skillLevelParam: 'mining_level',
      });
    },
    async powerlevelFishing(me: Character, data: any): Promise<ActionCode> {
      return this.powerlevelGathering(me, {
        ...data,
        skill: CraftingSkill.Fishing,
        skillLevelParam: 'fishing_level',
      });
    },
    async powerlevelWoodcutting(me: Character, data: any): Promise<ActionCode> {
      return this.powerlevelGathering(me, {
        ...data,
        skill: CraftingSkill.Woodcutting,
        skillLevelParam: 'woodcutting_level',
      });
    },
    async powerlevelGathering(me: Character, data: any): Promise<ActionCode> {
      // passthru for mining highest level resource until full

      // check params
      if (
        !data.skill ||
        !['mining_level', 'woodcutting_level', 'fishing_level'].includes(
          data.skillLevelParam,
        )
      ) {
        console.log(`Invalid skill: ${data.skill}`);
        return ActionCode.Abort;
      }

      // basically force-type-assert this for now; there might be a cleaner way to do this
      const skillPropertyName:
        | 'fishing_level'
        | 'mining_level'
        | 'woodcutting_level' = data.skillLevelParam;
      const charLevel = me[skillPropertyName];
      console.log(`skill level is ${charLevel}`);
      // list of all resources and their levels
      const encyclopedia = useEncyclopedia();
      const resourceHierarchy = encyclopedia.getResourcesBySkill(data.skill);
      // what's the highest level resource I can mine with my current level?
      const targetResource = resourceHierarchy.reduce(
        (currentTarget: Resource, resourceToCheck: Resource) => {
          return resourceToCheck.level <= charLevel &&
            resourceToCheck.level > currentTarget.level
            ? resourceToCheck
            : currentTarget;
        },
        { level: 0 } as Resource,
      );
      if (!targetResource.name) {
        // I'm literally a fetus who doesn't know what skilling is
        console.log('couldnt determine target resource, returning abort code');
        return ActionCode.Abort;
      }
      console.log(`seeking ${targetResource.name}`);

      return this.gatherResource(me, {
        ...data,
        resourceCode: targetResource.code,
        quantity: -1,
      });
    },
    async gatherResource(me: Character, data: any): Promise<ActionCode> {
      // this is the "action" for gathering a resource

      // check for params
      if (
        !data.resourceCode ||
        data.quantity === undefined ||
        typeof data.quantity !== 'number'
      ) {
        console.log(`gatherResource: invalid data. ${data}`);
      }

      // check Successful conditions
      // usually resources we need to check the primary drop
      const encyclopedia = useEncyclopedia();
      const mainDrop = encyclopedia.getPrimaryResourceDrop(data.resourceCode);
      if (!mainDrop) {
        return ActionCode.Abort;
      }

      const resourceStack = me.inventory.find(
        (slot) => slot.code === mainDrop.code,
      );
      const hasFullInventory =
        me.inventory.reduce(
          (sum, currentSlot) => sum + currentSlot.quantity,
          0,
        ) === me.inventory_max_items;
      if (
        (data.quantity !== -1 &&
          resourceStack &&
          resourceStack.quantity >= data.quantity) ||
        (data.quantity === -1 && hasFullInventory)
      ) {
        return ActionCode.Successful;
      }

      // check Abort conditions
      if ((hasFullInventory && resourceStack?.quantity) ?? 0 < data.quantity) {
        return ActionCode.Abort;
      }

      // try and do some things
      const resourceTile = encyclopedia.getMapTileByResource(data.resourceCode);
      if (!resourceTile) {
        console.log(`can't find resource on map: ${data.resourceCode}`);
        return ActionCode.Abort;
      }

      var characterResult: Character, cooldownResult: number;
      if (resourceTile.x === me.x && resourceTile.y === me.y) {
        // I am on the tile and can gather
        const gatherResult = await charactersApi.gather(me.name);
        characterResult = gatherResult.data.character;
        cooldownResult = gatherResult.data.cooldown.remaining_seconds;
      } else {
        // move to the tile
        const moveResult = await charactersApi.moveCharacter(me.name, {
          x: resourceTile.x,
          y: resourceTile.y,
        });
        characterResult = moveResult.data.character;
        cooldownResult = moveResult.data.cooldown.remaining_seconds;
      }

      // wrap up
      await encyclopedia.replaceCharacter(characterResult);
      setTimeout(
        () => useOrchestrator().orchestrate(me.name),
        cooldownResult * 1000,
      );
      return ActionCode.Continue;
    },
    async emptyInventory(me: Character, data: any): Promise<ActionCode> {
      // this is the "action" for emptying inventory into the bank

      // no params to check

      // check Successful conditions
      const hasEmptyInventory = me.inventory.every(
        (slot) => slot.quantity === 0 && slot.code === '',
      );
      if (hasEmptyInventory) {
        return ActionCode.Successful;
      }

      // try and do some things
      const encyclopedia = useEncyclopedia();
      const bankTile = encyclopedia.getMapTileByContentType('bank');
      if (!bankTile) {
        console.log(`can't find bank on map`);
        return ActionCode.Abort;
      }

      var characterResult: Character, cooldownResult: number;
      if (bankTile.x === me.x && bankTile.y === me.y) {
        // I am on the tile and can deposit a slot
        const firstItemSlot = me.inventory.find(
          (slot) => slot.code !== '' && slot.quantity > 0,
        );
        if (!firstItemSlot) {
          // how did I get here?
          return ActionCode.Successful;
        }
        const bankResult = await charactersApi.depositBank(me.name, {
          quantity: firstItemSlot.quantity,
          code: firstItemSlot.code,
        });
        encyclopedia.replaceBank(bankResult.data.bank);
        characterResult = bankResult.data.character;
        cooldownResult = bankResult.data.cooldown.remaining_seconds;
      } else {
        // move to the tile
        const moveResult = await charactersApi.moveCharacter(me.name, {
          x: bankTile.x,
          y: bankTile.y,
        });
        characterResult = moveResult.data.character;
        cooldownResult = moveResult.data.cooldown.remaining_seconds;
      }

      // wrap up
      await encyclopedia.replaceCharacter(characterResult);
      setTimeout(
        () => useOrchestrator().orchestrate(me.name),
        cooldownResult * 1000,
      );
      return ActionCode.Continue;
    },
  },
  getters: {},
});
