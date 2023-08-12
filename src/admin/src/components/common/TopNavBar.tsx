import { Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "styles/components/common/TopNavBar.scss";

const { Header } = Layout;

export const TopNavBar: React.FC<React.PropsWithChildren> = () => {
  return (
    <Header className="topNavBarHeader">
      <div className="mainNavBarWrapper">
        <div className="leftSection">
          <div className="logoWrapper">
            <img src="/svg/stellantis-logo.svg" alt="logo" />
          </div>
        </div>
        <div className="rightSection">
          <div className="avatar">
            <UserOutlined />
          </div>
        </div>
      </div>
    </Header>
  );
};
