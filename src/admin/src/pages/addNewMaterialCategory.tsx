import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import {
  allMaterialCategories_start,
  createMaterialCategory_start,
} from "store/reducers/api/MaterialCategories";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

export const AddNewMaterialCategory: React.FC<React.PropsWithChildren> = () => {
  const {
    "material-categories": { createMaterialCategory },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const result = form.validateFields();
    if (!result) return toast.error("Please fill all required fields");
    const values = form.getFieldsValue();
    dispatch(createMaterialCategory_start(values));
  };

  const onClose = () => {
    navigate(Paths.materialCategory);
  };

  useEffect(() => {
    if (
      createMaterialCategory.response &&
      createMaterialCategory.response.success &&
      !createMaterialCategory.loading
    ) {
      toast.success("Material Category created successfully");
      dispatch(allMaterialCategories_start({}));
      navigate(Paths.materialCategory);
    } else if (
      createMaterialCategory.errors &&
      !createMaterialCategory.loading
    ) {
      createMaterialCategory.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    // dispatch(createMaterialCategory_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMaterialCategory.loading]);

  return (
    <Drawer
      title="Add Material Category"
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
            loading={createMaterialCategory.loading}
          >
            Create
          </Button>
        </Space>
      }
    >
      <Spin spinning={createMaterialCategory.loading}>
        <Form
          form={form}
          layout="vertical"
          name="addNewMaterialCategory"
          onFinish={handleSubmit}
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};
