import { createSlice } from "@reduxjs/toolkit";
import { APIRoutes } from "api/types";
import {
  SagaRequestState,
  action_finish_builder,
  action_reset_builder,
  action_start_builder,
  defaultSagaRequestState,
} from "../types";
import {
  GetAllUsersResponse,
  GetUserByIdResponse,
  UpdateUserResponse,
} from "api/Users/response";
import { GetUserByIdRequest, UpdateUserRequest } from "api/Users/request";
import { toast } from "react-toastify";

export type UsersStateType = {
  allUsers: SagaRequestState<GetAllUsersResponse>;
  userById: SagaRequestState<GetUserByIdResponse, GetUserByIdRequest>;
  updateUser: SagaRequestState<UpdateUserResponse, UpdateUserRequest>;
  resetPassword: SagaRequestState<GetUserByIdResponse, GetUserByIdRequest>;
};

const initialState: UsersStateType = {
  allUsers: defaultSagaRequestState,
  userById: defaultSagaRequestState,
  updateUser: defaultSagaRequestState,
  resetPassword: defaultSagaRequestState,
};

const action_start = action_start_builder<UsersStateType>();
const action_finish = action_finish_builder<UsersStateType>();
const action_reset = action_reset_builder<UsersStateType>();

export const UsersSlice = createSlice({
  name: APIRoutes.Users,
  initialState,
  reducers: {
    allUsers_start: action_start("allUsers"),
    allUsers_finish: action_finish("allUsers"),
    allUsers_reset: action_reset("allUsers"),

    userById_start: action_start("userById"),
    userById_finish: action_finish("userById"),
    userById_reset: action_reset("userById"),

    updateUser_start: action_start("updateUser"),
    updateUser_finish: action_finish("updateUser"),
    updateUser_reset: action_reset("updateUser"),

    resetPassword_start: action_start("resetPassword"),
    resetPassword_finish: action_finish("resetPassword", (state) => {
      if (state.resetPassword.response?.success) {
        toast.success("Password reset successfully");
      } else if (state.resetPassword.errors) {
        state.resetPassword.errors.forEach((error) => {
          toast.error(error.message);
        });
      }
    }),
    resetPassword_reset: action_reset("resetPassword"),
  },
});

const UsersReducer = UsersSlice.reducer;

export const {
  allUsers_start,
  allUsers_finish,
  allUsers_reset,

  userById_start,
  userById_finish,
  userById_reset,

  updateUser_start,
  updateUser_finish,
  updateUser_reset,

  resetPassword_start,
  resetPassword_finish,
  resetPassword_reset,
} = UsersSlice.actions;

export type UsersAction =
  | ReturnType<typeof allUsers_start>
  | ReturnType<typeof allUsers_finish>
  | ReturnType<typeof userById_reset>
  | ReturnType<typeof userById_start>
  | ReturnType<typeof userById_finish>
  | ReturnType<typeof updateUser_reset>
  | ReturnType<typeof updateUser_start>
  | ReturnType<typeof updateUser_finish>
  | ReturnType<typeof allUsers_reset>
  | ReturnType<typeof resetPassword_start>
  | ReturnType<typeof resetPassword_finish>
  | ReturnType<typeof resetPassword_reset>;

export default UsersReducer;
