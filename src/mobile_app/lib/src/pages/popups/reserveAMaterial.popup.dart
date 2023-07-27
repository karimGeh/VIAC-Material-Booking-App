import 'package:flutter/material.dart';
import 'package:flutter_calendar_carousel/flutter_calendar_carousel.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';
import 'package:mobile_app/src/api/reservations/ReservationClientAPI.dart';
import 'package:mobile_app/src/api/reservations/ReservationRequests.dart';
import 'package:mobile_app/src/api/reservations/ReservationResponses.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonFill.dart';
import 'package:mobile_app/src/component/buttons/PrimaryButtonOutline.dart';
import 'package:mobile_app/src/component/navigation/BookPopupHeader.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/api/models/Material.dart' as MaterialModel;
import 'package:mobile_app/src/styles/textStyles.dart';
import 'package:flutter/cupertino.dart';

const RESERVED_DAYS = [
  "2023-06-01",
  "2023-06-02",
  "2023-06-03",
];

class ReserveAMaterialPopup extends StatefulWidget {
  MaterialModel.Material material;
  AuthProvider authProvider = AuthProvider();

  ReserveAMaterialPopup(this.material) {
    print(material);
  }

  @override
  _ReserveAMaterialPopupState createState() => _ReserveAMaterialPopupState();
}

class _ReserveAMaterialPopupState extends State<ReserveAMaterialPopup> {
  // draggedY variable to know how much the user dragged the popup
  // and to know when to close the popup
  double defaultDraggedY = 50;
  double draggedY = 0;
  String activeTab = 'Calendar';
  DateTime _currentDate = DateTime.now();
  List<Reservation> reservations = [];
  DateTime? startDate = null;
  DateTime? endDate = null;

  void onSelectedTab(String tabName) {
    print('onSelectedTab: $tabName, $activeTab');
    setState(() {
      activeTab = tabName;
    });
  }

