import { APIRoutes } from "api/types";
import { combineReducers } from "redux";
import AuthenticationReducer, { AuthenticationAction } from "./Authentication";

const reducer = combineReducers({
  // reducer for each api screen
  [APIRoutes.Authentication]: AuthenticationReducer,
});

export type APIAction = AuthenticationAction;

export default reducer;
