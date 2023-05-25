// ignore_for_file: non_constant_identifier_names
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/CustomError.dart';
import 'package:mobile_app/src/api/helpers.dart';

class DefaultResponse {
  List<CustomError> errors = [];

  DefaultResponse.fromHttp(http.Response response) {
    if (isStatusCodeSuccess(response.statusCode)) {
      fromJson(JsonDecoder().convert(response.body));
    } else {
      (JsonDecoder().convert(response.body)["errors"] as List<dynamic>)
          .forEach((element) {
        errors.add(CustomError.fromJson(element));
      });
    }
  }
  fromJson(Map<String, dynamic> json) {
    throw UnimplementedError(); // provide an implementation in a subclass
  }
}

class DefaultRequest {
  String toJson() {
    throw UnimplementedError(); // provide an implementation in a subclass
  }
}

// api generator
class APIGenerator {
  static Future<http.Response>
      UnauthenticatedPostRequest<R extends DefaultRequest>(
          String url, R body) async {
    var uri = Uri.parse(url);
    var response = await http.post(
      uri,
      headers: {"Content-Type": "application/json"},
      body: body.toJson(),
    );
    return response;
  }

  static Future<http.Response> AuthenticatedGetRequest(
    String url,
    String token,
  ) async {
    var uri = Uri.parse(url);
    var response = await http.get(
      uri,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
    );
    return response;
  }

  static Future<http.Response> UnauthenticatedGetRequest(
    String url,
  ) async {
    var uri = Uri.parse(url);
    var response = await http.get(
      uri,
      headers: {
        "Content-Type": "application/json",
      },
    );
    return response;
  }
}
