import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(title: Text('SettingsScreen')),
      body: Center(child: Text('SettingsScreen')),
    );
  }
}
