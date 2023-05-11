// main button Outline

import 'package:flutter/material.dart';
import 'package:mobile_app/src/styles/colors.dart';

class PrimaryButtonOutline extends StatelessWidget {
  const PrimaryButtonOutline({
    Key? key,
    required this.text,
    required this.onPressed,
    this.width,
    this.height,
    this.color,
    this.textColor,
  }) : super(key: key);

  final String text;
  final VoidCallback onPressed;
  final double? width;
  final double? height;
  final Color? color;
  final Color? textColor;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width ?? MediaQuery.of(context).size.width,
      height: height ?? 40.0,
      child: TextButton(
        onPressed: onPressed,
        style: ButtonStyle(
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
          backgroundColor: MaterialStateProperty.all<Color>(Colors.transparent),
          // borderRadius: MaterialStateProperty.all<BorderRadius>(
          //   BorderRadius.circular(10.0),
          // ),
          side: MaterialStateProperty.all<BorderSide>(
            BorderSide(
              color: color ?? CustomColors.blue1,
              width: 1.0,
            ),
          ),
        ),
        child: Text(
          text,
          style: TextStyle(
            color: textColor ?? CustomColors.blue1,
            fontSize: 16.0,
          ),
        ),
      ),
    );
  }
}
