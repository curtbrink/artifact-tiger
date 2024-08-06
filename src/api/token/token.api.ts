import artifactsApi from '../artifacts.api';
import { GenerateTokenRequest, GenerateTokenResponse } from './token.models';

// for logging in with username/password, we need to base64 encode the basic auth
const encodeAuth = (username: string, password: string): string =>
  btoa(`${username}:${password}`);

const baseUrl = 'token';

const tokenApi = {
  generateToken: () => `${baseUrl}/`,
};

export default {
  generateToken(data: GenerateTokenRequest): Promise<GenerateTokenResponse> {
    const encodedAuth = encodeAuth(data.username, data.password);
    return artifactsApi.token
      .post(
        tokenApi.generateToken(),
        {},
        { headers: { Authorization: `Basic ${encodedAuth}` } },
      )
      .then((res) => res.data);
  },
};
