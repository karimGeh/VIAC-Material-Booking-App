// onGenerateRoute class
import 'package:flutter/material.dart';
import 'package:mobile_app/src/pages/auth/forgotPassword.dart';
import 'package:mobile_app/src/pages/auth/index.dart';
import 'package:mobile_app/src/pages/auth/login.dart';
import 'package:mobile_app/src/pages/auth/logout.dart';
import 'package:mobile_app/src/pages/auth/register.dart';
import 'package:mobile_app/src/pages/auth/resetPassword.dart';
import 'package:mobile_app/src/pages/auth/verifyResetPasswordPin.dart';
import 'package:mobile_app/src/pages/common/permissionsRequired.dart';
import 'package:mobile_app/src/pages/loading.dart';
import 'package:mobile_app/src/pages/main/fuelCard.dart';
import 'package:mobile_app/src/pages/main/home.dart';
import 'package:mobile_app/src/pages/main/plates.dart';
import 'package:mobile_app/src/pages/main/reserveAMaterial.dart';
import 'package:mobile_app/src/router/routes.dart';

PageRouteBuilder<dynamic> customMaterialPageRoute(
    Widget page, RouteSettings settings) {
  return PageRouteBuilder(
    pageBuilder: (_, __, ___) => page as Widget,
    settings: settings,
    transitionDuration: const Duration(milliseconds: 100),
    transitionsBuilder: (_, animation, __, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  );
}

Route<dynamic> onGenerateRoute(RouteSettings settings) {
  print(settings.name);
  switch (settings.name) {
    case Routes.loading:
      return customMaterialPageRoute(const LoadingScreen(), settings);

    //! Auth
    case Routes.auth:
      return customMaterialPageRoute(const AuthScreen(), settings);
    case Routes.auth_login:
      return customMaterialPageRoute(const LoginScreen(), settings);
    case Routes.auth_register:
      return customMaterialPageRoute(const RegisterScreen(), settings);
    case Routes.auth_forgotPassword:
      return customMaterialPageRoute(const ForgotPasswordScreen(), settings);
    case Routes.auth_verifyResetPasswordPin:
      return customMaterialPageRoute(
          const VerifyResetPasswordPinScreen(), settings);
    case Routes.auth_resetPassword:
      return customMaterialPageRoute(const ResetPassword(), settings);
    case Routes.auth_logout:
      return customMaterialPageRoute(const LogoutScreen(), settings);

    //! main
    case Routes.main_home:
      return customMaterialPageRoute(HomeScreen(), settings);
    case Routes.main_fuelCard:
      return customMaterialPageRoute(const FuelCardScreen(), settings);
    case Routes.main_plates:
      return customMaterialPageRoute(const PlatesScreen(), settings);
    case Routes.main_reserveAMaterial:
      return customMaterialPageRoute(const ReserveAMaterialScreen(), settings);

    //! common routes
    case Routes.common_requiredPermissions:
      return MaterialPageRoute(
          builder: (_) => const PermissionRequiredScreen());
    default:
      return customMaterialPageRoute(const LoadingScreen(), settings);
  }
}
