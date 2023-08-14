import { Button, Popover, Row, Spin, Table, TableProps } from "antd";
import { User } from "api/types";
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
import {
  allUsers_start,
  resetPassword_reset,
  resetPassword_start,
  updateUser_reset,
  userById_reset,
} from "store/reducers/api/Users";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

interface TablePropsProps {
  navigate: NavigateFunction;
  onResetPassword: (recordId: string) => void;
}

const tableProps = ({
  navigate,
  onResetPassword,
}: TablePropsProps): TableProps<User> => ({
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
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Email",
      dataIndex: "email",

      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Phone",
      dataIndex: "phoneNum",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Role",
      dataIndex: "type",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Options",
      render(_, record, index) {
        const onClick = () => {
          navigate(`/users/${record._id}`);
        };

        return (
          <Popover
            key={index}
            placement="bottomLeft"
            content={
              <div
                style={{
                  width: "150px",
                  display: "flex",
                  gap: "8px",
                  flexDirection: "column",
                }}
              >
                <Row justify="center">
                  <Button style={{ width: "100%" }} onClick={onClick}>
                    Edit
                  </Button>
                </Row>
                <Row justify="center">
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => onResetPassword(record._id)}
                  >
                    Reset Password
                  </Button>
                </Row>
              </div>
            }
          >
            <Button>...</Button>
          </Popover>
        );
      },
    },
  ],
});

export const Users: React.FC<React.PropsWithChildren> = () => {
  const {
    users: {
      allUsers: { loading, response, errors },
    },
  } = useSelector<RootStateType, APIState>((state) => state.api);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onResetPassword = (recordId: string) => {
    dispatch(
      resetPassword_start({
        id: recordId,
      })
    );
  };

  useEffect(() => {
    dispatch(allUsers_start({}));
    dispatch(updateUser_reset());
    dispatch(userById_reset());
    dispatch(resetPassword_reset());
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
      <Spin spinning={loading}>
        <Table
          dataSource={response?.users}
          rowKey={(record) => record._id}
          {...tableProps({ navigate, onResetPassword })}
        />
      </Spin>
    </MainLayout>
  );
};
