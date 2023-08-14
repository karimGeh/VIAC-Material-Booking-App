import { Button, Drawer, Form, Modal, Select, Space, Spin } from "antd";
import { ReservationStatus } from "api/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paths from "routes/paths";
import {
  deleteReservation_start,
  reservationById_start,
  updateReservation_start,
} from "store/reducers/api/Reservations";
import { APIState } from "store/reducers/api/types";
import { RootStateType } from "store/types";

export const EditReservation: React.FC<React.PropsWithChildren> = () => {
  const {
    reservations: { updateReservation, reservationById, deleteReservation },
  } = useSelector<RootStateType, APIState>((state) => state.api);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const result = form.validateFields();
    if (!result) return toast.error("Please fill all required fields");
    const values = form.getFieldsValue();
    dispatch(
      updateReservation_start({
        ...(reservationById.response?.reservation || {}),
        ...values,
      })
    );
  };

  const onClose = () => {
    navigate(Paths.reservations);
  };

  const onDelete = () => {
    if (!reservationById.response?.reservation) {
      return toast.error(
        "Can't delete this material category, please try again"
      );
    }
    dispatch(
      deleteReservation_start({
        id: reservationById.response.reservation._id,
      })
    );
  };

  useEffect(() => {
    if (reservationId) dispatch(reservationById_start({ id: reservationId }));
  }, [reservationId]);

  //   get by id use effect
  useEffect(() => {
    if (reservationById.errors) {
      reservationById.errors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (reservationById.response?.reservation) {
      form.setFieldsValue({
        ...reservationById.response.reservation,
        startDate: dayjs(reservationById.response.reservation.startDate),
        endDate: dayjs(reservationById.response.reservation.endDate),
        returnedAt: dayjs(reservationById.response.reservation.returnedAt),
        cancelledAt: dayjs(reservationById.response.reservation.cancelledAt),
        expiredAt: dayjs(reservationById.response.reservation.expiredAt),
      });
    }
  }, [reservationById.response, reservationById.errors]);

  //   delete use effect
  useEffect(() => {
    if (deleteReservation.errors) {
      deleteReservation.errors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (
      deleteReservation.response &&
      deleteReservation.response.success &&
      !deleteReservation.loading
    ) {
      toast.success("Reservation deleted successfully");
      navigate(Paths.reservations);
    }
  }, [deleteReservation.loading]);

  //   update use effect
  useEffect(() => {
    if (
      updateReservation.response &&
      updateReservation.response.success &&
      !updateReservation.loading
    ) {
      toast.success("Reservation updated successfully");
      navigate(Paths.reservations);
    } else if (updateReservation.errors && !updateReservation.loading) {
      updateReservation.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    // dispatch(updateReservation_reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateReservation.loading]);

  return (
    <Drawer
      title="Add Reservation "
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
            loading={updateReservation.loading}
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
        confirmLoading={deleteReservation.loading}
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to confirm the deletion of this reservation ?
        </p>
        <p>id : {reservationById.response?.reservation._id || ""}</p>
        <p>
          author : {reservationById.response?.reservation.author.fullName || ""}
        </p>
      </Modal>

      <Spin spinning={reservationById.loading || updateReservation.loading}>
        <Form
          form={form}
          layout="vertical"
          name="addNewReservation"
          onFinish={handleSubmit}
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select a Status",
              },
            ]}
          >
            <Select
              options={Object.values(ReservationStatus)
                .filter((value) => value !== ReservationStatus.active)
                .map((value) => ({
                  label: value,
                  value: value,
                }))}
            />
          </Form.Item>
          {/* <Row>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  {
                    required: true,
                    message: "Please select a Status",
                  },
                ]}
              >
                <DatePicker showTime format={"YYYY-MM-DD HH:mm"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[
                  {
                    required: true,
                    message: "Please select a Status",
                  },
                ]}
              >
                <DatePicker showTime format={"YYYY-MM-DD HH:mm"} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="returnedAt"
                label="Returned At"
                rules={[
                  {
                    required: true,
                    message: "Please select a Status",
                  },
                ]}
              >
                <DatePicker showTime format={"YYYY-MM-DD HH:mm"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cancelledAt"
                label="Cancelled At"
                rules={[
                  {
                    required: true,
                    message: "Please select a Status",
                  },
                ]}
              >
                <DatePicker showTime format={"YYYY-MM-DD HH:mm"} />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </Spin>
    </Drawer>
  );
};
