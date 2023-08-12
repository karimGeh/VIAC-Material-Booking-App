import { combineReducers } from "redux";
import { ReduxReducers, RootStateType } from "store/types";

import globalReducer, { GlobalAction } from "./global";
import authReducer, { AuthAction } from "./auth";
import apiReducer, { APIAction } from "./api";

export type RootAction = GlobalAction | AuthAction | APIAction;

const rootReducer = combineReducers<RootStateType, RootAction>({
  [ReduxReducers.GLOBAL]: globalReducer,
  [ReduxReducers.Auth]: authReducer,
  [ReduxReducers.API]: apiReducer,
});

export default rootReducer;
