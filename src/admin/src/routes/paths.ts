class Paths {
  //! general
  static readonly home = "/";
  static readonly dashboard = "/dashboard";
  static readonly settings = "/settings";

  // ! Users
  static readonly users = "/users";
  static readonly users_edit = "/users/:userId";
  static readonly users_catch_all = `${this.users}/*`;

  // ! material categories
  static readonly materialCategory = "/material-categories";
  static readonly materialCategory_add = `${this.materialCategory}/add`;
  static readonly materialCategory_edit = `${this.materialCategory}/:materialCategoryId`;
  static readonly get_materialCategory_edit = (materialCategoryId: string) =>
    `${this.materialCategory}/${materialCategoryId}`;
  static readonly materialCategory_catch_all = `${this.materialCategory}/*`;

  // ! materials
  static readonly materials = "/materials";
  static readonly materials_add = `${this.materials}/add`;
  static readonly materials_edit = `${this.materials}/:materialId`;
  static readonly get_materials_edit = (materialId: string) =>
    `${this.materials}/${materialId}`;
  static readonly materials_catch_all = `${this.materials}/*`;

  // ! reservations
  static readonly reservations = "/reservations";
  static readonly reservations_edit = `${this.reservations}/:reservationId`;
  static readonly get_reservations_edit = (reservationId: string) =>
    `${this.reservations}/${reservationId}`;
  static readonly reservations_catch_all = `${this.reservations}/*`;

  //! Auth
  static readonly auth = "/auth";
  static readonly auth_catch_all = `${this.auth}/*`;
  static readonly login = `${this.auth}/login`;
  static readonly register = `${this.auth}/register`;

  static readonly default = this.dashboard;
}

export default Paths;
