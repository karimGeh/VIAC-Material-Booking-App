import 'package:flutter/material.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class DefaultAppBar extends StatelessWidget {
  const DefaultAppBar({
    Key? key,
    required this.title,
    this.showTitle = true,
    this.heightStatusBar = 0.0,
  }) : super(key: key);

  final String title;
  final bool? showTitle;
  final double heightStatusBar;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        top: heightStatusBar + 16.0,
        left: 16.0,
        right: 16.0,
        bottom: 16.0,
      ),
      child: Flex(
        direction: Axis.horizontal,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          // back button
          Container(
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(12.0)),
              // border: Border(
              //   top: BorderSide(width: 1.0, color: CustomColors.blue1),
              //   left: BorderSide(width: 1.0, color: CustomColors.blue1),
              //   right: BorderSide(width: 1.0, color: CustomColors.blue1),
              //   bottom: BorderSide(width: 1.0, color: CustomColors.blue1),
              // ),
              color: CustomColors.blue1,
            ),
            height: 40.0,
            width: 40.0,
            child: Center(
              child: IconButton(
                alignment: Alignment.center,
                onPressed: () => Navigator.pop(context),
                icon: const Icon(
                  Icons.arrow_back_ios,
                  color: CustomColors.dark1,
                  size: 15.0,
                ),
                iconSize: 15,
                padding: EdgeInsets.only(left: 5),
              ),
            ),
          ),

          // title
          if (showTitle ?? true)
            Padding(
              padding: EdgeInsets.only(left: 16.0),
              child: Text(
                title,
                style: CustomTextStyles.screenTitle(
                  color: CustomColors.blue1,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
