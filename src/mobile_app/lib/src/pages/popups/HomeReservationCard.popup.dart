import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';
import 'package:mobile_app/src/api/reservations/ReservationClientAPI.dart';
import 'package:mobile_app/src/api/reservations/ReservationResponses.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/pages/popups/CancelReservationConfirmation.popup.dart';
import 'package:mobile_app/src/pages/popups/PickUpMaterial.popup.dart';
import 'package:mobile_app/src/pages/popups/ReturnMaterial.popup.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class HomeReservationCardPopup extends StatefulWidget {
  final Reservation reservation;
  final BuildContext masterContext;

  HomeReservationCardPopup(
      {required this.reservation, required this.masterContext});

  @override
  _HomeReservationCardPopupState createState() =>
      _HomeReservationCardPopupState();
}

class _HomeReservationCardPopupState extends State<HomeReservationCardPopup> {
  late Reservation reservation;

  double draggedY = 0;
  String loading = '';

  @override
  void initState() {
    super.initState();
    reservation = widget.reservation;
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

  void onPickMaterial(BuildContext context) async {
    Navigator.push(
      widget.masterContext,
      PageRouteBuilder(
        opaque: false,
        pageBuilder: (context, animation1, animation2) => PickupMaterialPopup(
          masterContext: context,
          reservation: reservation,
        ),
      ),
    );
  }

  void onCancelReservation(BuildContext context) {
    // open cancel reservation confirmation popup

    Navigator.push(
      widget.masterContext,
      PageRouteBuilder(
        opaque: false,
        pageBuilder: (context, animation1, animation2) =>
            CancelReservationConfirmationPopup(
          masterContext: context,
          reservation: reservation,
        ),
      ),
    );
    // onClose();
  }

  void onEditReservation() {
    onClose();
  }

  void onReturnMaterial() {
    Navigator.push(
      widget.masterContext,
      PageRouteBuilder(
        opaque: false,
        pageBuilder: (context, animation1, animation2) => ReturnMaterialPopup(
          masterContext: context,
          reservation: reservation,
        ),
      ),
    );
    // onClose();
  }

  void onExtendReservation() {
    onClose();
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
          onVerticalDragUpdate: (details) {
            setState(() {
              draggedY -= details.delta.dy;
              print(
                  'draggedY: $draggedY, clamp: ${draggedY.clamp(draggedY, MediaQuery.of(context).size.height)}');
              draggedY =
                  draggedY.clamp(draggedY, MediaQuery.of(context).size.height);
            });
          },
          onVerticalDragEnd: (details) {
            print(MediaQuery.of(context).size.height - draggedY);
            if (MediaQuery.of(context).size.height - draggedY > 100) {
              onClose();
            } else {
              setState(() {
                draggedY = MediaQuery.of(context).size.height;
              });
            }
          },
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
                          Container(
                              padding: const EdgeInsets.only(
                                top: 16,
                                bottom: 16,
                              ),
                              decoration: BoxDecoration(
                                border: Border(
                                  bottom: BorderSide(
                                    color: CustomColors.black.withOpacity(0.1),
                                  ),
                                ),
                              ),
                              width: MediaQuery.of(context).size.width,
                              child: Row(
                                children: [
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        reservation.material.type.name,
                                        style: CustomTextStyles.title(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        reservation.material.ref,
                                        style: CustomTextStyles.title(
                                          color: CustomColors.black
                                              .withOpacity(0.5),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Spacer(),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        reservation.status,
                                        style: CustomTextStyles.title(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        reservation.getProgressText(),
                                        style: CustomTextStyles.title(
                                          color: CustomColors.black
                                              .withOpacity(0.5),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              )),
                          reservation.status == 'pending'
                              ? Flex(
                                  direction: Axis.vertical,
                                  children: [
                                    CustomButton(
                                      onPressed: () => onPickMaterial(context),
                                      text: 'Pick Material',
                                    ),
                                    ButtonDivider(),
                                    CustomButton(
                                      onPressed: () =>
                                          onCancelReservation(context),
                                      text: 'Cancel Reservation',
                                    ),
                                    ButtonDivider(),
                                    CustomButton(
                                      onPressed: onEditReservation,
                                      text: 'Edit Reservation',
                                    ),
                                  ],
                                )
                              : Flex(
                                  direction: Axis.vertical,
                                  children: [
                                    CustomButton(
                                      onPressed: onReturnMaterial,
                                      text: 'Return Material',
                                    ),
                                    ButtonDivider(),
                                    CustomButton(
                                      onPressed: onExtendReservation,
                                      text: 'Extend Reservation',
                                    ),
                                  ],
                                ),
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

class CustomButton extends StatelessWidget {
  final String text;
  final Function() onPressed;
  CustomButton({required this.text, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: TextButton(
        onPressed: onPressed,
        style: ButtonStyle(
          alignment: Alignment.centerLeft,
          padding: MaterialStateProperty.all(
            const EdgeInsets.only(
              top: 16,
              bottom: 16,
            ),
          ),
        ),
        child: Text(
          text,
          style: CustomTextStyles.title(
              // color: CustomColors.,
              ),
        ),
      ),
    );
  }
}

class ButtonDivider extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: 1,
      color: CustomColors.black.withOpacity(0.1),
    );
  }
}
