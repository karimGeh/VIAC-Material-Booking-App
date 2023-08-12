import Paths from "./paths";

export enum Tabs {
  Dashboard = "Dashboard",
  Users = "Users",

  Settings = "Settings",
}

export const isTabActive = (tab: Tabs) => {
  const path = window.location.pathname;

  switch (tab) {
    case Tabs.Dashboard:
      return path === Paths.dashboard;

    case Tabs.Users:
      return path === Paths.users;

    case Tabs.Settings:
      return path === Paths.settings;

    default:
      return false;
  }
};
