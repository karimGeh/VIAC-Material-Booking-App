import { Layout } from "antd";
import { TopNavBar } from "components/common/TopNavBar";
import { MainLayoutLeftSider } from "components/siders/MainLayoutLeftSider";
// import { MainLayoutRightSider } from "components/siders/MainLayoutRightSider";
import { constants } from "conf/constants";
import { useSelector } from "react-redux";
import { GlobalState } from "store/reducers/global";
import { RootStateType } from "store/types";

import "styles/layouts/MainLayout.scss";

const { Content } = Layout;

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLeftDrawerOpen } = useSelector<RootStateType, GlobalState>(
    (state) => state.global
  );

  return (
    <Layout className="mainLayout" hasSider>
      <MainLayoutLeftSider />
      <Layout className="contentLayout">
        <TopNavBar />
        <Content
          className="mainLayoutContent"
          style={{
            marginLeft:
              // uncomment the following line to make
              // the content area extend to the right
              // edge of the screen
              30 +
              (isLeftDrawerOpen
                ? constants.leftDrawerWidthOpen
                : constants.leftDrawerWidthClosed),
            marginRight: 30 + constants.rightDrawerWidthClosed,
            //   20 +
            //   (isRightDrawerOpen
            //     ? constants.rightDrawerWidthOpen
            //     : constants.rightDrawerWidthClosed),
          }}
        >
          {children}
        </Content>
      </Layout>
      {/* <MainLayoutRightSider /> */}
    </Layout>
  );
};
