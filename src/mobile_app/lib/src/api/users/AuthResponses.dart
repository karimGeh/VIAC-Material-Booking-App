import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/models/User.dart';

class LoginResponse extends DefaultResponse {
  bool? success;
  String? auth_token;
  User? user;

  LoginResponse.fromHttp(http.Response response) : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    auth_token = json['auth_token'];
    user = User.fromJson(json['user']);
  }

  @override
  String toString() {
    return 'LoginResponse{success: $success, auth_token: $auth_token, user: $user}';
  }
}
