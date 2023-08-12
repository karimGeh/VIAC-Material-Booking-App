import { PayloadAction } from "@reduxjs/toolkit";
import AuthenticationClientAPI, { LoginRequest } from "api/Authentication";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  AuthenticationAction,
  login_finish,
} from "store/reducers/api/Authentication";
import { user_login } from "store/reducers/auth";

function* loginStartSaga(
  action: PayloadAction<LoginRequest>
): Generator<unknown, void, unknown> {
  const loginResponse = (yield call(
    AuthenticationClientAPI.login,
    action.payload
  )) as Awaited<ReturnType<typeof AuthenticationClientAPI.login>>;

  const { response } = loginResponse;

  yield put(login_finish(loginResponse));
  if (response) yield put(user_login(response));
}

function* saga() {
  yield takeEvery<AuthenticationAction["type"], typeof loginStartSaga>(
    "auth/login_start",
    loginStartSaga
  );
}

export default saga;
