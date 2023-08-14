import { createSlice } from "@reduxjs/toolkit";
import { APIRoutes } from "api/types";
import {
  SagaRequestState,
  action_finish_builder,
  action_reset_builder,
  action_start_builder,
  defaultSagaRequestState,
} from "../types";
import {
  DeleteReservationResponse,
  // DeleteReservationResponse,
  GetAllReservationsResponse,
  GetReservationByIdResponse,
  UpdateReservationResponse,
} from "api/Reservations/response";
import {
  DeleteReservationRequest,
  GetAllReservationsRequest,
  GetReservationByIdRequest,
  UpdateReservationRequest,
} from "api/Reservations/request";

export type ReservationsStateType = {
  allReservations: SagaRequestState<
    GetAllReservationsResponse,
    GetAllReservationsRequest
  >;
  reservationById: SagaRequestState<
    GetReservationByIdResponse,
    GetReservationByIdRequest
  >;
  // createReservation: SagaRequestState<
  //   CreateReservationResponse,
  //   CreateReservationRequest
  // >;
  updateReservation: SagaRequestState<
    UpdateReservationResponse,
    UpdateReservationRequest
  >;
  deleteReservation: SagaRequestState<
    DeleteReservationResponse,
    DeleteReservationRequest
  >;
};

const initialState: ReservationsStateType = {
  allReservations: defaultSagaRequestState,
  reservationById: defaultSagaRequestState,
  // createReservation: defaultSagaRequestState,
  updateReservation: defaultSagaRequestState,
  deleteReservation: defaultSagaRequestState,
};

const action_start = action_start_builder<ReservationsStateType>();
const action_finish = action_finish_builder<ReservationsStateType>();
const action_reset = action_reset_builder<ReservationsStateType>();

export const ReservationSlice = createSlice({
  name: APIRoutes.Reservations,
  initialState,
  reducers: {
    allReservations_start: action_start("allReservations"),
    allReservations_finish: action_finish("allReservations"),
    allReservations_reset: action_reset("allReservations"),

    reservationById_start: action_start("reservationById"),
    reservationById_finish: action_finish("reservationById"),
    reservationById_reset: action_reset("reservationById"),

    // createReservation_start: action_start("createReservation"),
    // createReservation_finish: action_finish("createReservation"),
    // createReservation_reset: action_reset("createReservation"),

    updateReservation_start: action_start("updateReservation"),
    updateReservation_finish: action_finish("updateReservation"),
    updateReservation_reset: action_reset("updateReservation"),

    deleteReservation_start: action_start("deleteReservation"),
    deleteReservation_finish: action_finish("deleteReservation"),
    deleteReservation_reset: action_reset("deleteReservation"),
  },
});

const ReservationReducer = ReservationSlice.reducer;

export const {
  allReservations_start,
  allReservations_finish,
  allReservations_reset,
  reservationById_start,
  reservationById_finish,
  reservationById_reset,
  // createReservation_start,
  // createReservation_finish,
  // createReservation_reset,
  updateReservation_start,
  updateReservation_finish,
  updateReservation_reset,
  deleteReservation_start,
  deleteReservation_finish,
  deleteReservation_reset,
} = ReservationSlice.actions;

export type ReservationsAction =
  | ReturnType<typeof allReservations_start>
  | ReturnType<typeof allReservations_finish>
  | ReturnType<typeof allReservations_reset>
  | ReturnType<typeof reservationById_start>
  | ReturnType<typeof reservationById_finish>
  | ReturnType<typeof reservationById_reset>
  // | ReturnType<typeof createReservation_start>
  // | ReturnType<typeof createReservation_finish>
  // | ReturnType<typeof createReservation_reset>
  | ReturnType<typeof updateReservation_start>
  | ReturnType<typeof updateReservation_finish>
  | ReturnType<typeof updateReservation_reset>
  | ReturnType<typeof deleteReservation_start>
  | ReturnType<typeof deleteReservation_finish>
  | ReturnType<typeof deleteReservation_reset>;

export default ReservationReducer;
