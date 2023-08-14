import { Card, Col, Row } from "antd";
import { MainLayout } from "layouts/MainLayout";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import "styles/pages/dashboard.scss";

export const Dashboard: React.FC<React.PropsWithChildren> = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    ...Array(10)
      .fill(0)
      .map(() => ({
        name: "Page A",
        uv: parseInt((Math.random() * 1000).toFixed(0)),
        pv: parseInt((Math.random() * 3000).toFixed(0)),
        amt: parseInt((Math.random() * 3000).toFixed(0)),
      })),
  ].sort((a, b) => a.pv - b.pv);
  return (
    <MainLayout>
      <div className="dashboardWrapper">
        <h1>Dashboard</h1>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title={43135} bordered={false}>
              Number of active Reservations
            </Card>
          </Col>
          <Col span={8}>
            <Card title={53} bordered={false}>
              Number of late reservations
            </Card>
          </Col>
          <Col span={8}>
            <Card title={255} bordered={false}>
              Number of active materials
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey={"pv"} />
              <YAxis />
            </LineChart>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};
