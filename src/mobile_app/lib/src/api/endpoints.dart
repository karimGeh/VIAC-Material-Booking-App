class API_ENDPOINTS {
  static String baseUrl = "http://192.168.1.101:5000/api/v1";

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

  static String Function(String) createReservation =
      (String id) => "$reservations/create-reservation/$id";
  static String Function(String) pickupMaterial =
      (String id) => "$reservations/pickup-material/$id";
  static String Function(String) cancelReservation =
      (String id) => "$reservations/cancel-reservation/$id";
  static String Function(String) returnMaterial =
      (String id) => "$reservations/return-material/$id";

  static String Function(String) getReservationsByMaterialId =
      (String id) => "$reservations/materials/$id";
  static String updateReservation = "$reservations/update-reservation";

  //! materials
  static String materials = "$baseUrl/materials";
  static String getMaterials = "$materials/";
  static String Function(String) getMaterial = (String id) => "$materials/$id";
}
