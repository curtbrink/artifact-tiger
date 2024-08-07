import artifactsApi from '../artifacts.api';
import { ResponseData } from '../types';
import {
  Character,
  FightResponse,
  GatheringResponse,
  MoveCharacterRequest,
  MoveCharacterResponse,
} from './characters.models';

const charactersApi = {
  myCharacters: () => `my/characters`,
  moveCharacter: (name: string) => `my/${name}/action/move`,
  fight: (name: string) => `my/${name}/action/fight`,
  gather: (name: string) => `my/${name}/action/gathering`,
};

export default {
  getMyCharacters(): Promise<ResponseData<Character[]>> {
    return artifactsApi.data
      .get(charactersApi.myCharacters())
      .then((res) => res.data);
  },
  moveCharacter(
    name: string,
    data: MoveCharacterRequest,
  ): Promise<ResponseData<MoveCharacterResponse>> {
    return artifactsApi.action
      .post(charactersApi.moveCharacter(name), data)
      .then((res) => res.data);
  },
  fight(name: string): Promise<ResponseData<FightResponse>> {
    return artifactsApi.action
      .post(charactersApi.fight(name))
      .then((res) => res.data);
  },
  gather(name: string): Promise<ResponseData<GatheringResponse>> {
    return artifactsApi.action
      .post(charactersApi.gather(name))
      .then((res) => res.data);
  },
};
