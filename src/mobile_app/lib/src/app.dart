import 'package:flutter/material.dart';
import 'package:mobile_app/src/router/NavigatorObserver.dart';
import 'package:mobile_app/src/router/OnGenerateRoute.dart';
import 'package:mobile_app/src/router/routes.dart';

class App extends StatelessWidget {
  App({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material booking app',
      initialRoute: Routes.initialRoute,
      onGenerateRoute: onGenerateRoute,
      navigatorObservers: [
        MainRouteObserver,
      ],
    );
  }
}
