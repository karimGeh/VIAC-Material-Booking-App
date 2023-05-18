import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';

class PlatesScreen extends StatelessWidget {
  const PlatesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(title: Text('PlatesScreen')),
      body: Center(child: Text('PlatesScreen')),
    );
  }
}
