import artifactsApi from '../artifacts.api';
import { PagedResponseData } from '../types';
import { Item, QueryItemsRequest } from './items.models';

const itemsApi = {
  queryItems: () => `items/`,
};

export default {
  getAllItems(
    size: number = 100,
    page: number = 1,
  ): Promise<PagedResponseData<Item>> {
    return artifactsApi.data
      .get(itemsApi.queryItems(), { params: { size, page } })
      .then((res) => res.data);
  },
  queryItems(data: QueryItemsRequest): Promise<PagedResponseData<Item>> {
    return artifactsApi.data
      .get(itemsApi.queryItems(), { params: data })
      .then((res) => res.data);
  },
};
