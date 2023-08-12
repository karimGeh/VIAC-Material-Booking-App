import { StateMainNavigationBar } from "components/common/StateMainNavigationBar";
import { MainLayout } from "layouts/MainLayout";
import { Outlet } from "react-router-dom";

import "styles/pages/state.scss";

export const State: React.FC<React.PropsWithChildren> = () => {
  return (
    <MainLayout>
      <StateMainNavigationBar />
      <Outlet />
    </MainLayout>
  );
};
