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
import 'package:mobile_app/src/router/routes.dart';

Route<dynamic> onGenerateRoute(RouteSettings settings) {
  print(settings.name);
  switch (settings.name) {
    case Routes.loading:
      return MaterialPageRoute(builder: (_) => const LoadingScreen());

    //! Auth
    case Routes.auth:
      return MaterialPageRoute(builder: (_) => const AuthScreen());
    case Routes.auth_login:
      return MaterialPageRoute(builder: (_) => const LoginScreen());
    case Routes.auth_register:
      return MaterialPageRoute(builder: (_) => const RegisterScreen());
    case Routes.auth_forgotPassword:
      return MaterialPageRoute(builder: (_) => const ForgotPasswordScreen());
    case Routes.auth_verifyResetPasswordPin:
      return MaterialPageRoute(
          builder: (_) => const VerifyResetPasswordPinScreen());
    case Routes.auth_resetPassword:
      return MaterialPageRoute(builder: (_) => const ResetPassword());
    case Routes.auth_logout:
      return MaterialPageRoute(builder: (_) => const LogoutScreen());

    //! common routes
    case Routes.common_requiredPermissions:
      return MaterialPageRoute(
          builder: (_) => const PermissionRequiredScreen());
    default:
      return MaterialPageRoute(builder: (_) => const LoadingScreen());
  }
}
