import api, { ApiGenerator } from "api/apiGenerator";
import { GetUserByIdRequest, UpdateUserRequest } from "./request";
import {
  GetAllUsersResponse,
  GetUserByIdResponse,
  UpdateUserResponse,
} from "./response";

const get_all_users = ApiGenerator<null, GetAllUsersResponse>(async () => {
  const response = await api.get("/admin/users/get-all");
  return response.data;
});

const get_user_by_id = ApiGenerator<GetUserByIdRequest, GetUserByIdResponse>(
  async (request) => {
    const response = await api.get(`/admin/users/get-by-id/${request.id}`);
    return response.data;
  }
);

const update_user = ApiGenerator<UpdateUserRequest, UpdateUserResponse>(
  async (request) => {
    const response = await api.put(`/admin/users/${request._id}`, request);
    return response.data;
  }
);

const reset_password = ApiGenerator<GetUserByIdRequest, UpdateUserResponse>(
  async (request) => {
    const response = await api.post(
      `/admin/users/reset-password/${request.id}`
    );
    return response.data;
  }
);

const UsersAPIClient = {
  get_all_users,
  get_user_by_id,

  update_user,

  reset_password,
};

export default UsersAPIClient;
