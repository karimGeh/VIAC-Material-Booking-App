export enum APIRoutes {
  Authentication = "auth",
}

export interface CustomError {
  message: string;
  field?: string;
  code?: string;
}

export interface ValidResponse<TResponse> {
  response: TResponse;
  errors: null;
}

export interface ErroneousResponse<TError = CustomError> {
  errors: TError[];
  response: null;
}

// eslint-disable-next-line
export type APIResponse<TResponse, TError = CustomError> =
  | ValidResponse<TResponse>
  | ErroneousResponse<TError>;

export type ApiGeneratorType = <TRequest, TResponse>(
  callback: (props: TRequest) => Promise<TResponse>
) => (props: TRequest) => Promise<APIResponse<TResponse>>;
