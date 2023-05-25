import 'package:flutter/widgets.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';

class PrimaryReservationCard extends StatefulWidget {
  Reservation reservation;

  PrimaryReservationCard({required this.reservation});

  @override
  _PrimaryReservationCardState createState() => _PrimaryReservationCardState();
}

class _PrimaryReservationCardState extends State<PrimaryReservationCard> {
  late Reservation reservation;

  @override
  void initState() {
    super.initState();
    reservation = widget.reservation;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      // print reservation
      child: Text(widget.reservation.toJson().toString()),
    );
  }
}
