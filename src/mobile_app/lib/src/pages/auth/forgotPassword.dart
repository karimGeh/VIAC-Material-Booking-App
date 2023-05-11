// login screen

import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/inputs/PrimaryInput.dart';
import 'package:mobile_app/src/layouts/ScreenWithAppBar.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.auth_forgotPassword;

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  // form key
  // loading state
  bool _isLoading = false;

  // dispose controllers
  @override
  void dispose() {
    super.dispose();
  }

  // login function
  Future<void> _onSend() async {
    // validate form

    // send login request
    // await loginRequest();
    // navigate to home screen
    Navigator.pushNamed(context, Routes.auth_verifyResetPasswordPin);
  }

  void Function() navigateTo(String routeName) {
    // navigate to the given route
    return () => Navigator.pushNamed(context, routeName);
  }

  @override
  Widget build(BuildContext context) {
    return ScreenWithAppBar(
      title: "Forgot password",
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
                        "In case you forgot your password, please fill in your account identifier",
                        style: CustomTextStyles.p(
                          color: CustomColors.black.withOpacity(0.7),
                        ),
                      ),
                    ),
                  ),
                  PrimaryInput(
                    errorText: null,
                    labelText: "User ID",
                    onChanged: () {},
                    isRequired: true,
                  ),
                  const SizedBox(height: 16.0),
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
                    text: "Send verification code",
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
