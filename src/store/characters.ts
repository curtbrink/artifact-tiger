import charactersApi from '@/api/characters/characters.api';
import {
  Character,
  EquipSlot,
  InventorySlot,
} from '@/api/characters/characters.models';
import { defineStore } from 'pinia';
import { useEncyclopedia } from './encyclopedia';
import { CraftingSkill } from '@/api/items/items.models';
import { DropRate, Resource } from '@/api/resources/resources.models';

export interface CharacterLoopSetting {
  name: string;
  action: string;
}

export interface CharacterLoopLibrary {
  [actionName: string]: (charName: string) => Promise<void>;
}

export const useCharacterLoops = defineStore('characterLoops', {
  state: () => ({
    characterActions: [] as CharacterLoopSetting[],
  }),
  actions: {
    async placeCharacterOnLoop(name: string, action: string) {
      console.log('entering placeCharacterOnLoop');
      // 1. place character on The List after clearing them out first
      await this.removeCharacterFromLoop(name);
      console.log('removed from The List');
      this.characterActions.push({ name, action });
      console.log('added to The List');

      // 2. shuttle the character to the right method
      const characterLoopLibrary: CharacterLoopLibrary = {
        powerlevel_mining: this.doPowerlevelMining,
      };
      console.log('about to do the entry method thing.');
      return characterLoopLibrary[action](name);
    },
    async removeCharacterFromLoop(name: string) {
      this.characterActions = this.characterActions.filter(
        (ca: CharacterLoopSetting) => ca.name !== name,
      );
    },

    async doPowerlevelMining(name: string) {
      console.log(`doing doPowerlevelMining for ${name}`);
      // anatomy of a loop:
      // 1. verify this character should be actioning by looking them up on The List.
      //    if they aren't on there, just stop doing whatever it is you think you're doing
      // 2. determine the next step to take based on current circumstances.
      // 3. perform the step, then take note of the cooldown on the response
      // 4. set a setTimeout with an arrow function to execute when the cooldown expires.
      //    the target of the arrow function should be this same method,
      //    which will determine the next step all over again from scratch

      // 1. check The List
      if (
        !this.characterActions.some(
          (entry: CharacterLoopSetting) => entry.name === name,
        )
      ) {
        console.log(`${name} wasn't on the list, breaking`);
        return;
      }

      const encyclopedia = useEncyclopedia();

      // 2. I sometimes wonder / where do we go from here? / it doesn't have to be like this / all we need to do is keep talking...
      const me = encyclopedia.getCharacterByName(name);
      if (!me) {
        // who am I?
        console.log('couldnt find me in character list, removing and breaking');
        this.removeCharacterFromLoop(name);
        return;
      }

      // 3. data acquisition phase
      // determines what we can mine
      const miningLevel = me.mining_level;
      console.log(`mining level is ${miningLevel}`);
      // list of all mining resources and their levels
      const miningHierarchy = encyclopedia.getResourcesBySkill(
        CraftingSkill.Mining,
      );
      // what's the highest level resource I can mine with my current level?
      const targetResource = miningHierarchy.reduce(
        (currentTarget: Resource, resourceToCheck: Resource) => {
          return resourceToCheck.level <= miningLevel &&
            resourceToCheck.level > currentTarget.level
            ? resourceToCheck
            : currentTarget;
        },
        { level: 0 } as Resource,
      );
      if (!targetResource.name) {
        // I'm literally a fetus who doesn't know what mining is
        console.log('couldnt determine target resource, removing and breaking');
        this.removeCharacterFromLoop(name);
        return;
      }
      console.log(`seeking ${targetResource.name}`);

      // consult the map
      const bankTile = encyclopedia.getMapTileByContentType('bank');
      const resourceTile = encyclopedia.getMapTileByResource(
        targetResource.code,
      );
      if (!bankTile || !resourceTile) {
        // tesla gps literally led me off a cliff into the ocean
        console.log(
          'couldnt locate resource or bank tile, removing and breaking',
        );
        this.removeCharacterFromLoop(name);
        return;
      }

      const meAtBank = me.x === bankTile.x && me.y === bankTile.y;
      const meAtResource = me.x === resourceTile.x && me.y === resourceTile.y;

      // what's in my backpack and can it hold more things
      const resourceCode = targetResource.drops.find(
        (d: DropRate) => d.rate === 1,
      )!.code;
      const hasEmptySlot = me.inventory.some(
        (slot: InventorySlot) => slot.quantity === 0 && slot.code === '',
      );
      const hasPartialResourceSlot = me.inventory.some(
        (slot: InventorySlot) =>
          slot.code === resourceCode && slot.quantity < 100,
      );
      const totalItems = me.inventory.reduce(
        (sum, currentSlot) => sum + currentSlot.quantity,
        0,
      );
      const hasLessThanTotalItems = totalItems < me.inventory_max_items;
      const hasInventorySpace =
        (hasEmptySlot || hasPartialResourceSlot) && hasLessThanTotalItems;
      const hasEmptyInventory = me.inventory.every(
        (slot) => slot.code === '' && slot.quantity === 0,
      );

      // 4. now we traverse a basic tree of actions based on the data acquired
      if (
        (meAtBank && hasEmptyInventory) ||
        (!meAtResource && hasInventorySpace)
      ) {
        // move to resource space
        console.log('moving to resource tile');
        const result = (
          await charactersApi.moveCharacter(name, {
            x: resourceTile.x,
            y: resourceTile.y,
          })
        ).data;
        encyclopedia.replaceCharacter(result.character);
        const cooldownSeconds = result.cooldown.remaining_seconds;
        setTimeout(() => this.doPowerlevelMining(name), cooldownSeconds * 1000);
        return;
      } else if (!hasInventorySpace) {
        // move to bank
        console.log('moving to bank');
        const result = (
          await charactersApi.moveCharacter(name, {
            x: bankTile.x,
            y: bankTile.y,
          })
        ).data;
        encyclopedia.replaceCharacter(result.character);
        const cooldownSeconds = result.cooldown.remaining_seconds;
        setTimeout(() => this.doPowerlevelMining(name), cooldownSeconds * 1000);
        return;
      } else if (meAtBank && !hasEmptyInventory) {
        // deposit some more stuff
        console.log('emptying inventory');
        const invSlot = me.inventory.find(
          (slot) => slot.quantity > 0 && slot.code !== '',
        )!;
        const result = (
          await charactersApi.depositBank(name, {
            code: invSlot.code,
            quantity: invSlot.quantity,
          })
        ).data;
        encyclopedia.replaceCharacter(result.character);
        const cooldownSeconds = result.cooldown.remaining_seconds;
        setTimeout(() => this.doPowerlevelMining(name), cooldownSeconds * 1000);
        return;
      } else if (meAtResource && hasInventorySpace) {
        // mine
        console.log('mining!');
        const result = (await charactersApi.gather(name)).data;
        console.log(`I earned ${result.details.xp} xp!`);
        encyclopedia.replaceCharacter(result.character);
        const cooldownSeconds = result.cooldown.remaining_seconds;
        setTimeout(() => this.doPowerlevelMining(name), cooldownSeconds * 1000);
        return;
      }
      // fallback?
      console.log('I didnt know what to do :(');
      this.removeCharacterFromLoop(name);
    },
  },
  getters: {
    getCharacterLoop: (state) => (name: string) =>
      state.characterActions.find((ca) => ca.name === name)?.action,
  },
});
