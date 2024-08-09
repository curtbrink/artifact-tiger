import artifactsApi from '../artifacts.api';
import { PagedResponseData } from '../types';
import { Monster, QueryMonstersRequest } from './monsters.models';

const monstersApi = {
  queryMonsters: () => `monsters/`,
};

export default {
  getAllMonsters(
    size: number = 100,
    page: number = 1,
  ): Promise<PagedResponseData<Monster>> {
    return artifactsApi.data
      .get(monstersApi.queryMonsters(), { params: { size, page } })
      .then((res) => res.data);
  },
  queryMonsters(
    data: QueryMonstersRequest,
  ): Promise<PagedResponseData<Monster>> {
    return artifactsApi.data
      .get(monstersApi.queryMonsters(), { params: data })
      .then((res) => res.data);
  },
};
