import { Reservation } from "api/types";

export interface GetAllReservationsRequest {
  pageNumber: number;
  pageSize: number;
}

export interface GetReservationByIdRequest {
  id: string;
}

export type UpdateReservationRequest = Reservation;

export type DeleteReservationRequest = GetReservationByIdRequest;
