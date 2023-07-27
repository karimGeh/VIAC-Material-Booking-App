import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';
import 'package:mobile_app/src/api/reservations/ReservationClientAPI.dart';
import 'package:mobile_app/src/api/reservations/ReservationResponses.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonOutline.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class CancelReservationConfirmationPopup extends StatefulWidget {
  final Reservation reservation;
  final BuildContext masterContext;

  CancelReservationConfirmationPopup(
      {required this.reservation, required this.masterContext});

  @override
  _CancelReservationConfirmationPopupState createState() =>
      _CancelReservationConfirmationPopupState();
}

class _CancelReservationConfirmationPopupState
    extends State<CancelReservationConfirmationPopup> {
  late Reservation reservation;

  double draggedY = 0;
  bool loading = false;

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

  void onCancelReservation() async {
    if (loading) return;
    AuthProvider authProvider = AuthProvider();
    String? auth_token = await authProvider.getAuthToken();

    if (auth_token == null) return;

    setState(() {
      loading = true;
    });

    CancelReservationResponse cancelReservationResponse =
        await ReservationClientAPI.cancelReservation(
      auth_token,
      reservation.id,
    );

    setState(() {
      loading = false;
    });

    if (cancelReservationResponse.success != true) {
      cancelReservationResponse.errors.forEach((e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.message),
          ),
        );
      });

      return;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Reservation cancelled successfully'),
      ),
    );

    // reset navigation to /home
    // Navigator.popAndPushNamed(context, Routes.main_home);
    Navigator.pushNamedAndRemoveUntil(
        context, Routes.main_home, (route) => false);
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
                          const SizedBox(
                            height: 20,
                          ),
                          Text(
                            'Are you sure you want to cancel this reservation?',
                            style: CustomTextStyles.title(
                              color: CustomColors.black.withOpacity(0.8),
                            ),
                          ),
                          const SizedBox(
                            height: 50,
                          ),
                          Row(
                            children: [
                              Expanded(
                                child: PrimaryButtonOutline(
                                  onPressed: onClose,
                                  text: 'Close',
                                  color: CustomColors.black.withOpacity(0.8),
                                  textColor:
                                      CustomColors.black.withOpacity(0.8),
                                ),
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Expanded(
                                child: !loading
                                    ? PrimaryButtonFill(
                                        text: 'Cancel Reservation',
                                        color: CustomColors.error,
                                        onPressed: onCancelReservation,
                                      )
                                    : Center(
                                        child: CircularProgressIndicator(),
                                      ),
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
