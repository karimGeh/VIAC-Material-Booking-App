import { Button, Row, Spin, Table, TableProps } from "antd";
import { Material } from "api/types";
import { MainLayout } from "layouts/MainLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

import {
  allMaterials_start,
  createMaterial_reset,
  // deleteMaterial_reset,
  materialById_reset,
  updateMaterial_reset,
} from "store/reducers/api/Materials";

interface TablePropsProps {
  navigate: NavigateFunction;
}

const tableProps = ({ navigate }: TablePropsProps): TableProps<Material> => ({
  pagination: {
    pageSize: 20,
  },
  scroll: {
    x: "max-content",
  },
  columns: [
    {
      title: "ID",
      dataIndex: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      render: (text) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {text?.slice(1, 6)}...{text?.slice(text.length - 6, text.length - 1)}
          <span
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: "10px",
            }}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type.name",
      sorter: (a, b) => a.type.name.localeCompare(b.type.name),
      render(_, record) {
        return record.type.name;
      },
    },
    {
      title: "Ref",
      dataIndex: "ref",
      sorter: (a, b) => a.ref.localeCompare(b.ref),
    },
    {
      title: "State",
      dataIndex: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      sorter: (a, b) => a.barcode.localeCompare(b.barcode),
    },
    {
      title: "Compatible With",
      dataIndex: "compatibleWith",
      render(_, record) {
        return record.compatibleWith.map((item) => item.name).join(", ");
      },
      // sorter: (a, b) => a.barcode.localeCompare(b.barcode),
    },
    {
      title: "Options",
      render(_, record) {
        const onClick = () => {
          navigate(Paths.get_materials_edit(record._id));
        };

        return (
          <Row justify="end">
            <Button
              style={{ width: "100%", maxWidth: "150px" }}
              onClick={onClick}
            >
              Edit
            </Button>
          </Row>
        );
      },
    },
  ],
});

export const Materials: React.FC<React.PropsWithChildren> = () => {
  const {
    materials: {
      allMaterials: { loading, response, errors },
    },
  } = useSelector<RootStateType, APIState>((state) => state.api);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(allMaterials_start({}));

    dispatch(createMaterial_reset());
    dispatch(updateMaterial_reset());
    // dispatch(deleteMaterial_reset());
    dispatch(materialById_reset());
  }, [location.pathname]);

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [response, errors]);
  return (
    <MainLayout>
      <Outlet />
      {/* add button */}
      <Row
        justify="end"
        style={{
          margin: "16px",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate(Paths.materials_add);
          }}
        >
          Add
        </Button>
      </Row>
      <Spin spinning={loading}>
        <Table
          dataSource={response?.materials}
          rowKey={(record) => record._id}
          {...tableProps({ navigate })}
        />
      </Spin>
    </MainLayout>
  );
};
