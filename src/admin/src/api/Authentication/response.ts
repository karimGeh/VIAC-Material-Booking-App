export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
}

export interface LoginResponse {
  user: User;
  auth_token: string;
}
