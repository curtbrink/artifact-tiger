import spacetradersApi from '@/api/api/spacetraders.api';
import { PagedResponseData, ResponseData } from '@/api/models/misc.types';
import { Contract } from '@/api/models/contract.model';
import {
  AcceptContractResponse,
  DeliverCargoResponse,
} from '@/api/api/contract/contract-response.model';
import { DeliverCargoRequest } from '@/api/api/contract/contract-request.model';

const contractApi = {
  getMyContracts: (limit: number, page: number) =>
    `my/contracts?page=${page}&limit=${limit}`,
  acceptContract: (id: string) => `my/contracts/${id}/accept`,
  deliverCargo: (id: string) => `my/contracts/${id}/deliver`,
};

export default {
  getMyContracts(
    limit: number = 20,
    page: number = 1,
  ): Promise<PagedResponseData<Contract>> {
    return spacetradersApi
      .get(contractApi.getMyContracts(limit, page))
      .then((res) => res.data);
  },

  acceptContract(
    contractId: string,
  ): Promise<ResponseData<AcceptContractResponse>> {
    return spacetradersApi
      .post(contractApi.acceptContract(contractId))
      .then((res) => res.data);
  },

  deliverCargo(
    contractId: string,
    payload: DeliverCargoRequest,
  ): Promise<ResponseData<DeliverCargoResponse>> {
    return spacetradersApi
      .post(contractApi.deliverCargo(contractId), payload)
      .then((res) => res.data);
  },
};
