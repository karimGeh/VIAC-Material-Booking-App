import 'package:mobile_app/src/api/models/MaterialCategory.dart';

class Material {
  String _id;
  MaterialCategory type;
  String ref;
  String state;
  String barcode;
  List<String> compatibleWith;

  Material(
    this._id,
    this.type,
    this.ref,
    this.state,
    this.barcode,
    this.compatibleWith,
  );
  get id => _id;

  Material.fromJson(Map<String, dynamic> json)
      : this(
          json['_id'],
          MaterialCategory.fromJson(json['type']),
          json['ref'],
          json['state'],
          json['barcode'],
          json['compatibleWith'].cast<String>(),
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

class MaterialStates {
  static const String available = "available";
  static const String inUse = "inUse";
  static const String broken = "broken";
  static const String lost = "lost";
  static const String disabled = "disabled";
}
