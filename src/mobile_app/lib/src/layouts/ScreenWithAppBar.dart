import 'package:flutter/material.dart';
import 'package:mobile_app/src/component/navigation/DefaultAppBar.dart';
import 'package:mobile_app/src/styles/colors.dart';

class ScreenWithAppBar extends StatelessWidget {
  const ScreenWithAppBar({
    Key? key,
    required this.title,
    required this.child,
  }) : super(key: key);

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final double heightStatusBar = MediaQuery.of(context).viewPadding.top;
    return Scaffold(
      backgroundColor: CustomColors.dark1,
      body: Flex(
        direction: Axis.vertical,
        children: [
          // app bar
          DefaultAppBar(title: title, heightStatusBar: heightStatusBar),
          // body
          Expanded(
            flex: 1,
            // child: Padding(
            //   padding: const EdgeInsets.only(
            //     top: 16.0,
            //     bottom: 16.0,
            //     left: 24.0,
            //     right: 24.0,
            //   ),
            // ),
            child: child,
          ),
        ],
      ),
    );
  }
}
