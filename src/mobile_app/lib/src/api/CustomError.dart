class CustomError {
  String message;
  String? code;
  String? field;
  CustomError(
    this.message, {
    this.code,
    this.field,
  });

  CustomError.fromJson(Map<String, dynamic> json)
      : message = json['message'],
        code = json['code'],
        field = json['field'];

  Map<String, dynamic> toJson() => {
        'message': message,
        'code': code,
        'field': field,
      };

  @override
  String toString() {
    return 'CustomError{message: $message, code: $code, field: $field}';
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CustomError &&
          runtimeType == other.runtimeType &&
          message == other.message &&
          code == other.code &&
          field == other.field;
}
