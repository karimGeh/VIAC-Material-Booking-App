// login screen

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/users/AuthClientAPI.dart';
import 'package:mobile_app/src/api/users/AuthRequests.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/inputs/PrimaryInput.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/layouts/ScreenWithAppBar.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  static const String routeName = Routes.auth_login;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  Map<String, dynamic> state = {
    "email": '',
    "password": '',
  };

  Map<String, dynamic> errors = {
    "email": '',
    "password": '',
    'global': '',
  };

  // loading state
  bool _isLoading = false;

  onChange(String key) {
    return (String value) {
      setState(() {
        state[key] = value;
        errors[key] = '';
      });
    };
  }

  isStateValid() {
    bool valid = true;
    if (state["email"] == '') {
      setState(() {
        errors["email"] = "Email is required";
      });
      valid = false;
    }
    if (state["password"] == '') {
      setState(() {
        errors["password"] = "Password is required";
      });
      valid = false;
    }
    return valid;
  }

  // dispose controllers
  @override
  void dispose() {
    super.dispose();
  }

  // login function
  Future<void> _login() async {
    // validate form
    if (!isStateValid() || _isLoading) {
      return;
    }
    setState(() {
      _isLoading = true;
    });

    final response = await AuthClientAPI.login(LoginRequest(
      email: state["email"],
      password: state["password"],
    ));

    setState(() {
      _isLoading = false;
    });

    if (response.errors.isNotEmpty) {
      setState(() {
        response.errors.forEach((error) {
          String field = error.field ??
              'global'; // use the null-aware operator to provide a fallback value
          if (!['email', 'password'].contains(field)) {
            field = 'global';
          }
          errors[field] = error.message;
        });
      });
      return;
    }

    AuthProvider authProvider = AuthProvider();
    bool success = await authProvider.onLogin(response);

    print(response.auth_token);
    print(response.user);
    // save token to local storage

    // navigate to home screen
    // Navigator.pushNamed(context, Routes.main_home);
    if (!success) {
      setState(() {
        errors['global'] =
            'Something went wrong, please try to close the app and open it again!';
      });
      return;
    }

    Navigator.pushNamedAndRemoveUntil(
        context, Routes.main_home, (route) => false);
  }

  void Function() navigateTo(String routeName) {
    // navigate to the given route
    return () => Navigator.pushNamed(context, routeName);
  }

  @override
  Widget build(BuildContext context) {
    return ScreenWithAppBar(
      title: "Login",
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
                    child: Text(
                      "To login you don't need to write your full email, only your'e user id is fine (ex: SD12345)",
                      style: CustomTextStyles.p(
                        color: CustomColors.black.withOpacity(0.7),
                      ),
                    ),
                  ),
                  errors['global'] == ''
                      ? Container()
                      : Text(
                          errors['global'],
                          style: CustomTextStyles.p(
                            color: CustomColors.error,
                          ),
                        ),
                  errors['global'] == ''
                      ? Container()
                      : const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: errors["email"],
                    labelText: "User ID",
                    onChanged: onChange("email"),
                    isRequired: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "Please enter your user id";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: errors["password"],
                    labelText: "Password",
                    onChanged: onChange("password"),
                    isRequired: true,
                    isPassword: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "Please enter your password";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: "Forgot your password? ",
                            style: CustomTextStyles.p(
                              color: CustomColors.black.withOpacity(0.7),
                            ),
                          ),
                          TextSpan(
                            text: "Reset here",
                            style: CustomTextStyles.p(
                              color: CustomColors.blue1,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = navigateTo(Routes.auth_forgotPassword),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: "Don't have an account? ",
                            style: CustomTextStyles.p(
                              color: CustomColors.black.withOpacity(0.7),
                            ),
                          ),
                          TextSpan(
                            text: "Sign up here",
                            style: CustomTextStyles.p(
                              color: CustomColors.blue1,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = navigateTo(Routes.auth_register),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24.0),
                ],
              ),
            ),
          ),
          // SliverPadding(
          //     padding: const EdgeInsets.only(
          //       top: 16.0,
          //       bottom: 32.0,
          //       left: 16.0,
          //       right: 16.0,
          //     ),
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
                    text: "Login",
                    onPressed: _login,
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
