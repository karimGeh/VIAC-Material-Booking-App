import 'package:http/http.dart' as http;
import 'package:mobile_app/src/api/APIGenerator.dart';
import 'package:mobile_app/src/api/models/Material.dart';

class GetMaterialsResponse extends DefaultResponse {
  bool? success;
  List<Material>? materials;

  GetMaterialsResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    materials = json['materials'].map<Material>((material) {
      return Material.fromJson(material);
    }).toList();
  }

  @override
  String toString() {
    return 'GetMaterialsResponse{success: $success, materials: $materials}';
  }
}

class GetMaterialResponse extends DefaultResponse {
  bool? success;
  Material? material;

  GetMaterialResponse.fromHttp(http.Response response)
      : super.fromHttp(response);

  @override
  fromJson(Map<String, dynamic> json) {
    success = json['success'];
    material = Material.fromJson(json['material']);
  }

  @override
  String toString() {
    return 'GetMaterialResponse{success: $success, material: $material}';
  }
}
