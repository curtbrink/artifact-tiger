import { Character } from '@/api/characters/characters.models';
import { defineStore } from 'pinia';
import { useActions } from './actions';
import { useEncyclopedia } from './encyclopedia';

// general notes

// def Orchestrator -> the main method that controls a character via its specified ActionPath
export type OrchestratorCharacters = {
  [name: string]: ActionPath | undefined;
};

// def ActionCode -> an enum that lets the Orchestrator know how to proceed based on the outcome of the action
export enum ActionCode {
  Continue = 'continue', // I'm not done with this action yet
  Successful = 'successful', // I'm finished with this action, proceed to the next
  Abort = 'abort', // I don't know how to continue, please stop processing
}

// def Action -> a self-contained method that performs a plain-English command e.g. Gather Resource, or Empty Inventory
export type Action = (me: Character, data: any) => Promise<ActionCode>;

// def ActionPath -> a set of Actions, an index for current action, and perhaps with some metadata including whether or not to loop
export type ActionPath = {
  metadata: any;
  actions: Action[];
  currentAction: number;
  pathName: string;
};

export const useOrchestrator = defineStore('orchestrator', {
  state: () => ({
    controlledCharacters: {} as OrchestratorCharacters,
  }),
  actions: {
    async addCharacterOrchestration(
      characterName: string,
      pathName: string,
      actionList: Action[],
      params: any,
    ) {
      const orchestrationData = {
        metadata: params,
        actions: actionList,
        currentAction: 0,
        pathName,
      };
      this.controlledCharacters[characterName] = orchestrationData;
      await this.orchestrate(characterName);
    },
    async removeCharacterOrchestration(characterName: string) {
      this.controlledCharacters[characterName] = undefined;
    },

    async orchestrate(characterName: string) {
      console.log(`=== ORCHESTRATION => ${characterName} ===`);
      // look up current path for this character, determine the action, then go.
      // action will return a code,
      //    Continue -> do nothing, action has already set timeout and expects to run again
      //    Successful -> increment the current step counter, then call the next action (action has not set timeout)
      //    Abort -> action ran into a weird state or something so abandon ship entirely
      const encyclopedia = useEncyclopedia();
      const me = encyclopedia.getCharacterByName(characterName);
      if (!me) {
        console.log(`Invalid character name: ${characterName}`);
        return;
      }

      let actionCode = ActionCode.Successful;
      while (actionCode === ActionCode.Successful) {
        const characterOrchestration = this.controlledCharacters[characterName];
        if (!characterOrchestration) {
          console.log(
            `Character ${characterName} is not on the Orchestrator list`,
          );
          return;
        }

        const currentAction =
          characterOrchestration.actions[characterOrchestration.currentAction];
        if (!currentAction) {
          console.log(
            `Invalid state: current action ${characterOrchestration.currentAction} but action list ${characterOrchestration.actions}`,
          );
          return;
        }

        actionCode = await currentAction(me, characterOrchestration.metadata);

        switch (actionCode) {
          case ActionCode.Abort:
            console.log('Action returned abort code, exiting');
            this.controlledCharacters[characterName] = undefined;
            return;
          case ActionCode.Continue:
            console.log('Action returned continue code, doing nothing');
            return;
          case ActionCode.Successful:
            console.log(
              'Action finished its ultimate goal, kick off the next one',
            );
            // this is ugly af but I never know with vue stores what's passed by reference or by value so yolo
            characterOrchestration.currentAction =
              characterOrchestration.currentAction + 1;
            this.controlledCharacters[characterName] = characterOrchestration;
            if (
              characterOrchestration.currentAction ===
              characterOrchestration.actions.length
            ) {
              if (characterOrchestration.metadata.shouldLoop === true) {
                characterOrchestration.currentAction = 0;
                this.controlledCharacters[characterName] =
                  characterOrchestration;
              } else {
                console.log('I completed every step!');
                this.controlledCharacters[characterName] = undefined;
              }
            }
        }
      }
    },
  },
  getters: {
    characterOrchestrationName: (state) => (name: string) =>
      state.controlledCharacters[name]?.pathName ?? 'N/A',
  },
});
