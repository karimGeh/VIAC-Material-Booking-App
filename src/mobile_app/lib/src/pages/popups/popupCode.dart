import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class ExamplePopup extends StatefulWidget {
  final BuildContext masterContext;

  ExamplePopup({required this.masterContext});

  @override
  _ExamplePopupState createState() => _ExamplePopupState();
}

class _ExamplePopupState extends State<ExamplePopup> {
  double draggedY = 0;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    draggedY = MediaQuery.of(widget.masterContext).size.height;
  }

  void onClose() {
    while (
        // screen height - popup height
        draggedY > 0) {
      setState(() {
        draggedY -= 10;
      });
    }
    Navigator.pop(context);
  }

  void onVerticalDragEnd(DragEndDetails details) {
    if (MediaQuery.of(context).size.height - draggedY > 100) {
      onClose();
    } else {
      setState(() {
        draggedY = MediaQuery.of(context).size.height;
      });
    }
  }

  void onVerticalDragUpdate(DragUpdateDetails details) {
    setState(() {
      draggedY -= details.delta.dy;
      // print(
      //     'draggedY: $draggedY, clamp: ${draggedY.clamp(draggedY, MediaQuery.of(context).size.height)}');
      draggedY = draggedY.clamp(draggedY, MediaQuery.of(context).size.height);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.transparent,
      body: Container(
        decoration: BoxDecoration(
          color: CustomColors.black.withOpacity(0.5),
        ),
        // on drag to close
        child: GestureDetector(
          onVerticalDragUpdate: onVerticalDragUpdate,
          onVerticalDragEnd: onVerticalDragEnd,
          child: AnimatedContainer(
            duration: const Duration(microseconds: 10),
            transform: Matrix4.translationValues(
              0,
              MediaQuery.of(context).size.height - draggedY,
              0,
            ),
            child: Container(
              width: MediaQuery.of(context).size.width,
              child: Flex(
                direction: Axis.vertical,
                // mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Expanded(
                    child: TapRegion(
                      onTapInside: (event) {
                        onClose();
                      },
                      child: Container(
                        decoration: const BoxDecoration(
                            color: CustomColors.transparent),
                      ),
                    ),
                  ),
                  Container(
                      decoration: const BoxDecoration(
                        color: CustomColors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(12),
                          topRight: Radius.circular(12),
                        ),
                      ),
                      padding: const EdgeInsets.only(
                        left: 16,
                        right: 16,
                        top: 8,
                        bottom: 8,
                      ),
                      width: MediaQuery.of(context).size.width,
                      child: Flex(
                        direction: Axis.vertical,
                        children: [
                          Container(
                            height: 4,
                            width: 40,
                            decoration: BoxDecoration(
                              color: CustomColors.black.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          // ! place header here
                          const SizedBox(
                            height: 20,
                          ),
                          // !
                          // write code here
                          // !
                          const SizedBox(
                            height: 10,
                          ),
                        ],
                      )),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
