import artifactsApi from '../artifacts.api';
import { ResponseData } from '../types';
import {
  Character,
  DepositBankRequest,
  DepositBankResponse,
  EquipSlot,
  FightResponse,
  GatheringResponse,
  MoveCharacterRequest,
  MoveCharacterResponse,
  UnequipResponse,
} from './characters.models';

const charactersApi = {
  myCharacters: () => `my/characters`,
  moveCharacter: (name: string) => `my/${name}/action/move`,
  fight: (name: string) => `my/${name}/action/fight`,
  gather: (name: string) => `my/${name}/action/gathering`,
  unequip: (name: string) => `my/${name}/action/unequip`,
  depositBank: (name: string) => `my/${name}/action/bank/deposit`,
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
  unequip(
    name: string,
    slot: EquipSlot,
  ): Promise<ResponseData<UnequipResponse>> {
    return artifactsApi.action
      .post(charactersApi.unequip(name), { slot })
      .then((res) => res.data);
  },
  depositBank(
    name: string,
    data: DepositBankRequest,
  ): Promise<ResponseData<DepositBankResponse>> {
    return artifactsApi.action
      .post(charactersApi.depositBank(name), data)
      .then((res) => res.data);
  },
};
