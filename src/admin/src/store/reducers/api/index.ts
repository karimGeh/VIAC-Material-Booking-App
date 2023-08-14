import { APIRoutes } from "api/types";
import { combineReducers } from "redux";
import AuthenticationReducer, { AuthenticationAction } from "./Authentication";
import UsersReducer, { UsersAction } from "./Users";
import MaterialCategoriesReducer, {
  MaterialCategoriesAction,
} from "./MaterialCategories";
import MaterialsReducer, { MaterialsAction } from "./Materials";
import ReservationsReducer, { ReservationsAction } from "./Reservations";

const reducer = combineReducers({
  // reducer for each api screen
  [APIRoutes.Authentication]: AuthenticationReducer,
  [APIRoutes.Users]: UsersReducer,
  [APIRoutes.MaterialCategories]: MaterialCategoriesReducer,
  [APIRoutes.Materials]: MaterialsReducer,
  [APIRoutes.Reservations]: ReservationsReducer,
});

export type APIAction =
  | AuthenticationAction
  | UsersAction
  | MaterialCategoriesAction
  | MaterialsAction
  | ReservationsAction;

export default reducer;
