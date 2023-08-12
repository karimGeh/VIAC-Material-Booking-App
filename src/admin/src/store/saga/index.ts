import { all, fork } from "redux-saga/effects";
import AuthenticationSaga from "./Authentication";

function* RootSaga() {
  yield all([
    fork(AuthenticationSaga),
    // fork,
    // fork,
  ]);
}

export default RootSaga;
