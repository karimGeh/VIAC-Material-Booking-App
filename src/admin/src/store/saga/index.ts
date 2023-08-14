import { all, fork } from "redux-saga/effects";
import AuthenticationSaga from "./Authentication";
import UsersSaga from "./Users";
import MaterialCategoriesSaga from "./MaterialCategories";
import MaterialsSaga from "./Materials";
import ReservationsSaga from "./Reservations";

function* RootSaga() {
  yield all([
    fork(AuthenticationSaga),
    fork(UsersSaga),
    fork(MaterialCategoriesSaga),
    fork(MaterialsSaga),
    fork(ReservationsSaga),
    // fork,
  ]);
}

export default RootSaga;
