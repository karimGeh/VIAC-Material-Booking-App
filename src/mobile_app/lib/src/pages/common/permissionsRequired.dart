import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonOutline.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class PermissionRequiredScreen extends StatelessWidget {
  const PermissionRequiredScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.common_requiredPermissions;

  void _onGivePermissions(BuildContext context) {
    // navigate to the given route
    Navigator.pushNamed(context, Routes.main_home);
  }

  void _onLogout(BuildContext context) {
    // navigate to the given route
    Navigator.pushNamed(context, Routes.auth_logout);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.dark1,
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Seems like you are not giving proper permissions to this app',
              style: CustomTextStyles.title(),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16.0),
            Text(
              'You can’t use this app just yet,',
              style: CustomTextStyles.p(
                  color: CustomColors.black.withOpacity(0.5)),
            ),
            const SizedBox(height: 16.0),
            Text(
              'Please give the app the following permissions:',
              style: CustomTextStyles.p(
                  color: CustomColors.black.withOpacity(0.5)),
            ),
            Text(
              'Bluetooth',
              style: CustomTextStyles.p(
                  color: CustomColors.black.withOpacity(0.5)),
            ),
            Text(
              'Location (permanently)',
              style: CustomTextStyles.p(
                  color: CustomColors.black.withOpacity(0.5)),
            ),
            Text(
              'Notification',
              style: CustomTextStyles.p(
                  color: CustomColors.black.withOpacity(0.5)),
            ),
            const SizedBox(height: 24.0),
            PrimaryButtonFill(
              text: "Give Permissions",
              onPressed: () => _onGivePermissions(context),
            ),
            const SizedBox(height: 16.0),
            PrimaryButtonOutline(
              text: "Logout",
              onPressed: (() => _onLogout(context)),
            )
          ],
        ),
      ),
    );
  }
}
