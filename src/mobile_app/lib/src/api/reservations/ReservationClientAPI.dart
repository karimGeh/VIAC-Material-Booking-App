import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/endpoints.dart';
import 'package:mobile_app/src/api/reservations/ReservationRequests.dart';
import 'package:mobile_app/src/api/reservations/ReservationResponses.dart';

class ReservationClientAPI {
  static Future<GetMyReservationsResponse> getMyReservations(
    String token,
  ) async {
    final response = await APIGenerator.AuthenticatedGetRequest(
      API_ENDPOINTS.getMyReservations,
      token,
    );
    return GetMyReservationsResponse.fromHttp(response);
  }

  static Future<CreateReservationResponse> createReservation(
    String token,
    String materialId,
    CreateReservationRequest request,
  ) async {
    final response =
        await APIGenerator.AuthenticatedPostRequest<CreateReservationRequest>(
      API_ENDPOINTS.createReservation(materialId),
      token,
      request,
    );
    return CreateReservationResponse.fromHttp(response);
  }

  static Future<GetReservationsByMaterialIdResponse>
      getReservationsByMaterialId(
    String token,
    String materialId,
  ) async {
    final response = await APIGenerator.AuthenticatedGetRequest(
      API_ENDPOINTS.getReservationsByMaterialId(materialId),
      token,
    );
    return GetReservationsByMaterialIdResponse.fromHttp(response);
  }

  static Future<PickupMaterialResponse> pickupMaterial(
    String token,
    String reservationId,
  ) async {
    final response = await APIGenerator.AuthenticatedPostRequest(
      API_ENDPOINTS.pickupMaterial(reservationId),
      token,
      DefaultRequest(),
    );
    return PickupMaterialResponse.fromHttp(response);
  }

  static Future<CancelReservationResponse> cancelReservation(
    String token,
    String reservationId,
  ) async {
    final response = await APIGenerator.AuthenticatedPostRequest(
      API_ENDPOINTS.cancelReservation(reservationId),
      token,
      DefaultRequest(),
    );
    return CancelReservationResponse.fromHttp(response);
  }

  static Future<ReturnMaterialResponse> returnMaterial(
    String token,
    String reservationId,
  ) async {
    final response = await APIGenerator.AuthenticatedPostRequest(
      API_ENDPOINTS.returnMaterial(reservationId),
      token,
      DefaultRequest(),
    );
    return ReturnMaterialResponse.fromHttp(response);
  }
}
