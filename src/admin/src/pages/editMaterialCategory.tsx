import { Button, Drawer, Form, Input, Modal, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import {
  allMaterialCategories_start,
  deleteMaterialCategory_start,
  materialCategoryById_start,
  updateMaterialCategory_start,
} from "store/reducers/api/MaterialCategories";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

export const EditMaterialCategory: React.FC<React.PropsWithChildren> = () => {
  const {
    "material-categories": {
      updateMaterialCategory,
      materialCategoryById,
      deleteMaterialCategory,
    },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materialCategoryId } = useParams();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const result = form.validateFields();
    if (!result) return toast.error("Please fill all required fields");
    const values = form.getFieldsValue();
    dispatch(
      updateMaterialCategory_start({
        ...(materialCategoryById.response?.materialCategory || {}),
        ...values,
      })
    );
  };

  const onClose = () => {
    navigate(Paths.materialCategory);
  };

  const onDelete = () => {
    if (!materialCategoryById.response?.materialCategory) {
      return toast.error(
        "Can't delete this material category, please try again"
      );
    }
    dispatch(
      deleteMaterialCategory_start(
        materialCategoryById.response.materialCategory
      )
    );
  };

  useEffect(() => {
    if (materialCategoryId)
      dispatch(materialCategoryById_start({ id: materialCategoryId }));
  }, [materialCategoryId]);

  //   get by id use effect
  useEffect(() => {
    if (materialCategoryById.errors) {
      materialCategoryById.errors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (materialCategoryById.response?.materialCategory) {
      form.setFieldsValue(materialCategoryById.response.materialCategory);
    }
  }, [materialCategoryById.response, materialCategoryById.errors]);

  //   delete use effect
  useEffect(() => {
    if (deleteMaterialCategory.errors) {
      deleteMaterialCategory.errors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (
      deleteMaterialCategory.response &&
      deleteMaterialCategory.response.success &&
      !deleteMaterialCategory.loading
    ) {
      toast.success("Material Category deleted successfully");
      dispatch(allMaterialCategories_start({}));
      navigate(Paths.materialCategory);
    }
  }, [deleteMaterialCategory.loading]);

  //   update use effect
  useEffect(() => {
    if (
      updateMaterialCategory.response &&
      updateMaterialCategory.response.success &&
      !updateMaterialCategory.loading
    ) {
      toast.success("Material Category updated successfully");
      dispatch(allMaterialCategories_start({}));
      navigate(Paths.materialCategory);
    } else if (
      updateMaterialCategory.errors &&
      !updateMaterialCategory.loading
    ) {
      updateMaterialCategory.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    // dispatch(updateMaterialCategory_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMaterialCategory.loading]);

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
          <Button danger onClick={() => setConfirmDeleteModal(true)}>
            Delete
          </Button>
          <Button
            onClick={form.submit}
            type="primary"
            loading={updateMaterialCategory.loading}
          >
            Update
          </Button>
        </Space>
      }
    >
      <Modal
        title="Confirm Delete"
        open={confirmDeleteModal}
        onOk={onDelete}
        onCancel={() => setConfirmDeleteModal(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        confirmLoading={deleteMaterialCategory.loading}
        cancelText="Cancel"
      >
        <p>Are you sure you want to confirm the deletion of this material ?</p>
        <p>id : {materialCategoryById.response?.materialCategory._id || ""}</p>
        <p>
          name : {materialCategoryById.response?.materialCategory.name || ""}
        </p>
      </Modal>

      <Spin
        spinning={
          materialCategoryById.loading || updateMaterialCategory.loading
        }
      >
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
