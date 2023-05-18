import 'package:flutter/material.dart';
import 'package:mobile_app/src/router/NavigatorObserver.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class NavDrawer extends StatefulWidget {
  const NavDrawer({Key? key}) : super(key: key);

  @override
  State<NavDrawer> createState() => _NavDrawerState();
}

class _NavDrawerState extends State<NavDrawer> {
  // void didChangeDependencies() {
  //   super.didChangeDependencies();
  //   MainRouteObserver.subscribe(this, ModalRoute.of(context)!);
  // }

  // void dispose() {
  //   MainRouteObserver.unsubscribe(this);
  //   super.dispose();
  // }

  void navigateTo(BuildContext context, String routeName) {
    Navigator.pop(context);

    Future.delayed(
      const Duration(milliseconds: 200),
      () {
        Navigator.pushNamed(
          context,
          routeName,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: CustomColors.dark1,
      child: Padding(
        padding: const EdgeInsets.only(top: 24),
        child: Flex(
          direction: Axis.vertical,
          children: [
            // home
            Expanded(child: Container()),
            CustomListTile(
              title: "Home",
              routeName: Routes.main_home,
              icon: Icons.home,
              navigateTo: navigateTo,
            ),
            CustomListTile(
              title: "Reserve a material",
              routeName: Routes.main_reserveAMaterial,
              icon: Icons.add_circle,
              navigateTo: navigateTo,
            ),
            CustomListTile(
              title: "Fuel Card",
              routeName: Routes.main_fuelCard,
              icon: Icons.credit_card,
              navigateTo: navigateTo,
            ),
            CustomListTile(
              title: "Plates",
              routeName: Routes.main_plates,
              icon: Icons.directions_car,
              navigateTo: navigateTo,
            ),
            CustomListTile(
              title: "Settings",
              routeName: Routes.account_settings,
              icon: Icons.settings,
              navigateTo: navigateTo,
            ),
            Expanded(child: Container()),
            CustomListTile(
                title: "Logout",
                routeName: Routes.auth_logout,
                icon: Icons.logout,
                navigateTo: navigateTo,
                titleStyle: CustomTextStyles.p()),
          ],
        ),
      ),
    );
  }
}

class CustomListTile extends StatelessWidget {
  final String title;
  final String routeName;
  final IconData icon;
  final Function navigateTo;
  final TextStyle? titleStyle;

  const CustomListTile({
    Key? key,
    required this.title,
    required this.routeName,
    required this.icon,
    required this.navigateTo,
    this.titleStyle,
  }) : super(key: key);

  bool isCurrentRoute() {
    return MainRouteObserver.currentRouteName == routeName;
  }

  Text titleWidget(String text) {
    return Text(
      text,
      style: titleStyle ??
          CustomTextStyles.title(
            fontWeight: isCurrentRoute() ? FontWeight.bold : FontWeight.normal,
            color: isCurrentRoute()
                ? CustomColors.blue1
                : CustomColors.dark2.withOpacity(0.7),
          ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
        leading: Icon(
          icon,
          color: isCurrentRoute() ? CustomColors.blue1 : null,
          size: isCurrentRoute() ? 30 : null,
        ),
        title: titleWidget(title),
        onTap: () {
          navigateTo(context, routeName);
        });
  }
}
