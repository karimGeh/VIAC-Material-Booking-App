import { User } from "api/types";

export interface GetAllUsersResponse {
  success: boolean;
  users: User[];
}

export interface GetUserByIdResponse {
  success: boolean;
  user: User;
}

export interface UpdateUserResponse {
  success: boolean;
  user: User;
}
