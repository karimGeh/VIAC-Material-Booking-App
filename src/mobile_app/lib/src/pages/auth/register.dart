// login screen

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/inputs/PrimaryInput.dart';
import 'package:mobile_app/src/layouts/ScreenWithAppBar.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.auth_register;

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
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
  Future<void> _signUp() async {
    // validate form
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });
      // send login request
      // await loginRequest();
      // navigate to home screen
      Navigator.pushNamed(context, Routes.main_home);
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
      title: "Register",
      child: CustomScrollView(
        // direction: Axis.vertical,
        // mainAxisAlignment: MainAxisAlignment.s,
        scrollDirection: Axis.vertical,
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.only(
                left: 24.0,
                right: 24.0,
              ),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 40.0, bottom: 40.0),
                    child: Text(
                      "This is is not a typical registration process. You won't have access to your account until it is approved by the admin.",
                      style: CustomTextStyles.p(
                        color: CustomColors.black.withOpacity(0.7),
                      ),
                    ),
                  ),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Username",
                    onChanged: () {},
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "User ID",
                    onChanged: () {},
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Phone number",
                    onChanged: () {},
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Email",
                    onChanged: () {},
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Password",
                    onChanged: () {},
                    isRequired: true,
                    isPassword: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Confirm password",
                    onChanged: () {},
                    isRequired: true,
                    isPassword: true,
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: "Already have an account?",
                            style: CustomTextStyles.p(
                              color: CustomColors.black.withOpacity(0.7),
                            ),
                          ),
                          TextSpan(
                            text: "login",
                            style: CustomTextStyles.p(
                              color: CustomColors.blue1,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = navigateTo(Routes.auth_login),
                          ),
                        ],
                      ),
                    ),
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
                    text: "Sign up",
                    onPressed: _signUp,
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
