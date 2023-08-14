import { Layout, Tooltip } from "antd";
import { constants } from "conf/constants";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, toggleLeftDrawer } from "store/reducers/global";
import { RootStateType } from "store/types";
import { Tabs, isTabActive } from "routes/isTabActive";

import Paths from "routes/paths";

import {
  BiChevronLeft,
  BiChevronRight,
  BiLogOut,
  BiCategoryAlt,
  BiCalendarEvent,
} from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { RiSettings5Line } from "react-icons/ri";
import { FiTool } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

import { user_logout } from "store/reducers/auth";
import { useNavigate } from "react-router-dom";

import "styles/components/siders/MainLayoutLeftSider.scss";

const { Sider } = Layout;

export const MainLayoutLeftSider: React.FC<React.PropsWithChildren> = () => {
  const { isLeftDrawerOpen } = useSelector<RootStateType, GlobalState>(
    (state) => state.global
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onToggleLeftDrawer = () => {
    dispatch(toggleLeftDrawer());
  };

  const onLogout = () => {
    dispatch(user_logout());
  };

  const onTabClick = (tab: Tabs) => () => {
    if (isTabActive(tab)) return;
    switch (tab) {
      case Tabs.Dashboard:
        navigate(Paths.dashboard);
        break;

      case Tabs.Users:
        navigate(Paths.users);
        break;

      case Tabs.Settings:
        navigate(Paths.settings);
        break;

      case Tabs.Materials:
        navigate(Paths.materials);
        break;
      case Tabs.MaterialCategory:
        navigate(Paths.materialCategory);
        break;
      case Tabs.Reservations:
        navigate(Paths.reservations);
        break;

      default:
        break;
    }
  };

  return (
    <Sider
      className="mainLayoutLeftSider"
      style={{
        position: "fixed",
        left: 10,
        top: 0,
        bottom: 0,
        zIndex: 1,
      }}
      width={
        isLeftDrawerOpen
          ? constants.leftDrawerWidthOpen
          : constants.leftDrawerWidthClosed
      }
    >
      <div className="toggleButton">
        <button onClick={onToggleLeftDrawer}>
          {isLeftDrawerOpen ? <BiChevronLeft /> : <BiChevronRight />}
        </button>
      </div>

      <div className="allLinksWrapper">
        <div className="topLinks">
          <Tooltip title="Dashboard" placement="right">
            <div
              className={`linkWrapper ${
                isTabActive(Tabs.Dashboard) && "active"
              }`}
            >
              <button onClick={onTabClick(Tabs.Dashboard)}>
                <div className="iconWrapper">
                  <RxDashboard className="icon" />
                </div>
                <div className="text">Dashboard</div>
              </button>
            </div>
          </Tooltip>
          <Tooltip title="Users" placement="right">
            <div
              className={`linkWrapper ${isTabActive(Tabs.Users) && "active"}`}
            >
              <button onClick={onTabClick(Tabs.Users)}>
                <div className="iconWrapper">
                  <FaUsers className="icon" />
                </div>
                <div className="text">Users</div>
              </button>
            </div>
          </Tooltip>
          <Tooltip title="Material Categories" placement="right">
            <div
              className={`linkWrapper ${
                isTabActive(Tabs.MaterialCategory) && "active"
              }`}
            >
              <button onClick={onTabClick(Tabs.MaterialCategory)}>
                <div className="iconWrapper">
                  <BiCategoryAlt className="icon" />
                </div>
                <div className="text">Material Categories</div>
              </button>
            </div>
          </Tooltip>
          <Tooltip title="Materials" placement="right">
            <div
              className={`linkWrapper ${
                isTabActive(Tabs.Materials) && "active"
              }`}
            >
              <button onClick={onTabClick(Tabs.Materials)}>
                <div className="iconWrapper">
                  <FiTool className="icon" />
                </div>
                <div className="text">Materials</div>
              </button>
            </div>
          </Tooltip>
          <Tooltip title="Reservations" placement="right">
            <div
              className={`linkWrapper ${
                isTabActive(Tabs.Reservations) && "active"
              }`}
            >
              <button onClick={onTabClick(Tabs.Reservations)}>
                <div className="iconWrapper">
                  <BiCalendarEvent className="icon" />
                </div>
                <div className="text">Reservations</div>
              </button>
            </div>
          </Tooltip>
        </div>

        <div className="bottomLinks">
          <Tooltip title="Settings" placement="right">
            <div
              className={`linkWrapper ${
                isTabActive(Tabs.Settings) && "active"
              }`}
            >
              <button onClick={onTabClick(Tabs.Settings)}>
                <div className="iconWrapper">
                  <RiSettings5Line className="icon" />
                </div>
                <div className="text">Settings</div>
              </button>
            </div>
          </Tooltip>
          <Tooltip title="Logout" placement="right">
            <div className="linkWrapper">
              <button onClick={onLogout}>
                <div className="iconWrapper">
                  <BiLogOut className="icon" />
                </div>
                <div className="text">Logout</div>
              </button>
            </div>
          </Tooltip>
        </div>
      </div>
    </Sider>
  );
};
