import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { UserTypes } from "api/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import {
  allUsers_start,
  updateUser_start,
  userById_start,
} from "store/reducers/api/Users";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

export const EditUser: React.FC<React.PropsWithChildren> = () => {
  const {
    users: {
      userById: { loading, response, errors },
      updateUser,
    },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const result = form.validateFields();
    if (!result) return toast.error("Please fill all required fields");
    const values = form.getFieldsValue();
    dispatch(
      updateUser_start({
        ...(response?.user || {}),
        ...values,
      })
    );
  };
  const onClose = () => {
    navigate(Paths.users);
  };

  useEffect(() => {
    if (userId) dispatch(userById_start({ id: userId }));
  }, [userId]);

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (response?.user) {
      form.setFieldsValue(response.user);
    }
  }, [response, errors]);

  useEffect(() => {
    if (
      updateUser.response &&
      updateUser.response.user &&
      !updateUser.loading
    ) {
      toast.success("User updated successfully");
      dispatch(allUsers_start({}));
      navigate(Paths.users);
    } else if (updateUser.errors && !updateUser.loading) {
      updateUser.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    // dispatch(userById_reset());
    // dispatch(updateUser_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUser.loading]);

  return (
    <Drawer
      title="Edit User"
      placement="right"
      width={500}
      open={true}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={form.submit}
            type="primary"
            loading={updateUser.loading}
          >
            Update
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading || updateUser.loading}>
        <Form
          form={form}
          layout="vertical"
          name="edit_user"
          onFinish={handleSubmit}
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter full name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
              {
                type: "email",
                message: "Please enter valid email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Code"
            rules={[
              {
                required: true,
                message: "Please enter code",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phoneNum" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select
              placeholder="Select role"
              allowClear={false}
              options={Object.values(UserTypes)
                .filter((value) => value !== UserTypes.superAdmin)
                .map((value) => ({
                  label: value,
                  value: value,
                }))}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};
