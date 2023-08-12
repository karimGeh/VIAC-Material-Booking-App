import { APIScreens } from "api/types";
import Paths from "routes/paths";

export const screens = [
  {
    path: Paths.state_manage_data_nbv,
    addNewPath: Paths.state_manage_data_nbv_add_new,
    screen: APIScreens.NBV,
  },
  {
    path: Paths.state_manage_reports,
    addNewPath: Paths.state_manage_reports_add_new,
    screen: APIScreens.ManageReport,
  },
  {
    path: Paths.state_manage_data_gis,
    screen: APIScreens.GIS,
  },
  {
    path: Paths.state_manage_data_throughput,
    screen: APIScreens.Throughput,
  },
  {
    path: Paths.state_manage_data_ferc,
    screen: APIScreens.FERC,
  },
  {
    path: Paths.state_manage_data_properties,
    screen: APIScreens.Property,
  },
  {
    path: Paths.state_manage_data_leased_system,
    screen: APIScreens.LeasedSystem,
  },
];

export const getCurrentScreen = (
  path = ""
  // default?: string
): APIScreens | null => {
  const pathname = path || window.location.pathname;

  // console.log({ pathname });

  const currentScreen = screens.find((screen) => {
    return pathname.includes(screen.path);
  });

  return currentScreen?.screen || null;
};
