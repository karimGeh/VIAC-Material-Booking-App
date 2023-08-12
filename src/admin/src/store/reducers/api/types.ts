import { APIResponse, APIRoutes, CustomError } from "api/types";
import { AuthenticationStateType } from "./Authentication";
import { PayloadAction } from "@reduxjs/toolkit";

// TODO: Add types for api state and actions
// eslint-disable-next-line
export type APIState = {
  [APIRoutes.Authentication]: AuthenticationStateType;
};

export interface APIAction {
  type: string;
  payload: {
    [x in keyof APIState]: APIState[x];
  };
}

// make SagaRequestState the union of APIResponse and the loading/error object
// eslint-disable-next-line
export interface SagaRequestState<TResponse = any, TRequest = any> {
  request: TRequest | null;
  response: TResponse | null;
  errors: CustomError[] | null;
  loading: boolean;
  isError: boolean;
}

export const defaultSagaRequestState = {
  request: null,
  response: null,
  errors: null,
  loading: false,
  isError: false,
};

export interface SagaActionRequest<TRequest> {
  type: string;
  payload: TRequest;
}

export interface SagaAction<TResponse> {
  type: string;
  payload: APIResponse<TResponse>;
}

export const action_start_builder =
  <StateType extends { [x: string]: SagaRequestState }>() =>
  <K extends keyof StateType>(name: K) =>
  // eslint-disable-next-line
  (state: StateType, _: PayloadAction<StateType[K]["request"]>) => {
    state[name].loading = true;
    state[name].isError = false;
  };

export const action_finish_builder =
  <StateType extends { [x: string]: SagaRequestState }>() =>
  <K extends keyof StateType, T extends StateType[K]["response"]>(name: K) =>
  (state: StateType, action: SagaAction<T>) => {
    state[name].loading = false;
    state[name].response = action.payload.response;
    state[name].errors = action.payload.errors;
    state[name].isError = !action.payload.response;
  };
