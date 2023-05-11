// login screen

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/inputs/PrimaryInput.dart';
import 'package:mobile_app/src/layouts/ScreenWithAppBar.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({Key? key}) : super(key: key);

  static const String routeName = Routes.auth_login;

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  // form key
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  // email controller
  final TextEditingController _emailController = TextEditingController();
  // password controller
  final TextEditingController _passwordController = TextEditingController();
  // loading state
  bool _isLoading = false;

  // dispose controllers
  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  // login function
  Future<void> _onResetPassword() async {
    // validate form
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });
      // send login request
      // await loginRequest();
      // navigate to home screen
      Navigator.pushNamed(context, Routes.auth_login);
      setState(() {
        _isLoading = false;
      });
    }
  }

  void Function() navigateTo(String routeName) {
    // navigate to the given route
    return () => Navigator.pushNamed(context, routeName);
  }

  @override
  Widget build(BuildContext context) {
    return ScreenWithAppBar(
      title: "Reset password",
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
                        "Please fill in your new password below.",
                        style: CustomTextStyles.p(
                          color: CustomColors.black.withOpacity(0.7),
                        ),
                      ),
                    ),
                  ),
                  PrimaryInput(
                    errorText: null,
                    labelText: "New Password",
                    onChanged: () {},
                    isRequired: true,
                    isPassword: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Confirm new password",
                    onChanged: () {},
                    isRequired: true,
                    isPassword: true,
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
                    text: "Update Password",
                    onPressed: _onResetPassword,
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
