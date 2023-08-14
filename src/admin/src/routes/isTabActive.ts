import Paths from "./paths";

export enum Tabs {
  Dashboard = "Dashboard",
  Users = "Users",
  MaterialCategory = "MaterialCategory",
  Materials = "Materials",
  Reservations = "Reservations",

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

    case Tabs.MaterialCategory:
      return path === Paths.materialCategory;

    case Tabs.Materials:
      return path === Paths.materials;

    case Tabs.Reservations:
      return path === Paths.reservations;

    default:
      return false;
  }
};
