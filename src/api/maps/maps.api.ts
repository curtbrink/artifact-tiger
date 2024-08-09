import artifactsApi from '../artifacts.api';
import { PagedResponseData } from '../types';
import { Map, QueryMapsRequest } from './maps.models';

const mapsApi = {
  queryMaps: () => `maps/`,
};

export default {
  getAllMaps(
    size: number = 100,
    page: number = 1,
  ): Promise<PagedResponseData<Map>> {
    return artifactsApi.data
      .get(mapsApi.queryMaps(), { params: { size, page } })
      .then((res) => res.data);
  },
  queryMaps(data: QueryMapsRequest): Promise<PagedResponseData<Map>> {
    return artifactsApi.data
      .get(mapsApi.queryMaps(), { params: data })
      .then((res) => res.data);
  },
};
