import { Reducer } from "redux";
import { ReduxReducers } from "store/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginResponse, User } from "api/Authentication";

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  auth_token: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  auth_token: "",
};

export const userSlice = createSlice({
  name: ReduxReducers.Auth,
  initialState,
  reducers: {
    user_logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.auth_token = "";
    },

    user_login: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.auth_token = action.payload.auth_token;
    },
  },
});

export const { user_logout, user_login } = userSlice.actions;

const reducer: Reducer<AuthState> = userSlice.reducer;

export type AuthAction =
  | ReturnType<typeof user_logout>
  | ReturnType<typeof user_login>;

export default reducer;
