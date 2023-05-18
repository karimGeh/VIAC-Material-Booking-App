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
  String id;
  String code;
  String fullName;
  String email;
  String phoneNum;
  String type;
  String createdAt;
  String updatedAt;

  User({
    required this.id,
    required this.code,
    required this.fullName,
    required this.email,
    required this.phoneNum,
    required this.type,
    required this.createdAt,
    required this.updatedAt,
  });

  User.fromJson(Map<String, dynamic> json)
      : this(
          id: json['id'],
          code: json['code'],
          fullName: json['fullName'],
          email: json['email'],
          phoneNum: json['phoneNum'],
          type: json['type'],
          createdAt: json['createdAt'],
          updatedAt: json['updatedAt'],
        );

  // {
  //   id = json['id'];
  //   code = json['code'];
  //   fullName = json['fullName'];
  //   email = json['email'];
  //   phoneNum = json['phoneNum'];
  //   type = json['type'];
  //   createdAt = json['createdAt'];
  //   updatedAt = json['updatedAt'];
  // }

  Map<String, dynamic> toJson() => {
        'id': id,
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
    return 'User{id: $id, code: $code, fullName: $fullName, email: $email, phoneNum: $phoneNum, type: $type, createdAt: $createdAt, updatedAt: $updatedAt}';
  }
}
