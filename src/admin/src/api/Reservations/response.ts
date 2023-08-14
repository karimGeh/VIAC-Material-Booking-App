import { Reservation } from "api/types";

export interface GetAllReservationsResponse {
  success: boolean;
  reservations: Reservation[];
  numberOfReservations: number;
}

export interface GetReservationByIdResponse {
  success: boolean;
  reservation: Reservation;
}
export type UpdateReservationResponse = GetReservationByIdResponse;
export type DeleteReservationResponse = GetReservationByIdResponse;
