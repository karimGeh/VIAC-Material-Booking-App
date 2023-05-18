import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/User.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/router/routes.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  User? user;
  // get user from db
  // if user is not logged in, redirect to login screen
  // if user is logged in, show home screen
  void getUser() async {
    AuthProvider authProvider = AuthProvider();
    bool isLoggedIn = await authProvider.isLoggedIn();
    if (!isLoggedIn) {
      Navigator.pushNamedAndRemoveUntil(context, Routes.auth, (route) => false);
      return;
    }

    // get user
    String? token = await authProvider.getAuthToken();
    User? user = await authProvider.getUser();
    print(token);
    print(user?.toJson());
    setState(() {
      this.user = user;
    });
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      getUser();
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Text(user?.toJson().toString() ?? 'No user'),
      ),
    );
  }
}
