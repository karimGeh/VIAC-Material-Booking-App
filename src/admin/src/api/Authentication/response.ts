import { User } from "api/types";
export interface LoginResponse {
  user: User;
  auth_token: string;
}
