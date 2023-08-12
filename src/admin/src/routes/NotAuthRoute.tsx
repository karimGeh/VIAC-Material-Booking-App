import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Paths from "./paths";

import { RootStateType } from "store/types";
import { AuthState } from "store/reducers/auth";

interface Props {
  component: React.ElementType;
}

export const NotAuthRoute = ({ component: Component }: Props) => {
  const { isLoggedIn } = useSelector<RootStateType, AuthState>(
    (state) => state.auth
  );
  return !isLoggedIn ? <Component /> : <Navigate to={Paths.home} />;
};
