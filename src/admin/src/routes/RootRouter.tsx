import { Navigate, Route, Routes } from "react-router-dom";

import Paths from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";

// ! Pages
// import { Home } from "pages/home";
import { Login } from "pages/auth/login";
import { NotAuthRoute } from "./NotAuthRoute";
import { Dashboard } from "pages/dashboard";
import { Users } from "pages/users";
import { EditUser } from "pages/editUser";
import { MaterialCategories } from "pages/materialCategories";
import { Materials } from "pages/materials";
import { Reservations } from "pages/reservations";
import { AddNewMaterialCategory } from "pages/addNewMaterialCategory";
import { EditMaterialCategory } from "pages/editMaterialCategory";
import { AddNewMaterial } from "pages/AddNewMaterial";
import { EditMaterial } from "pages/EditMaterial";
import { EditReservation } from "pages/EditReservation";

export const RootRouter = () => {
  return (
    <Routes>
      <Route
        path={Paths.dashboard}
        element={<ProtectedRoute component={Dashboard} />}
      />

      {UsersRoutes}
      {MaterialCategoriesRoutes}
      {MaterialsRoutes}
      {ReservationsRoutes}
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

const UsersRoutes = (
  <>
    {/* users */}
    <Route path={Paths.users} element={<ProtectedRoute component={Users} />}>
      <Route path={Paths.users_edit} element={<EditUser />} />

      <Route
        path={Paths.users_catch_all}
        element={<Navigate to={Paths.users} />}
      />
    </Route>
  </>
);

const MaterialCategoriesRoutes = (
  <>
    {/* material categories */}
    <Route
      path={Paths.materialCategory}
      element={<ProtectedRoute component={MaterialCategories} />}
    >
      <Route
        path={Paths.materialCategory_edit}
        element={<EditMaterialCategory />}
      />
      <Route
        path={Paths.materialCategory_add}
        element={<AddNewMaterialCategory />}
      />

      <Route
        path={Paths.materialCategory_catch_all}
        element={<Navigate to={Paths.materialCategory} />}
      />
    </Route>
  </>
);

const MaterialsRoutes = (
  <>
    {/* materials */}
    <Route
      path={Paths.materials}
      element={<ProtectedRoute component={Materials} />}
    >
      <Route path={Paths.materials_edit} element={<EditMaterial />} />
      <Route path={Paths.materials_add} element={<AddNewMaterial />} />

      <Route
        path={Paths.materials_catch_all}
        element={<Navigate to={Paths.materials} />}
      />
    </Route>
  </>
);

const ReservationsRoutes = (
  <>
    {/* reservations */}
    <Route
      path={Paths.reservations}
      element={<ProtectedRoute component={Reservations} />}
    >
      <Route path={Paths.reservations_edit} element={<EditReservation />} />

      <Route
        path={Paths.reservations_catch_all}
        element={<Navigate to={Paths.reservations} />}
      />
    </Route>
  </>
);
