import { Button, Row, Spin, Table, TableProps } from "antd";
import { MaterialCategory } from "api/types";
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
import {
  allMaterialCategories_start,
  createMaterialCategory_reset,
  deleteMaterialCategory_reset,
  materialCategoryById_reset,
  updateMaterialCategory_reset,
} from "store/reducers/api/MaterialCategories";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

interface TablePropsProps {
  navigate: NavigateFunction;
}

const tableProps = ({
  navigate,
}: TablePropsProps): TableProps<MaterialCategory> => ({
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
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Options",
      render(_, record) {
        const onClick = () => {
          navigate(Paths.get_materialCategory_edit(record._id));
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

export const MaterialCategories: React.FC<React.PropsWithChildren> = () => {
  const {
    "material-categories": {
      allMaterialCategories: { loading, response, errors },
    },
  } = useSelector<RootStateType, APIState>((state) => state.api);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(allMaterialCategories_start({}));
    dispatch(createMaterialCategory_reset());
    dispatch(updateMaterialCategory_reset());
    dispatch(deleteMaterialCategory_reset());
    dispatch(materialCategoryById_reset());
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
            navigate(Paths.materialCategory_add);
          }}
        >
          Add
        </Button>
      </Row>
      <Spin spinning={loading}>
        <Table
          dataSource={response?.materialCategories}
          rowKey={(record) => record._id}
          {...tableProps({ navigate })}
        />
      </Spin>
    </MainLayout>
  );
};
