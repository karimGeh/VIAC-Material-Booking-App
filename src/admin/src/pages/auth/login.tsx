import { useEffect, useState } from "react";
import { AuthenticationLayout } from "layouts/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootAction } from "store/reducers";
import {
  AuthenticationStateType,
  login_start,
} from "store/reducers/api/Authentication";

import "styles/pages/auth/login.scss";
import { RootStateType } from "store/types";
import { Button } from "antd";
import { toast } from "react-toastify";

export const Login: React.FC<React.PropsWithChildren> = () => {
  const {
    login: { loading, errors, response },
  } = useSelector<RootStateType, AuthenticationStateType>(
    (state) => state.api.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<Dispatch<RootAction>>();

  const onChange =
    (name: keyof typeof state) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [name]: e.target.value });
    };

  const onLogin = () => {
    dispatch(login_start(state));
  };

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [errors, response]);

  return (
    <AuthenticationLayout>
      <div className="loginWrapper">
        <div className="loginForm">
          <div className="loginFormHeader">
            <div className="loginFormHeaderTitle">Login</div>
          </div>
          <div className="loginFormBody">
            <div className="loginFormBodyInput">
              <input
                className="loginFormBodyInputField"
                type="text"
                placeholder="Email"
                value={state.email}
                onChange={onChange("email")}
              />
            </div>
            <div className="loginFormBodyInput">
              <input
                className="loginFormBodyInputField"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={onChange("password")}
              />
            </div>
            <div className="loginFormBodyButton">
              {/* <PrimaryButton
                text="Login"
                onClick={onLogin}
                disabled={loading}
                loading={loading}
              />
            */}
              <Button
                type="primary"
                onClick={onLogin}
                loading={loading}
                className="loginFormBodyButtonField"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};
