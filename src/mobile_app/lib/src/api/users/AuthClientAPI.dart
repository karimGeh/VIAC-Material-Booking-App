import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/endpoints.dart';
import 'package:mobile_app/src/api/models/User.dart';
import 'package:mobile_app/src/api/users/AuthRequests.dart';
import 'package:mobile_app/src/api/users/AuthResponses.dart';

class AuthClientAPI {
  static Future<LoginResponse> login(LoginRequest request) async {
    final response =
        await APIGenerator.UnauthenticatedPostRequest<LoginRequest>(
      API_ENDPOINTS.login,
      request,
    );
    return LoginResponse.fromHttp(response);
  }
}
