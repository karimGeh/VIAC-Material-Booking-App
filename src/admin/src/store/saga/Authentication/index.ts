import { PayloadAction } from "@reduxjs/toolkit";
import AuthenticationClientAPI, { LoginRequest } from "api/Authentication";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  AuthenticationAction,
  login_finish,
} from "store/reducers/api/Authentication";
import { user_login } from "store/reducers/auth";

const loginSaga = function* (action: PayloadAction<LoginRequest>) {
  const response = (yield call(
    AuthenticationClientAPI.login,
    action.payload
  )) as Awaited<ReturnType<typeof AuthenticationClientAPI.login>>;
  yield put(login_finish(response));
  if (response.response) yield put(user_login(response.response));
};

function* saga() {
  yield takeEvery<AuthenticationAction["type"], typeof loginSaga>(
    "auth/login_start",
    loginSaga
  );
}

export default saga;
