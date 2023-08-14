// declare User type

class UserTypes {
  static String superAdmin = "superAdmin";
  static String admin = "admin";
  static String normal = "normal";
  static String guest = "guest";
  static String pending = "pending";
  static String blocked = "blocked";
}

class User {
  String _id;
  String code;
  String fullName;
  String email;
  String? phoneNum;
  String type;
  String createdAt;
  String updatedAt;

  User(
    this._id,
    this.code,
    this.fullName,
    this.email,
    this.phoneNum,
    this.type,
    this.createdAt,
    this.updatedAt,
  );

  static fromJson(Map<String, dynamic> json) {
    return User(
      json['_id'],
      json['code'],
      json['fullName'],
      json['email'],
      json['phoneNum'] ?? '',
      json['type'],
      json['createdAt'],
      json['updatedAt'],
    );
  }

  get id => _id;

  Map<String, dynamic> toJson() => {
        '_id': _id,
        'code': code,
        'fullName': fullName,
        'email': email,
        'phoneNum': phoneNum,
        'type': type,
        'createdAt': createdAt,
        'updatedAt': updatedAt,
      };

  @override
  String toString() {
    return 'User{_id: $_id, code: $code, fullName: $fullName, email: $email, phoneNum: $phoneNum, type: $type, createdAt: $createdAt, updatedAt: $updatedAt}';
  }
}
