import 'package:mobile_app/src/api/models/Material.dart';
import 'package:mobile_app/src/api/models/User.dart';

class Reservation {
  String _id;
  User author;
  User owner;
  Material material;
  String status;
  DateTime startDate;
  DateTime endDate;
  DateTime createdAt;
  DateTime updatedAt;
  DateTime? returnedAt;
  DateTime? cancelledAt;

  Reservation(
    this._id,
    this.author,
    this.owner,
    this.material,
    this.status,
    this.startDate,
    this.endDate,
    this.createdAt,
    this.updatedAt,
    this.returnedAt,
    this.cancelledAt,
  );

  Reservation.fromJson(Map<String, dynamic> json)
      : this(
          json['_id'],
          User.fromJson(json['author']),
          User.fromJson(json['owner']),
          Material.fromJson(json['material']),
          json['status'],
          DateTime.parse(json['startDate']),
          DateTime.parse(json['endDate']),
          DateTime.parse(json['createdAt']),
          DateTime.parse(json['updatedAt']),
          json['returnedAt'] == null
              ? null
              : DateTime.parse(json['returnedAt']),
          json['cancelledAt'] == null
              ? null
              : DateTime.parse(json['cancelledAt']),
        );

  get id => _id;

  Map<String, dynamic> toJson() => {
        '_id': _id,
        'author': author,
        'owner': owner,
        'material': material,
        'status': status,
        'startDate': startDate,
        'endDate': endDate,
        'createdAt': createdAt,
        'updatedAt': updatedAt,
        'returnedAt': returnedAt,
        'cancelledAt': cancelledAt,
      };

  @override
  String toString() {
    return 'Reservation{_id: $_id, author: $author, material: $material, status: $status, startDate: $startDate, endDate: $endDate}';
  }
}
