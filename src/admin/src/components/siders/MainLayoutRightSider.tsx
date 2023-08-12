import { Layout } from "antd";
import { constants } from "conf/constants";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, toggleRightDrawer } from "store/reducers/global";
import { RootStateType } from "store/types";

import "styles/components/siders/MainLayoutRightSider.scss";
const { Sider } = Layout;

export const MainLayoutRightSider: React.FC<React.PropsWithChildren> = () => {
  const { isRightDrawerOpen } = useSelector<RootStateType, GlobalState>(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const onToggleRightDrawer = () => {
    dispatch(toggleRightDrawer());
  };
  return (
    <Sider
      className="mainLayoutRightSider"
      style={{
        position: "fixed",
        right: 10,
        top: 0,
        bottom: 0,
        zIndex: 1,
        // background: "transparent",
      }}
      width={
        isRightDrawerOpen
          ? constants.rightDrawerWidthOpen
          : constants.rightDrawerWidthClosed
      }
      onClick={onToggleRightDrawer}
    ></Sider>
  );
};
