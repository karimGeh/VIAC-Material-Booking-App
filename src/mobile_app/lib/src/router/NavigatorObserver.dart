import 'package:flutter/material.dart';
import 'package:mobile_app/src/router/routes.dart';

class CustomRouteObserver extends RouteObserver {
  String currentRouteName = Routes.main_home;

  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPush(route, previousRoute);
    currentRouteName = route.settings.name ?? "";
    print("didPush: $currentRouteName");
  }

  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPop(route, previousRoute);
    currentRouteName = previousRoute?.settings.name ?? "";
    print("didPop: $currentRouteName");
  }

  @override
  void didReplace({Route<dynamic>? newRoute, Route<dynamic>? oldRoute}) {
    super.didReplace(newRoute: newRoute, oldRoute: oldRoute);
    currentRouteName = newRoute?.settings.name ?? "";
    print("didReplace: $currentRouteName");
  }

  @override
  void didRemove(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didRemove(route, previousRoute);
    if (previousRoute != null && previousRoute.settings.name != null) {
      currentRouteName = previousRoute.settings.name!;
    }

    print("didRemove: $currentRouteName");
  }

  @override
  void didStartUserGesture(
      Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didStartUserGesture(route, previousRoute);
    // currentRouteName = route.settings.name ?? "";
    print("didStartUserGesture: $currentRouteName");
  }

  @override
  void didStopUserGesture() {
    super.didStopUserGesture();
    print("didStopUserGesture: $currentRouteName");
  }
}

CustomRouteObserver MainRouteObserver = CustomRouteObserver();
