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

class CreateReservationResponse extends DefaultResponse {
  bool? success;
  Reservation? reservation;

  CreateReservationResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    reservation = Reservation.fromJson(json['reservation']);
  }

  @override
  String toString() {
    return 'CreateReservationResponse{success: $success, reservation: $reservation}';
  }
}

class GetReservationsByMaterialIdResponse extends DefaultResponse {
  bool? success;
  List<Reservation>? reservations;

  GetReservationsByMaterialIdResponse.fromHttp(http.Response response)
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
    return 'GetReservationsByMaterialIdResponse{success: $success, reservations: $reservations}';
  }
}

class PickupMaterialResponse extends DefaultResponse {
  bool? success;
  Reservation? reservation;

  PickupMaterialResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    reservation = Reservation.fromJson(json['reservation']);
  }

  @override
  String toString() {
    return 'PickupReservationResponse{success: $success, reservation: $reservation}';
  }
}

class CancelReservationResponse extends DefaultResponse {
  bool? success;
  Reservation? reservation;

  CancelReservationResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    reservation = Reservation.fromJson(json['reservation']);
  }

  @override
  String toString() {
    return 'CancelReservationResponse{success: $success, reservation: $reservation}';
  }
}

class ReturnMaterialResponse extends DefaultResponse {
  bool? success;
  Reservation? reservation;

  ReturnMaterialResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    reservation = Reservation.fromJson(json['reservation']);
  }

  @override
  String toString() {
    return 'ReturnReservationResponse{success: $success, reservation: $reservation}';
  }
}
