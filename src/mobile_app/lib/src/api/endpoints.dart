class API_ENDPOINTS {
  static String baseUrl = "http://10.222.152.158:5000/api/v1";

  //! - User
  static String user = "$baseUrl/user";
  //! |-> Auth
  static String auth = "$user/auth";
  static String login = "$auth/login";
  static String register = "$auth/register";
  static String logout = "$auth/logout";
  static String forgotPassword = "$auth/forgot-password";
  static String verifyResetPasswordPin = "$auth/verify-reset-password-pin";
  static String resetPassword = "$auth/reset-password";

  //! |-> Settings
  static String settings = "$baseUrl/settings";
  static String updateProfile = "$settings/update-profile";
  static String updatePassword = "$settings/update-password";

  //! reservation
  static String reservations = "$baseUrl/reservations";
  static String getMyReservations = "$reservations/";
  static String getReservation = "$reservations/get-reservation";
  static String createReservation = "$reservations/create-reservation";
  static String updateReservation = "$reservations/update-reservation";
}