  void getThisMaterialReservations() async {
    final token = await widget.authProvider.getAuthToken();

    if (token == null) {
      return;
    }

    GetReservationsByMaterialIdResponse response =
        await ReservationClientAPI.getReservationsByMaterialId(
            token, widget.material.id);

    if (response.errors.isNotEmpty) {
      response.errors.forEach((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(error.message),
          ),
        );
      });
      return;
    }

    // work hours from 8:00 to 19:00 GMT+1

    // List<DateTime> list_of_

    setState(() {
      reservations = response.reservations!;
    });

    // if (response.success!) {
    //   print(response.reservations);
    // }
  }

  int getHowManyHoursNotReservedInADay(DateTime date) {
    // 8:00 to 19:00 GMT
    DateTime startDate = DateTime(date.year, date.month, date.day, 6, 0, 0);
    DateTime endDate = DateTime(date.year, date.month, date.day, 22, 0, 0);

    // we will keep removing the intersection between the reservation and
    // the work hours interval defined above until we left with the hours
    // that are not reserved
    for (Reservation reservation in reservations) {
      DateTime reservationStartDate = reservation.startDate;
      DateTime reservationEndDate =
          reservation.returnedAt ?? reservation.endDate;

      if (startDate.isAfter(reservationStartDate) &&
          startDate.isBefore(reservationEndDate)) {
        startDate = reservationEndDate;
      } else if (endDate.isAfter(reservationStartDate) &&
          endDate.isBefore(reservationEndDate)) {
        endDate = reservationStartDate;
      } else if (startDate.isBefore(reservationStartDate) &&
          endDate.isAfter(reservationEndDate)) {
        return 0;
      }
    }

    return endDate.difference(startDate).inHours < 0
        ? 0
        : endDate.difference(startDate).inHours;
  }

  List<String> getDayStatus(day) {
    List<String> dayStatuses = ['empty'];
    DateTime dayDate = DateTime.parse(day.toString().substring(0, 10));

    int howManyHoursNotReservedInADay =
        getHowManyHoursNotReservedInADay(dayDate);

    if (howManyHoursNotReservedInADay == 0) {
      // dayStatus = 'full';
      dayStatuses.add('full');
    }
    if (howManyHoursNotReservedInADay < 8 &&
        howManyHoursNotReservedInADay > 0) {
      dayStatuses.add('half');
    }
    if (startDate != null &&
        dayDate.day == startDate?.day &&
        dayDate.month == startDate?.month) {
      dayStatuses.add('start');
    }
    if (endDate != null &&
        dayDate.day == endDate?.day &&
        dayDate.month == endDate?.month) {
      dayStatuses.add('end');
    }
    if (startDate != null &&
        endDate != null &&
        dayDate.isAfter(startDate!) &&
        dayDate.isBefore(endDate!)) {
      dayStatuses.add('selected');
    }

    return dayStatuses;
  }

  @override
  void initState() {
    super.initState();
    draggedY = defaultDraggedY;
    getThisMaterialReservations();
  }

  void _makeAReservation(context) async {
    final token = await widget.authProvider.getAuthToken();

    if (token == null || startDate == null || endDate == null) {
      return;
    }

    CreateReservationResponse response =
        await ReservationClientAPI.createReservation(
            token,
            widget.material.id,
            CreateReservationRequest(
              startDate: startDate!,
              endDate: endDate!,
            ));

    if (response.errors.isNotEmpty) {
      response.errors.forEach((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(error.message),
          ),
        );
      });
      return;
    }

    Navigator.of(context).pop();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Reservation made successfully'),
      ),
    );
  }

  Widget _customDayBuilder(
    isSelectable,
    index,
    isSelectedDay,
    isToday,
    isPrevMonthDay,
    textStyle,
    isNextMonthDay,
    isThisMonthDay,
    day,
  ) {
    List<String> dayStatuses = getDayStatus(day);
    return Container(
      width: 100,
      height: 30,
      decoration: BoxDecoration(
        color: dayStatuses.any((element) => ['start', 'end'].contains(element))
            ? CustomColors.blue1
            : dayStatuses.contains('selected')
                ? CustomColors.black.withAlpha(70)
                : dayStatuses.contains('full')
                    ? CustomColors.error
                    : dayStatuses.contains('half')
                        ? CustomColors.warning
                        : CustomColors.transparent,
        borderRadius: BorderRadius.only(
          topLeft: dayStatuses.contains('start')
              ? Radius.circular(12)
              : Radius.circular(0),
          bottomLeft: dayStatuses.contains('start')
              ? Radius.circular(12)
              : Radius.circular(0),
          topRight: dayStatuses.contains('end')
              ? Radius.circular(12)
              : Radius.circular(0),
          bottomRight: dayStatuses.contains('end')
              ? Radius.circular(12)
              : Radius.circular(0),
        ),

        // border: Border.all(
        //   color: CustomColors.error,
        // ),
      ),
      child: Center(
        child: Text(
          day.day.toString(),
          style: TextStyle(
            color: dayStatuses.any((element) => [
                      'full',
                      'half',
                      'start',
                      'end',
                      'selected'
                    ].contains(element))
                ? CustomColors.white
                : CustomColors.black,
          ),
        ),
      ),
    );
  }

  Widget _buildCalendar(BuildContext context) {
    return CalendarCarousel(
      showHeader: true,
      showIconBehindDayText: true,
      childAspectRatio: 1.6,
      weekendTextStyle: const TextStyle(
        color: CustomColors.dark2,
      ),
      weekdayTextStyle: const TextStyle(
        color: CustomColors.dark2,
      ),
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.width / 1.6 + 40,
      // selectedDateTime: _currentDate,
      headerMargin: EdgeInsets.symmetric(horizontal: 0, vertical: 0),
      headerTextStyle: CustomTextStyles.title(
        color: CustomColors.dark2,
      ),
      todayBorderColor: CustomColors.transparent,
      markedDateMoreShowTotal: false,
      pageScrollPhysics: RangeMaintainingScrollPhysics(),

      customDayBuilder: _customDayBuilder,
      todayButtonColor: CustomColors.transparent,
      dayPadding: 0,

      onDayPressed: (DateTime date, List events) {
        setState(() {
          // general conditions
          DateTime now = DateTime.now();
          // make now time at 12:00 AM
          now = DateTime(now.year, now.month, now.day);
          if (now.isAfter(date)) {
            return;
          }

          if (startDate == null) {
            // start date is the min between DateTime.now()+ 1h and the date pressed
            // set hour to  6 am GMT
            startDate = !DateTime.now().isBefore(date)
                ? DateTime.now()
                : date.add(Duration(hours: 6));

            endDate = null;
          } else if (endDate == null &&
              (date.isAtSameMomentAs(startDate!) || date.isAfter(startDate!))) {
            endDate = date.add(Duration(hours: 22));
          } else {
            startDate = date.add(
              Duration(hours: 6),
            );
            endDate = null;
          }
        });
      },
    );
  }

  Widget _buildDetails() {
    return Container(
      child: Text('Details'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.transparent,
      body: Container(
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
            child: Container(
              padding: EdgeInsets.all(16),
              child: Flex(
                direction: Axis.vertical,
                // mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  BookPopupHeader(widget.material),
                  // BookPopupNavigation(
                  //   activeTab,
                  //   onSelectedTab,
                  // ),
                  // activeTab == 'Calendar'
                  //     ?
                  //     : _buildDetails(),
                  // start and end date time picker

                  _buildCalendar(context),

                  Row(
                    children: [
                      Text(
                        'Start date',
                        style: CustomTextStyles.title(
                          color: CustomColors.dark2,
                        ),
                      ),
                      Spacer(),
                      TextButton(
                        onPressed: () {
                          // show cupertino date time picker
                          showCupertinoModalPopup(
                            context: context,
                            builder: (context) {
                              return Container(
                                height: 150,
                                width: MediaQuery.of(context).size.width,
                                // make background white
                                color: CustomColors.white,

                                child: CupertinoDatePicker(
                                  minimumDate: startDate != null &&
                                          DateTime.now().isAfter(startDate!)
                                      ? startDate
                                      : DateTime.now(),

                                  initialDateTime: startDate ?? DateTime.now(),
                                  // minimumDate: DateTime.now(),
                                  maximumDate: endDate,
                                  use24hFormat: false,
                                  backgroundColor: CustomColors.white,
                                  onDateTimeChanged: (DateTime value) {
                                    setState(() {
                                      startDate = value;
                                    });
                                  },
                                ),
                              );
                            },
                          );
                        },
                        child: Text(
                          startDate != null
                              ? startDate.toString()
                              : 'Select date',
                          style: CustomTextStyles.title(
                            color: CustomColors.dark2,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Text(
                        'End date',
                        style: CustomTextStyles.title(
                          color: CustomColors.dark2,
                        ),
                      ),
                      Spacer(),
                      TextButton(
                        onPressed: () {
                          // show cupertino date time picker
                          showCupertinoModalPopup(
                            context: context,
                            builder: (context) {
                              return Container(
                                height: 150,
                                width: MediaQuery.of(context).size.width,
                                // make background white
                                color: CustomColors.white,

                                child: CupertinoDatePicker(
                                  minimumDate: startDate,
                                  initialDateTime: endDate != null
                                      ? endDate
                                      : startDate != null
                                          ? startDate!.add(Duration(hours: 1))
                                          : DateTime.now().add(
                                              Duration(hours: 1),
                                            ),
                                  // showDayOfWeek: false,
                                  use24hFormat: false,
                                  backgroundColor: CustomColors.white,
                                  onDateTimeChanged: (DateTime value) {
                                    setState(() {
                                      endDate = value;
                                    });
                                  },
                                ),
                              );
                            },
                          );
                        },
                        child: Text(
                          endDate != null ? endDate.toString() : 'Select date',
                          style: CustomTextStyles.title(
                            color: CustomColors.dark2,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  // book buttons
                  Row(
                    children: [
                      Expanded(
                        child: PrimaryButtonOutline(
                          text: 'Cancel',
                          onPressed: () {
                            Navigator.pop(context);
                          },
                        ),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: PrimaryButtonFill(
                          text: 'Book',
                          onPressed: () => _makeAReservation(context),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
