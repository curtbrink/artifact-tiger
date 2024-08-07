import charactersApi from '@/api/characters/characters.api';
import { Character } from '@/api/characters/characters.models';
import { defineStore } from 'pinia';

export const useCharacters = defineStore('characters', {
  state: () => ({
    characterList: [] as Character[],
    selectedCharacter: {} as Character,
  }),
  actions: {
    async fetchAllMyCharacters() {
      this.characterList = (await charactersApi.getMyCharacters()).data;
      if (!this.selectedCharacter.name) {
        await this.selectCharacter(this.characterList[0]?.name);
      }
    },
    async selectCharacter(name: string) {
      this.selectedCharacter =
        this.characterList.find((c) => c.name === name) ?? ({} as Character);
    },
    async moveCharacter(x: number, y: number) {
      var moveResult = (
        await charactersApi.moveCharacter(this.selectedCharacter.name, { x, y })
      ).data;
      this.selectedCharacter = moveResult.character;
    },
    async fight() {
      var fightResult = (await charactersApi.fight(this.selectedCharacter.name))
        .data;
      this.selectedCharacter = fightResult.character;
    },
    async gather() {
      var gatheringResult = (
        await charactersApi.gather(this.selectedCharacter.name)
      ).data;
      this.selectedCharacter = gatheringResult.character;
    },
  },
});
