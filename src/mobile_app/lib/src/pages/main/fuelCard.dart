import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';

class FuelCardScreen extends StatelessWidget {
  const FuelCardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(title: Text('FuelCardScreen')),
      body: Center(child: Text('FuelCardScreen')),
    );
  }
}
