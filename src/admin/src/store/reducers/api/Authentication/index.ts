import { createSlice } from "@reduxjs/toolkit";
import { APIRoutes } from "api/types";
import {
  SagaRequestState,
  action_finish_builder,
  action_start_builder,
  defaultSagaRequestState,
} from "../types";
import { LoginRequest, LoginResponse } from "api/Authentication";

export type AuthenticationStateType = {
  login: SagaRequestState<LoginResponse, LoginRequest>;
};

const initialState: AuthenticationStateType = {
  login: defaultSagaRequestState,
};

const action_start = action_start_builder<AuthenticationStateType>();
const action_finish = action_finish_builder<AuthenticationStateType>();

export const AuthenticationSlice = createSlice({
  name: APIRoutes.Authentication,
  initialState,
  reducers: {
    login_start: action_start("login"),
    login_finish: action_finish("login"),
  },
});

const AuthenticationReducer = AuthenticationSlice.reducer;

export const { login_start, login_finish } = AuthenticationSlice.actions;

export type AuthenticationAction =
  | ReturnType<typeof login_start>
  | ReturnType<typeof login_finish>;

export default AuthenticationReducer;
