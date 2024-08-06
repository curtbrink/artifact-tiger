export interface CreateAccountRequest {
  username: string;
  password: string;
  email: string;
}

export interface CreateAccountResponse {
  message: string;
}
