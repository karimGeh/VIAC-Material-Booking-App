// login screen

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/users/AuthClientAPI.dart';
import 'package:mobile_app/src/api/users/AuthRequests.dart';
import 'package:mobile_app/src/api/users/AuthResponses.dart';
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
  Map<String, dynamic> state = {
    "username": '',
    "code": '',
    "email": '',
    "password": '',
    "confirmPassword": '',
    "phoneNumber": '',
  };

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

  onChange(String key) {
    return (String value) {
      setState(() {
        state[key] = value;
      });
    };
  }

  validateForm() {
    bool valid = true;
    if (state["username"] == '') {
      valid = false;
    }
    if (state["code"] == '') {
      valid = false;
    }
    if (state["email"] == '') {
      valid = false;
    }
    if (state["password"] == '') {
      valid = false;
    }
    if (state["confirmPassword"] == '') {
      valid = false;
    }
    if (state["phoneNumber"] == '') {
      valid = false;
    }
    if (state["password"] != state["confirmPassword"]) {
      valid = false;
    }
    return valid;
  }

  // login function
  Future<void> _signUp(BuildContext context) async {
    // validate form

    if (_isLoading) {
      return;
    }

    if (validateForm() == false) {
      // show error
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Please fill all required fields"),
          backgroundColor: CustomColors.error,
        ),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    RegisterResponse response = await AuthClientAPI.register(
      RegisterRequest(
        email: state["email"],
        password: state["password"],
        fullName: state["username"],
        code: state["code"],
        phoneNumber: state["phoneNumber"],
      ),
    );

    setState(() {
      _isLoading = false;
    });

    if (response.errors.isNotEmpty) {
      // show error
      response.errors.forEach((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(error.message),
            backgroundColor: CustomColors.error,
          ),
        );
      });
      return;
    }
    Navigator.pushNamed(context, Routes.main_home);
    setState(() {
      _isLoading = false;
    });
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
                    onChanged: onChange("username"),
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "User ID",
                    onChanged: onChange("code"),
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Phone number",
                    onChanged: onChange("phoneNumber"),
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Email",
                    onChanged: onChange("email"),
                    isRequired: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Password",
                    onChanged: onChange("password"),
                    isRequired: true,
                    isPassword: true,
                  ),
                  const SizedBox(height: 24.0),
                  PrimaryInput(
                    errorText: null,
                    labelText: "Confirm password",
                    onChanged: onChange("confirmPassword"),
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
                    onPressed: () => _signUp(context),
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
