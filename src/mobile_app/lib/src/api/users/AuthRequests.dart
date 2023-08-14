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

class RegisterRequest extends DefaultRequest {
  String email;
  String password;
  String fullName;
  String code;
  String phoneNumber;
  RegisterRequest({
    required this.email,
    required this.password,
    required this.fullName,
    required this.code,
    required this.phoneNumber,
  });

  @override
  String toJson() {
    return jsonEncode({
      "email": email,
      "password": password,
      "fullName": fullName,
      "code": code,
      "phoneNumber": phoneNumber,
    });
  }
}
