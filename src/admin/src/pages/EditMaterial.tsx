import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { MaterialState } from "api/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import { allMaterialCategories_start } from "store/reducers/api/MaterialCategories";
import {
  allMaterials_start,
  //   deleteMaterial_start,
  materialById_start,
  updateMaterial_start,
} from "store/reducers/api/Materials";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

export const EditMaterial: React.FC<React.PropsWithChildren> = () => {
  const {
    "material-categories": { allMaterialCategories },
    materials: { updateMaterial, materialById },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materialId } = useParams();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const result = form.validateFields();
    if (!result) return toast.error("Please fill all required fields");
    const values = form.getFieldsValue();
    dispatch(
      updateMaterial_start({
        ...(materialById.response?.material || {}),
        ...values,
      })
    );
  };

  const onClose = () => {
    navigate(Paths.materials);
  };

  //   const onDelete = () => {
  //     if (!materialById.response?.material) {
  //       return toast.error("Can't delete this material, please try again");
  //     }
  //     dispatch(deleteMaterial_start(materialById.response.material));
  //   };

  useEffect(() => {
    if (materialId) dispatch(materialById_start({ id: materialId }));
  }, [materialId]);

  //   get by id use effect
  useEffect(() => {
    if (materialById.errors) {
      materialById.errors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (materialById.response?.material) {
      form.setFieldsValue({
        ...materialById.response.material,
        type: materialById.response.material.type._id,
        compatibleWith: materialById.response.material.compatibleWith.map(
          (item) => item._id
        ),
      });

      console.log({
        material: materialById.response.material,
        ...materialById.response.material,
        type: materialById.response.material.type._id,
        compatibleWith: materialById.response.material.compatibleWith.map(
          (item) => item._id
        ),
      });
    }
  }, [materialById.response, materialById.errors]);

  //   delete use effect
  //   useEffect(() => {
  //     if (deleteMaterial.errors) {
  //       deleteMaterial.errors.forEach((error) => {
  //         toast.error(error.message);
  //       });
  //     } else if (
  //       deleteMaterial.response &&
  //       deleteMaterial.response.success &&
  //       !deleteMaterial.loading
  //     ) {
  //       toast.success("Material deleted successfully");
  //       dispatch(allMaterials_start({}));
  //       navigate(Paths.materials);
  //     }
  //   }, [deleteMaterial.loading]);

  //   update use effect
  useEffect(() => {
    if (
      updateMaterial.response &&
      updateMaterial.response.success &&
      !updateMaterial.loading
    ) {
      toast.success("Material updated successfully");
      dispatch(allMaterials_start({}));
      navigate(Paths.materials);
    } else if (updateMaterial.errors && !updateMaterial.loading) {
      updateMaterial.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    // dispatch(updateMaterial_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMaterial.loading]);

  useEffect(() => {
    dispatch(allMaterialCategories_start({}));
  }, []);

  return (
    <Drawer
      title="Add Material "
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
            loading={updateMaterial.loading}
          >
            Update
          </Button>
        </Space>
      }
    >
      <Spin spinning={materialById.loading || updateMaterial.loading}>
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
              loading={allMaterialCategories.loading}
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
