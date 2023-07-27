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

  double getProgress() {
    DateTime now = DateTime.now();
    double progress = 0.0;
    if (now.isBefore(startDate)) {
      // give percentage of how much time is left until reservation starts
      progress = now.difference(createdAt).inMilliseconds /
          startDate.difference(createdAt).inMilliseconds;
    } else if (now.isAfter(endDate)) {
      progress = 1.0;
    } else {
      progress = now.difference(startDate).inMilliseconds /
          endDate.difference(startDate).inMilliseconds;
    }
    print(progress);
    // limit to 1 number after decimal point
    progress = double.parse(progress.toStringAsFixed(1));
    progress.clamp(0.0, 1.0);
    return progress;
  }

  String getProgressText() {
    // left: days (if > 0), hours (if > 0)
    // late: days (if > 0), hours (if > 0)

    DateTime now = DateTime.now();
    if (now.isBefore(startDate)) {
      // give percentage of how much time is left until reservation starts
      Duration difference = startDate.difference(now);
      if (difference.inDays > 0) {
        return '${difference.inDays} days left';
      } else if (difference.inHours > 0) {
        return '${difference.inHours} hours left';
      } else {
        return 'less than an hour left';
      }
    } else if (now.isAfter(endDate)) {
      Duration difference = now.difference(endDate);
      if (difference.inDays > 0) {
        return '${difference.inDays} days late';
      } else if (difference.inHours > 0) {
        return '${difference.inHours} hours late';
      } else {
        return 'less than an hour late';
      }
    } else {
      Duration difference = endDate.difference(now);
      if (difference.inDays > 0) {
        return '${difference.inDays} days left';
      } else if (difference.inHours > 0) {
        return '${difference.inHours} hours left';
      } else {
        return 'less than an hour left';
      }
    }
  }

  @override
  String toString() {
    return 'Reservation{_id: $_id, author: $author, material: $material, status: $status, startDate: $startDate, endDate: $endDate}';
  }
}
