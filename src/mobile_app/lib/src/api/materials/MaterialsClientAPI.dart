import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/endpoints.dart';
import 'package:mobile_app/src/api/materials/MaterialsResponses.dart';

class MaterialsClientAPI {
  static Future<GetMaterialsResponse> getMaterials(
    String token,
  ) async {
    final response = await APIGenerator.UnauthenticatedGetRequest(
      API_ENDPOINTS.getMaterials,
    );
    return GetMaterialsResponse.fromHttp(response);
  }

  static Future<GetMaterialResponse> getMaterial(
    String token,
    String id,
  ) async {
    final response = await APIGenerator.UnauthenticatedGetRequest(
      API_ENDPOINTS.getMaterial(id),
    );
    return GetMaterialResponse.fromHttp(response);
  }
}
