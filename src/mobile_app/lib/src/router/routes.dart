// ignore_for_file: constant_identifier_names

class Routes {
  //! Auth
  static const String auth = '/auth';
  static const String auth_login = '$auth/login';
  static const String auth_register = '$auth/register';
  static const String auth_forgotPassword = '$auth/forgotPassword';
  static const String auth_verifyResetPasswordPin =
      '$auth/verifyResetPasswordPin';
  static const String auth_resetPassword = '$auth/resetPassword';
  static const String auth_logout = '$auth/logout';

  //! common
  static const String common_requiredPermissions =
      '/common/requiredPermissions';

  //! main
  static const String main_home = '/main/home';
  static const String main_reserveAMaterial = '/main/bookAMaterial';
  static const String main_fuelCard = '/main/fuelCard';
  static const String main_plates = '/main/plates';

  //! Account
  static const String account_profile = '/account/profile';
  static const String account_settings = '/account/settings';
  static const String account_notifications = '/account/notifications';
  static const String account_help = '/account/help';

  //? ADMIN
  //! main admin
  static const String main_admin_dashboard = '/main/admin/dashboard';
  static const String main_admin_users = '/main/admin/users'; //? list users
  static const String main_admin_fuelCards =
      '/main/admin/fuelCards'; //? list fuel cards
  static const String main_admin_plates = '/main/admin/plates'; //? list plates
  static const String main_admin_materials =
      '/main/admin/materials'; //? list materials

  //! main admin users
  static const String main_admin_users_add = '/main/admin/users/add';
  static const String main_admin_users_edit = '/main/admin/users/edit';
  static const String main_admin_users_view = '/main/admin/users/view';

  //! main admin materials
  static const String main_admin_materials_add = '/main/admin/materials/add';
  static const String main_admin_materials_edit = '/main/admin/materials/edit';
  static const String main_admin_materials_view = '/main/admin/materials/view';

  //! main admin fuel cards
  static const String main_admin_fuelCards_add = '/main/admin/fuelCards/add';
  static const String main_admin_fuelCards_edit = '/main/admin/fuelCards/edit';
  static const String main_admin_fuelCards_view = '/main/admin/fuelCards/view';

  //! main admin plates
  static const String main_admin_plates_add = '/main/admin/plates/add';
  static const String main_admin_plates_edit = '/main/admin/plates/edit';
  static const String main_admin_plates_view = '/main/admin/plates/view';

  //! Other
  static const String loading = '/loading';
  static const String notFound = '/notFound';

  static const String initialRoute = loading;
}
