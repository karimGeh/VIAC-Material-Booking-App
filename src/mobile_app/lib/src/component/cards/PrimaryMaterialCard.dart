import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Material.dart' as MaterialModel;
import 'package:mobile_app/src/pages/popups/reserveAMaterial.popup.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class PrimaryMaterialCard extends StatefulWidget {
  MaterialModel.Material material;

  PrimaryMaterialCard(
    this.material, {
    Key? key,
  }) : super(key: key);

  @override
  _PrimaryMaterialCardState createState() => _PrimaryMaterialCardState();
}

class _PrimaryMaterialCardState extends State<PrimaryMaterialCard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 8),
      // hard edges
      clipBehavior: Clip.hardEdge,
      decoration: BoxDecoration(
        color: CustomColors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: CustomColors.black.withOpacity(0.1),
            blurRadius: 10,
            // offset: Offset(0, 5),
          ),
        ],
      ),
      child: TextButton(
        style: TextButton.styleFrom(
          padding: EdgeInsets.all(12),
          // primary: CustomColors.black,
          // shape: RoundedRectangleBorder(
          //   borderRadius: BorderRadius.circular(12),
          // ),
        ),
        onPressed: () {
          print('Open reserve a material popup for ${widget.material.ref}');
          Navigator.push(
            context,
            PageRouteBuilder(
              opaque: false,
              pageBuilder: (context, animation1, animation2) =>
                  ReserveAMaterialPopup(
                widget.material,
              ),
              transitionDuration: Duration(seconds: 0),
            ),
          );
        },
        // height: 60,

        child: Flex(
          direction: Axis.horizontal,
          // icon( green = available, orange = currently in use, red = not available)
          children: [
            Container(
              width: 30,
              height: 30,
              margin: EdgeInsets.only(right: 24),
              child: Icon(
                Icons.calendar_today,
                color: [MaterialModel.MaterialStates.available]
                        .contains(widget.material.state)
                    ? CustomColors.success
                    : [MaterialModel.MaterialStates.inUse]
                            .contains(widget.material.state)
                        ? CustomColors.warning
                        : CustomColors.error,
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(widget.material.type.name,
                    style: CustomTextStyles.title()),
                Text(
                  widget.material.ref,
                  style: CustomTextStyles.p(),
                ),
              ],
            ),
            Spacer(),
            Container(
              width: 30,
              height: 30,
              margin: EdgeInsets.only(left: 24),
              // decoration: BoxDecoration(
              // color: CustomColors.error,
              // borderRadius: BorderRadius.circular(12),
              // ),
              child: Icon(
                Icons.arrow_forward_ios,
                color: CustomColors.black,
              ),
            )
          ],
        ),
      ),
    );
  }
}
