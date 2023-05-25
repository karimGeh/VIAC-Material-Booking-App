import 'package:mobile_app/src/api/models/MaterialCategory.dart';

class Material {
  String _id;
  MaterialCategory type;
  String ref;
  String state;
  String barcode;

  Material(
    this._id,
    this.type,
    this.ref,
    this.state,
    this.barcode,
  );
  get id => _id;

  Material.fromJson(Map<String, dynamic> json)
      : this(
          json['_id'],
          MaterialCategory.fromJson(json['type']),
          json['ref'],
          json['state'],
          json['barcode'],
        );

  Map<String, dynamic> toJson() => {
        '_id': _id,
        'type': type,
        'ref': ref,
        'state': state,
        'barcode': barcode,
      };

  @override
  String toString() {
    return 'Material{_id: $_id, type: $type, ref: $ref, state: $state}';
  }
}
