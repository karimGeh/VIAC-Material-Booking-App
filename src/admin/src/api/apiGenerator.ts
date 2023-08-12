import axios from "axios";
import { toast } from "react-toastify";

import Paths from "routes/paths";
import { store } from "store";
import { getAPIBaseURL } from "./getHost";
import { user_logout } from "store/reducers/auth";
import { ApiGeneratorType } from "./types";
import { errorParser } from "./errors";

const baseURL = getAPIBaseURL();

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  // add auth token to all requests if user is logged in
  if (store.getState().auth.isLoggedIn) {
    const token = store.getState().auth.auth_token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(user_logout());

      toast.error("Your session has expired. Please login again.", {
        theme: "colored",
      });

      setTimeout(() => {
        window.location.href = Paths.home;
      }, 200);
    }

    return Promise.reject(error);
  }
);

export const ApiGenerator: ApiGeneratorType =
  <TRequest, TResponse>(api_request: (props: TRequest) => Promise<TResponse>) =>
  async (props: TRequest) => {
    try {
      const response = await api_request(props);
      return { response, errors: null };
    } catch (error) {
      return { errors: errorParser(error), response: null };
    }
  };

export default api;
