import 'package:flutter/material.dart';
import 'package:mobile_app/src/styles/colors.dart';

class CustomTextStyles {
  static h1({
    Color? color,
    FontWeight? fontWeight = FontWeight.normal,
    TextAlign? textAlign = TextAlign.left,
  }) {
    return TextStyle(
      // 36 bold inter
      fontSize: 36.0,
      fontWeight: fontWeight,
      color: color ?? CustomColors.black,
    );
  }

  static screenTitle({
    Color? color = CustomColors.black,
    FontWeight? fontWeight = FontWeight.normal,
    TextAlign? textAlign = TextAlign.left,
  }) {
    return TextStyle(
      // 24 bold inter
      fontSize: 24.0,
      fontWeight: fontWeight,
      color: color,
    );
  }

  static p({
    Color? color = CustomColors.black,
    FontWeight? fontWeight = FontWeight.normal,
    TextAlign? textAlign = TextAlign.left,
  }) {
    return TextStyle(
      // 16 regular inter
      fontSize: 14.0,
      fontWeight: fontWeight,
      color: color,
    );
  }

  static title({
    Color? color = CustomColors.black,
    FontWeight? fontWeight = FontWeight.normal,
    TextAlign? textAlign = TextAlign.left,
  }) {
    return TextStyle(
      // 14 bold inter
      fontSize: 18.0,
      fontWeight: fontWeight,
      color: color,
    );
  }

  static cardTitle({
    Color? color = CustomColors.black,
    FontWeight? fontWeight = FontWeight.bold,
    TextAlign? textAlign = TextAlign.left,
  }) {
    return TextStyle(
      // 14 bold inter
      fontSize: 14.0,
      fontWeight: fontWeight,
      color: color,
    );
  }

  static error({
    Color? color = CustomColors.white,
    FontWeight? fontWeight = FontWeight.bold,
    TextAlign? textAlign = TextAlign.left,
  }) {
    return TextStyle(
      // 14 bold inter
      fontSize: 14.0,
      fontWeight: fontWeight,
      color: color,
    );
  }
}
