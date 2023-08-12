import { Navigate, Route, Routes } from "react-router-dom";

import Paths from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";

// ! Pages
// import { Home } from "pages/home";
import { Login } from "pages/auth/login";
import { NotAuthRoute } from "./NotAuthRoute";
import { Dashboard } from "pages/dashboard";
import { Users } from "pages/users";

export const RootRouter = () => {
  return (
    <Routes>
      <Route
        path={Paths.dashboard}
        element={<ProtectedRoute component={Dashboard} />}
      />
      <Route
        path={Paths.users}
        element={<ProtectedRoute component={Users} />}
      />

      {AuthRoutes}

      {/* redirect to catch-all route */}
      <Route path="*" element={<Navigate to={Paths.default} />} />
    </Routes>
  );
};

const AuthRoutes = (
  <>
    {/* auth */}
    <Route path={Paths.login} element={<NotAuthRoute component={Login} />} />
    <Route path={Paths.register} element={<div>Register</div>} />
    <Route
      path={Paths.auth_catch_all}
      element={<Navigate to={Paths.login} />}
    />
  </>
);
