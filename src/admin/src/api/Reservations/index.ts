import api, { ApiGenerator } from "api/apiGenerator";
import {
  DeleteReservationRequest,
  GetAllReservationsRequest,
  GetReservationByIdRequest,
  UpdateReservationRequest,
} from "./request";
import {
  DeleteReservationResponse,
  GetAllReservationsResponse,
  GetReservationByIdResponse,
  UpdateReservationResponse,
} from "./response";

const getAllReservations = ApiGenerator<
  GetAllReservationsRequest,
  GetAllReservationsResponse
>(async (request) => {
  const response = await api.get("/admin/reservations/", {
    params: {
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
    },
  });
  return response.data;
});

const getReservationById = ApiGenerator<
  GetReservationByIdRequest,
  GetReservationByIdResponse
>(async (request) => {
  const response = await api.get(`/admin/reservations/${request.id}`);
  return response.data;
});

const updateReservation = ApiGenerator<
  UpdateReservationRequest,
  UpdateReservationResponse
>(async (request) => {
  const response = await api.put(`/admin/reservations/${request._id}`, request);
  return response.data;
});

const deleteReservation = ApiGenerator<
  DeleteReservationRequest,
  DeleteReservationResponse
>(async (request) => {
  const response = await api.delete(`/admin/reservations/${request.id}`);
  return response.data;
});

const ReservationsAPIClient = {
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};

export default ReservationsAPIClient;
