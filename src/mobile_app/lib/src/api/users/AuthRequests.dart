import 'dart:convert';

import 'package:mobile_app/src/api/APIGenerator.dart';

class LoginRequest extends DefaultRequest {
  String? email;
  String? password;
  LoginRequest({
    this.email,
    this.password,
  });

  @override
  String toJson() {
    return jsonEncode({
      "email": email,
      "password": password,
    });
  }
}
