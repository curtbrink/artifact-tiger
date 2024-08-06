import artifactsApi from '../artifacts.api';
import { ResponseData } from '../types';
import { Character } from './characters.models';

const charactersApi = {
  myCharacters: () => `my/characters`,
};

export default {
  getMyCharacters(): Promise<ResponseData<Character[]>> {
    return artifactsApi.data
      .get(charactersApi.myCharacters())
      .then((res) => res.data);
  },
};
