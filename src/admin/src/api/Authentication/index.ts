import { ApiGenerator, api } from "api/apiGenerator";
import { LoginRequest } from "./request";
import { LoginResponse } from "./response";

const login = ApiGenerator<LoginRequest, LoginResponse>(async (body) => {
  const response = await api.post<LoginResponse>(
    "/user/auth/admin-login",
    body
  );
  return response.data;
});

export const AuthenticationClientAPI = {
  login,
};

export * from "./request";
export * from "./response";
export default AuthenticationClientAPI;
