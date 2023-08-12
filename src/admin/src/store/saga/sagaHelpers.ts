import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

interface SagaAPIGeneratorProps<TRequest, TResponse> {
  api: (request: TRequest) => Promise<TResponse>;
  finish_action: (response: TResponse) => PayloadAction<TResponse>;
}

export const sagaAPIGenerator = <TRequest, TResponse>({
  api,
  finish_action,
}: SagaAPIGeneratorProps<TRequest, TResponse>) => {
  return function* (action: PayloadAction<TRequest>) {
    const response = (yield call(api, action.payload)) as Awaited<
      ReturnType<typeof api>
    >;

    yield put(finish_action(response));
  };
};
