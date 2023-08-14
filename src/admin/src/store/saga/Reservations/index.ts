import { PayloadAction } from "@reduxjs/toolkit";
import ReservationsAPIClient from "api/Reservations";
import {
  DeleteReservationRequest,
  GetAllReservationsRequest,
  GetReservationByIdRequest,
  UpdateReservationRequest,
} from "api/Reservations/request";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  ReservationsAction,
  allReservations_finish,
  deleteReservation_finish,
  reservationById_finish,
  updateReservation_finish,
} from "store/reducers/api/Reservations";

const allReservations = function* (
  action: PayloadAction<GetAllReservationsRequest>
) {
  const response = (yield call(
    ReservationsAPIClient.getAllReservations,
    action.payload
  )) as Awaited<ReturnType<typeof ReservationsAPIClient.getAllReservations>>;
  yield put(allReservations_finish(response));
};

const reservationById = function* (
  action: PayloadAction<GetReservationByIdRequest>
) {
  const response = (yield call(
    ReservationsAPIClient.getReservationById,
    action.payload
  )) as Awaited<ReturnType<typeof ReservationsAPIClient.getReservationById>>;
  yield put(reservationById_finish(response));
};

const updateReservation = function* (
  action: PayloadAction<UpdateReservationRequest>
) {
  const response = (yield call(
    ReservationsAPIClient.updateReservation,
    action.payload
  )) as Awaited<ReturnType<typeof ReservationsAPIClient.updateReservation>>;
  yield put(updateReservation_finish(response));
};

const deleteReservation = function* (
  action: PayloadAction<DeleteReservationRequest>
) {
  const response = (yield call(
    ReservationsAPIClient.deleteReservation,
    action.payload
  )) as Awaited<ReturnType<typeof ReservationsAPIClient.deleteReservation>>;
  yield put(deleteReservation_finish(response));
};

function* saga() {
  yield takeEvery<ReservationsAction["type"], typeof allReservations>(
    "reservations/allReservations_start",
    allReservations
  );

  yield takeEvery<ReservationsAction["type"], typeof reservationById>(
    "reservations/reservationById_start",
    reservationById
  );

  yield takeEvery<ReservationsAction["type"], typeof updateReservation>(
    "reservations/updateReservation_start",
    updateReservation
  );

  yield takeEvery<ReservationsAction["type"], typeof deleteReservation>(
    "reservations/deleteReservation_start",
    deleteReservation
  );
}

export default saga;
