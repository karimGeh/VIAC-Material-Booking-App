import 'dart:convert';

import 'package:mobile_app/src/api/APIGenerator.dart';

class CreateReservationRequest extends DefaultRequest {
  int? startDate;
  int? endDate;
  CreateReservationRequest({
    this.startDate,
    this.endDate,
  });

  @override
  String toJson() {
    return jsonEncode({
      "startDate": startDate,
      "endDate": endDate,
    });
  }
}
