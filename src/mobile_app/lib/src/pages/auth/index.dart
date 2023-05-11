// first screen of the auth screens with two buttons one for login and the other for register

import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonOutline.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.auth;

  @override
  Widget build(BuildContext context) {
    // navigate to the given route
    void Function() navigateTo(String routeName) {
      return () => Navigator.pushNamed(context, routeName);
    }

    // final double heightStatusBar = MediaQuery.of(context).viewPadding.top;

    return Scaffold(
      backgroundColor: CustomColors.dark1,
      body: Padding(
          padding: const EdgeInsets.only(
            left: 40.0,
            right: 40.0,
            top: 16.0,
            bottom: 16.0,
          ),
          // vertical column
          child: Flex(
            // mainAxisAlignment: MainAxisAlignment.center,
            direction: Axis.vertical,
            children: <Widget>[
              // Padding(
              //   padding: EdgeInsets.only(top: heightStatusBar + 16),
              //   child: SvgPicture.asset(
              //     CustomIcons.stellantisLogo,
              //   ),
              // ),
              // text
              Expanded(
                flex: 1,
                // direction: Axis.vertical,
                child: Flex(
                  direction: Axis.vertical,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(bottom: 32.0),
                      child: Text(
                        'Welcome',
                        style: CustomTextStyles.h1(
                          color: CustomColors.blue1,
                        ),
                      ),
                    ),
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text:
                                'This is a reservation app that could only be used by the ',
                            style: CustomTextStyles.p(
                              textAlign: TextAlign.center,
                            ),
                          ),
                          TextSpan(
                            text: 'VIAC',
                            style:
                                CustomTextStyles.p(fontWeight: FontWeight.bold),
                          ),
                          TextSpan(
                            text: ' validation team working at ',
                            style: CustomTextStyles.p(
                              color: CustomColors.black,
                            ),
                          ),
                          TextSpan(
                            text: 'Stellantis / CETIEV 2.0',
                            style:
                                CustomTextStyles.p(fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              // buttons
              Column(children: [
                // login button
                Padding(
                  padding: const EdgeInsets.only(bottom: 16.0),
                  child: PrimaryButtonFill(
                    text: 'Login',
                    onPressed: navigateTo(Routes.auth_login),
                  ),
                ),
                // register button
                PrimaryButtonOutline(
                  text: 'Register',
                  onPressed: navigateTo(Routes.auth_register),
                ),
              ])
            ],
          )),
    );
  }
}
