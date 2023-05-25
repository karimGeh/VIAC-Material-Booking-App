import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';

class GetMyReservationsResponse extends DefaultResponse {
  bool? success;
  List<Reservation>? reservations;

  GetMyReservationsResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    reservations = json['reservations'].map<Reservation>((reservation) {
      return Reservation.fromJson(reservation);
    }).toList();
  }

  @override
  String toString() {
    return 'GetMyReservationsResponse{success: $success, reservations: $reservations}';
  }
}
