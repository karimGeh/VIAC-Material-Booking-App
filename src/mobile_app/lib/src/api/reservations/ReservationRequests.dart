import 'dart:convert';

import 'package:mobile_app/src/api/APIGenerator.dart';

class CreateReservationRequest extends DefaultRequest {
  DateTime startDate;
  DateTime endDate;
  CreateReservationRequest({
    required this.startDate,
    required this.endDate,
  });

  @override
  String toJson() {
    return jsonEncode({
      "startDate": startDate.millisecondsSinceEpoch,
      "endDate": endDate.millisecondsSinceEpoch,
    });
  }
}
