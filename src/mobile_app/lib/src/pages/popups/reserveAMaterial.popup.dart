import 'package:flutter/material.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/api/models/Material.dart' as MaterialModel;

class ReserveAMaterialPopup extends StatefulWidget {
  MaterialModel.Material material;

  ReserveAMaterialPopup(this.material) {
    print(material);
  }

  @override
  _ReserveAMaterialPopupState createState() => _ReserveAMaterialPopupState();
}

class _ReserveAMaterialPopupState extends State<ReserveAMaterialPopup> {
  // draggedY variable to know how much the user dragged the popup
  // and to know when to close the popup
  double defaultDraggedY = 250;
  double draggedY = 0;

  @override
  void initState() {
    super.initState();
    draggedY = defaultDraggedY;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: CustomColors.black.withOpacity(0.5),
      ),
      child: GestureDetector(
        onVerticalDragUpdate: (details) {
          setState(() {
            draggedY += details.delta.dy;
            draggedY = draggedY.clamp(
                0.0,
                // screen height - popup height
                MediaQuery.of(context).size.height);
          });
        },
        onVerticalDragEnd: (details) {
          if (draggedY - defaultDraggedY > 100) {
            while (
                // screen height - popup height
                draggedY < MediaQuery.of(context).size.height) {
              setState(() {
                draggedY += 10;
              });
            }
            Navigator.pop(context);
          } else {
            setState(() {
              draggedY = defaultDraggedY;
            });
          }
        },
        child: AnimatedContainer(
          duration: Duration(milliseconds: 50),
          decoration: BoxDecoration(
            color: CustomColors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(12),
              topRight: Radius.circular(12),
            ),
            boxShadow: [
              BoxShadow(
                color: CustomColors.black.withOpacity(0.1),
                blurRadius: 10,
                // offset: Offset(0, 5),
              ),
            ],
          ),
          // make the popup follow the user's finger
          margin: EdgeInsets.only(top: draggedY),
          child: Flex(
            direction: Axis.vertical,
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              // header
              // Row(
              //   children: [
              //     IconButton(
              //       onPressed: () {
              //         Navigator.pop(context);
              //       },
              //       icon: const Icon(
              //         Icons.arrow_back_ios,
              //         color: CustomColors.black,
              //         size: 30,
              //       ),
              //     ),
              //     Expanded(
              //       child: Container(
              //         padding: EdgeInsets.symmetric(vertical: 12),
              //         child: Text(
              //           'Reserve a material',
              //           textAlign: TextAlign.center,
              //           style: TextStyle(
              //             color: CustomColors.black,
              //             fontSize: 18,
              //             fontWeight: FontWeight.w600,
              //           ),
              //         ),
              //       ),
              //     ),
              //   ],
              // ),
            ],
          ),
        ),
      ),
    );
  }
}
