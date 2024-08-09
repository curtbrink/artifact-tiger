import artifactsApi from '../artifacts.api';
import { PagedResponseData } from '../types';
import { QueryResourcesRequest, Resource } from './resources.models';

const resourcesApi = {
  queryResources: () => `resources/`,
};

export default {
  getAllResources(
    size: number = 100,
    page: number = 1,
  ): Promise<PagedResponseData<Resource>> {
    return artifactsApi.data
      .get(resourcesApi.queryResources(), { params: { size, page } })
      .then((res) => res.data);
  },
  queryResources(
    data: QueryResourcesRequest,
  ): Promise<PagedResponseData<Resource>> {
    return artifactsApi.data
      .get(resourcesApi.queryResources(), { params: data })
      .then((res) => res.data);
  },
};
