import { Button, Row, Spin, Table, TableProps } from "antd";
import { Reservation } from "api/types";
import { MainLayout } from "layouts/MainLayout";
import { useEffect, useState } from "react";
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
  allReservations_start,
  updateReservation_reset,
} from "store/reducers/api/Reservations";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

interface TablePropsProps {
  navigate: NavigateFunction;
}

const tableProps = ({
  navigate,
}: TablePropsProps): TableProps<Reservation> => ({
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
      title: "Author",
      dataIndex: "author",
      sorter: (a, b) => a.author.fullName.localeCompare(b.author.fullName),
      render: (text) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            <span>{text?.fullName}</span>
            <span
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "10px",
                marginLeft: "5px",
              }}
            >
              - {text?.code}
            </span>
          </span>
          <span
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: "10px",
            }}
          >
            {text?.email}
          </span>
        </div>
      ),
    },
    {
      title: "Material",
      dataIndex: "material",
      sorter: (a, b) =>
        a.material.type.name.localeCompare(b.material.type.name),
      render: (text) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {text?.type.name}
          <span
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: "10px",
            }}
          >
            {text?.ref}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Returned At",
      dataIndex: "returnedAt",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
    },
    {
      title: "Cancelled At",
      dataIndex: "cancelledAt",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Options",
      render(_, record) {
        const onClick = () => {
          navigate(Paths.get_reservations_edit(record._id));
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

export const Reservations: React.FC<React.PropsWithChildren> = () => {
  const {
    reservations: {
      allReservations: { loading, response, errors },
    },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const [paginationState, setPaginationState] = useState({
    pageSize: 10,
    pageNumber: 1,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(allReservations_start(paginationState));
    // dispatch(createMaterialCategory_reset());
    dispatch(updateReservation_reset());
    // dispatch(deleteMaterialCategory_reset());
    // dispatch(materialCategoryById_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, paginationState.pageNumber, paginationState.pageSize]);

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
      {/* <Row
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
      </Row> */}
      <Spin spinning={loading}>
        <Table
          dataSource={response?.reservations}
          pagination={{
            current: paginationState.pageNumber,
            pageSize: paginationState.pageSize,
            total: response?.numberOfReservations,
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,

            onChange: (page, pageSize) => {
              setPaginationState({
                pageSize: pageSize || 10,
                pageNumber: page,
              });
            },
            showTotal(total, range) {
              return `${range[0]}-${range[1]} of ${total} items`;
            },
          }}
          rowKey={(record) => record._id}
          {...tableProps({ navigate })}
        />
      </Spin>
    </MainLayout>
  );
};
