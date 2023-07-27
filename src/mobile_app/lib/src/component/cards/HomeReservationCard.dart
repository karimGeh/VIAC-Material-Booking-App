import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';
import 'package:mobile_app/src/pages/popups/HomeReservationCard.popup.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

class HomeReservationCard extends StatefulWidget {
  Reservation reservation;

  HomeReservationCard({required this.reservation});

  @override
  _HomeReservationCardState createState() => _HomeReservationCardState();
}

class _HomeReservationCardState extends State<HomeReservationCard> {
  late Reservation reservation;
  double progress = 0.0;

  @override
  void initState() {
    super.initState();

    setState(() {
      reservation = widget.reservation;
      progress = reservation.getProgress();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.hardEdge,
      margin: EdgeInsets.only(top: 16),
      height: 90,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 3,
            blurRadius: 5,
            offset: Offset(0, 0),
          ),
        ],
      ),
      child: Flex(
        direction: Axis.vertical,
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(left: 10, right: 10, top: 2, bottom: 2),
              child: Flex(
                direction: Axis.horizontal,
                children: [
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.all(10),
                      child: Flex(
                        direction: Axis.vertical,
                        children: [
                          Row(
                            children: [
                              Text(
                                reservation.material.type.name,
                                style: CustomTextStyles.cardTitle(),
                              ),
                              SizedBox(width: 10),
                              Text(
                                'Ref: ${reservation.material.ref}',
                                style: CustomTextStyles.cardTitle(
                                  fontWeight: FontWeight.normal,
                                  color: CustomColors.black.withOpacity(0.5),
                                ),
                              ),
                            ],
                          ),
                          Expanded(
                            child: Row(
                              children: [
                                // ends at : dd-mm-yyyy at hh:mm am/pm
                                Text(
                                  'Ends at: ${reservation.endDate.day}-${reservation.endDate.month}-${reservation.endDate.year} at ${reservation.endDate.hour}:${reservation.endDate.minute} ${reservation.endDate.hour > 12 ? 'pm' : 'am'}',
                                  style: CustomTextStyles.cardTitle(
                                    fontWeight: FontWeight.normal,
                                    color: CustomColors.black.withOpacity(0.5),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Row(
                            children: [
                              Text(
                                'Left:',
                                style: CustomTextStyles.cardTitle(
                                  fontWeight: FontWeight.normal,
                                  color: CustomColors.black.withOpacity(0.5),
                                ),
                              ),
                              SizedBox(width: 10),
                              Text(
                                reservation.getProgressText(),
                                style: CustomTextStyles.cardTitle(
                                  fontWeight: FontWeight.bold,
                                  color: reservation.startDate
                                          .isAfter(DateTime.now())
                                      ? CustomColors.info
                                      : progress == 1
                                          ? CustomColors.error
                                          : CustomColors.success,
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                  // 3 vertical dots icon
                  Container(
                    padding: EdgeInsets.only(left: 10),
                    // width: 10,
                    height: 50,
                    child: TextButton(
                      style: ButtonStyle(
                        padding: MaterialStateProperty.all(EdgeInsets.zero),
                        minimumSize:
                            MaterialStateProperty.all(const Size(20, 0)),
                        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      ),
                      onPressed: () {
                        // show HomeReservationPopup
                        Navigator.push(
                          context,
                          PageRouteBuilder(
                            opaque: false,
                            pageBuilder: (context, animation1, animation2) =>
                                HomeReservationCardPopup(
                              masterContext: context,
                              reservation: reservation,
                            ),
                            transitionDuration: Duration(seconds: 0),
                          ),
                        );
                      },
                      child: Icon(
                        Icons.more_vert,
                        color: Colors.black,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // create a progress bar with default background gray and progress bar color green
          Container(
            height: 12,
            width: double.infinity,
            color: CustomColors.transparent,
            child: LinearProgressIndicator(
              value: progress,
              // minHeight: 10,
              backgroundColor: reservation.startDate.isAfter(DateTime.now())
                  ? CustomColors.info
                  : CustomColors.black.withOpacity(0.2),
              valueColor: AlwaysStoppedAnimation<Color>(
                reservation.startDate.isAfter(DateTime.now())
                    ? Colors.grey.shade300
                    : progress == 1
                        ? CustomColors.error
                        : CustomColors.success,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
