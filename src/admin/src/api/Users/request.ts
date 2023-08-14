import { User } from "api/types";

export interface GetUserByIdRequest {
  id: string;
}

export type UpdateUserRequest = User;
