import { PayloadAction } from "@reduxjs/toolkit";
import UsersAPIClient from "api/Users";
import { GetUserByIdRequest, UpdateUserRequest } from "api/Users/request";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  UsersAction,
  allUsers_finish,
  resetPassword_finish,
  updateUser_finish,
  userById_finish,
} from "store/reducers/api/Users";

const getAllUsersSaga = function* () {
  const response = (yield call(UsersAPIClient.get_all_users, {})) as Awaited<
    ReturnType<typeof UsersAPIClient.get_all_users>
  >;
  yield put(allUsers_finish(response));
};

const userByIdSaga = function* (action: PayloadAction<GetUserByIdRequest>) {
  const response = (yield call(UsersAPIClient.get_user_by_id, {
    id: action.payload.id,
  })) as Awaited<ReturnType<typeof UsersAPIClient.get_user_by_id>>;
  yield put(userById_finish(response));
};

const updateUserSaga = function* (action: PayloadAction<UpdateUserRequest>) {
  const response = (yield call(
    UsersAPIClient.update_user,
    action.payload
  )) as Awaited<ReturnType<typeof UsersAPIClient.update_user>>;
  yield put(updateUser_finish(response));
};

const resetPasswordSaga = function* (
  action: PayloadAction<GetUserByIdRequest>
) {
  const response = (yield call(UsersAPIClient.reset_password, {
    id: action.payload.id,
  })) as Awaited<ReturnType<typeof UsersAPIClient.reset_password>>;
  yield put(resetPassword_finish(response));
};

function* saga() {
  yield takeEvery<UsersAction["type"], typeof getAllUsersSaga>(
    "users/allUsers_start",
    getAllUsersSaga
  );

  yield takeEvery<UsersAction["type"], typeof userByIdSaga>(
    "users/userById_start",
    userByIdSaga
  );

  yield takeEvery<UsersAction["type"], typeof updateUserSaga>(
    "users/updateUser_start",
    updateUserSaga
  );

  yield takeEvery<UsersAction["type"], typeof resetPasswordSaga>(
    "users/resetPassword_start",
    resetPasswordSaga
  );
}

export default saga;
