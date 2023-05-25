import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/endpoints.dart';
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
}
