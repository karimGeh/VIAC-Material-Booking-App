import 'package:flutter/material.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';

class LogoutScreen extends StatelessWidget {
  const LogoutScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.auth_logout;

  void logout(BuildContext context) async {
    // await AuthRequests.logout();
    await Future<void>.delayed(const Duration(seconds: 2));
    await AuthProvider().onLogout();
    Navigator.pushNamedAndRemoveUntil(context, Routes.auth, (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    logout(context);
    return const Scaffold(
      backgroundColor: CustomColors.dark1,
      // loader while logging out
      body: Center(
        child: CircularProgressIndicator(
          color: CustomColors.blue3,
        ),
      ),
    );
  }
}
