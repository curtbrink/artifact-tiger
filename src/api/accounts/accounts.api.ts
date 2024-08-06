import artifactsApi from '../artifacts.api';
import { CreateAccountRequest, CreateAccountResponse } from './accounts.models';

const accountsApi = {
  createAccount: () => `accounts/create`,
};

export default {
  createAccount(data: CreateAccountRequest): Promise<CreateAccountResponse> {
    return artifactsApi.registration
      .post(accountsApi.createAccount(), data)
      .then((res) => res.data);
  },
};
