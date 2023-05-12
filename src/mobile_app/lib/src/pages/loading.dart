// loading page class

// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/icons.dart';

class LoadingScreen extends StatelessWidget {
  const LoadingScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.loading;

  // load for 2 seconds and navigate to auth screen
  Future<void> load(BuildContext context) async {
    await Future<void>.delayed(const Duration(seconds: 2));
    Navigator.pushNamed(context, Routes.auth);
    Navigator.removeRoute(context, ModalRoute.of(context)!);
  }

  @override
  Widget build(BuildContext context) {
    load(context);
    return Scaffold(
      backgroundColor: CustomColors.dark1,
      body: Stack(
        children: [
          Positioned(
            bottom: 16.0,
            left: 0,
            right: 0,
            child: Flex(
              direction: Axis.vertical,
              mainAxisAlignment: MainAxisAlignment.center,

              children: [
                const Text(
                  'Powered by',
                  // style: CustomTextStyles.p(),
                ),
                SvgPicture.asset(
                  CustomIcons.stellantisLogo,
                ),
              ],
              // color: Colors.white,
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SvgPicture.asset(
                  CustomIcons.logo,
                  width: 100.0,
                  height: 100.0,
                ),
                const SizedBox(height: 16.0),
                const Text('Loading...')
              ],
            ),
          ),
        ],
      ),
    );
  }
}
