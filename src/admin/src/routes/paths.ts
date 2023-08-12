class Paths {
  //! general
  static readonly home = "/";
  static readonly dashboard = "/dashboard";
  static readonly users = "/users";
  static readonly settings = "/settings";

  //! Auth
  static readonly auth = "/auth";
  static readonly auth_catch_all = `${this.auth}/*`;
  static readonly login = `${this.auth}/login`;
  static readonly register = `${this.auth}/register`;

  static readonly default = this.dashboard;
}

export default Paths;
