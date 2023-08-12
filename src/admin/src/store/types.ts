import { APIState } from "./reducers/api/types";
import { GlobalState } from "./reducers/global";
import { AuthState } from "./reducers/auth";

export enum ReduxReducers {
  GLOBAL = "global",
  Auth = "auth",
  API = "api",
}

export interface RootStateType {
  [ReduxReducers.GLOBAL]: GlobalState;
  [ReduxReducers.Auth]: AuthState;
  [ReduxReducers.API]: APIState;
}
