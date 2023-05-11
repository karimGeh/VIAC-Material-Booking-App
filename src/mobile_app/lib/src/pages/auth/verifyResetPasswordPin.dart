// login screen

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/inputs/PrimaryInput.dart';
import 'package:mobile_app/src/layouts/ScreenWithAppBar.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class VerifyResetPasswordPinScreen extends StatefulWidget {
  const VerifyResetPasswordPinScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.auth_forgotPassword;

  @override
  State<VerifyResetPasswordPinScreen> createState() =>
      VerifyResetPasswordPinScreenState();
}

class VerifyResetPasswordPinScreenState
    extends State<VerifyResetPasswordPinScreen> {
  // form key
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  // email controller
  final TextEditingController _emailController = TextEditingController();
  // password controller
  final TextEditingController _passwordController = TextEditingController();
  // loading state
  bool _isLoading = false;
  String email = "example@external.stellantis.com";

  // dispose controllers
  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  // login function
  Future<void> _onSend() async {
    // validate form

    // send login request
    // await loginRequest();
    // navigate to home screen
    Navigator.pushNamed(context, Routes.auth_resetPassword);
  }

  void Function() navigateTo(String routeName) {
    // navigate to the given route
    return () => Navigator.pushNamed(context, routeName);
  }

  @override
  Widget build(BuildContext context) {
    return ScreenWithAppBar(
      title: "Pin Verification",
      child: CustomScrollView(
        scrollDirection: Axis.vertical,
        slivers: [
          SliverToBoxAdapter(
            // hasScrollBody: false,
            child: Padding(
              padding: const EdgeInsets.only(
                left: 24.0,
                right: 24.0,
              ),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 40.0, bottom: 40.0),
                    child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          "We've sent a verification code to this email: ",
                          style: CustomTextStyles.p(
                              color: CustomColors.black.withOpacity(0.7)),
                          textAlign: TextAlign.left,
                        )),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
                    child: Align(
                      alignment: Alignment.center,
                      child: Text(
                        email,
                        style: CustomTextStyles.p(
                            color: CustomColors.black,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 16.0, bottom: 40.0),
                    child: Text(
                      "Please check your inbox and spam folder for the verification code. The code is only valid for 10 minutes",
                      style: CustomTextStyles.p(
                          color: CustomColors.black.withOpacity(0.7)),
                    ),
                  ),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Verification code",
                    onChanged: () {},
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                ],
              ),
            ),
          ),
          SliverFillRemaining(
            hasScrollBody: false,
            // sliver: SliverToBoxAdapter(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Padding(
                  padding: const EdgeInsets.only(
                    left: 24.0,
                    right: 24.0,
                    bottom: 24.0,
                  ),
                  child: PrimaryButtonFill(
                    text: "Reset Password",
                    onPressed: _onSend,
                  ),
                ),
              ],
            ),
            // ),
          ),
        ],
      ),
    );

    // return const Text('Login');
  }
}
