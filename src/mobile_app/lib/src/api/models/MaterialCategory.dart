class MaterialCategory {
  String _id;
  String name;

  MaterialCategory(
    this._id,
    this.name,
  );
  get id => _id;

  MaterialCategory.fromJson(Map<String, dynamic> json)
      : this(
          json['_id'],
          json['name'],
        );

  Map<String, dynamic> toJson() => {
        'id': _id,
        'name': name,
      };

  @override
  String toString() {
    return 'MaterialCategory{id: $_id, name: $name}';
  }
}
