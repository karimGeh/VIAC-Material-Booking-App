import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { MaterialState } from "api/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import { allMaterialCategories_start } from "store/reducers/api/MaterialCategories";
import { createMaterial_start } from "store/reducers/api/Materials";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

export const AddNewMaterial: React.FC<React.PropsWithChildren> = () => {
  const {
    "material-categories": { allMaterialCategories },
    materials: { createMaterial },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const result = form.validateFields();
    if (!result) return toast.error("Please fill all required fields");
    const values = form.getFieldsValue();
    dispatch(createMaterial_start(values));
  };

  const onClose = () => {
    navigate(Paths.materials);
  };

  useEffect(() => {
    if (
      createMaterial.response &&
      createMaterial.response.success &&
      !createMaterial.loading
    ) {
      toast.success("Material Category created successfully");
      navigate(Paths.materials);
    } else if (createMaterial.errors && !createMaterial.loading) {
      createMaterial.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    // dispatch(createMaterial_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMaterial.loading]);

  useEffect(() => {
    dispatch(allMaterialCategories_start({}));
  }, []);

  return (
    <Drawer
      title="Add Material"
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
            loading={createMaterial.loading}
          >
            Create
          </Button>
        </Space>
      }
    >
      <Spin spinning={createMaterial.loading}>
        <Form
          form={form}
          layout="vertical"
          name="addNewMaterial"
          onFinish={handleSubmit}
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            name="type"
            label="Type (Material Category)"
            rules={[
              {
                required: true,
                message: "Please select a Type",
              },
            ]}
          >
            <Select
              loading={allMaterialCategories.loading}
              placeholder="Select a Type"
              options={allMaterialCategories.response?.materialCategories.map(
                (category) => ({
                  label: category.name,
                  value: category._id,
                })
              )}
            />
          </Form.Item>
          <Form.Item
            name="ref"
            label="Reference"
            rules={[
              {
                required: true,
                message: "Please enter reference",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="state"
            label="Material Status"
            rules={[
              {
                required: true,
                message: "Please select a status",
              },
            ]}
          >
            <Select
              placeholder="Select a material status"
              options={Object.values(MaterialState).map((state) => ({
                label: state,
                value: state,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="barcode"
            label="Barcode"
            rules={[
              {
                required: true,
                message: "Please enter barcode",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="compatibleWith" label="Compatible With">
            <Select
              mode="multiple"
              placeholder="Select compatible with"
              defaultValue={[]}
              allowClear
              options={allMaterialCategories.response?.materialCategories.map(
                (category) => ({
                  label: category.name,
                  value: category._id,
                })
              )}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};
