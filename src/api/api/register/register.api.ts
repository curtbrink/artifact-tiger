import { RegisterRequest } from '@/api/api/register/register-request.model';
import spacetradersApi from '@/api/api/spacetraders.api';
import { RegisterResponse } from '@/api/api/register/register-response.model';
import { ResponseData } from '@/api/models/misc.types';

const registerApi = {
  register: () => 'register',
};

export default {
  register(
    registerRequest: RegisterRequest,
  ): Promise<ResponseData<RegisterResponse>> {
    return spacetradersApi
      .post(registerApi.register(), registerRequest)
      .then((res) => res.data);
  },
};
