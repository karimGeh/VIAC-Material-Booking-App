import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';

class ReserveAMaterialScreen extends StatelessWidget {
  const ReserveAMaterialScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(title: Text('ReserveAMaterialScreen')),
      body: Center(child: Text('ReserveAMaterialScreen')),
    );
  }
}
