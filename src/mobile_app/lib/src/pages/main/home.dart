// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Reservation.dart';
import 'package:mobile_app/src/api/models/User.dart';
import 'package:mobile_app/src/api/reservations/ReservationClientAPI.dart';
import 'package:mobile_app/src/api/reservations/ReservationResponses.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/router/routes.dart';
import 'package:mobile_app/src/styles/colors.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  User? user;
  List<Reservation> myReservations = [];
  DateTime currentDate = DateTime.now();
  // get user from db
  // if user is not logged in, redirect to login screen
  // if user is logged in, show home screen
  void getUser() async {
    AuthProvider authProvider = AuthProvider();
    bool isLoggedIn = await authProvider.isLoggedIn();
    if (!isLoggedIn) {
      Navigator.pushNamedAndRemoveUntil(context, Routes.auth, (route) => false);
      return;
    }

    // get user
    String? token = await authProvider.getAuthToken();
    User? user = await authProvider.getUser();

    print(user);

    setState(() {
      this.user = user;
    });
  }

  void getMyReservations() async {
    AuthProvider authProvider = AuthProvider();
    String? token = await authProvider.getAuthToken();

    if (token == null) {
      Navigator.pushNamedAndRemoveUntil(context, Routes.auth, (route) => false);
      return;
    }

    GetMyReservationsResponse myReservations =
        await ReservationClientAPI.getMyReservations(token);

    if (myReservations.errors.isNotEmpty) {
      myReservations.errors.forEach((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(error.message),
          ),
        );
      });
    }

    myReservations.reservations!.sort((a, b) {
      return a.endDate.compareTo(b.endDate);
    });
    setState(() {
      this.myReservations = myReservations.reservations!;
    });
    // ReservationClientAPI.getMyReservations(token);
  }

  Future<void> onRefresh() async {
    getUser();
    getMyReservations();
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      getUser();
      getMyReservations();
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text('Home'),
        backgroundColor: CustomColors.blue1,
      ),
      body: RefreshIndicator(
        onRefresh: onRefresh,
        child: ListView(
          children: [
            Container(
              padding: EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome, ${user?.fullName}',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Here are your reservations',
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  SizedBox(height: 20),
                  Text("Current Active Reservations"),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: myReservations.length,
                    itemBuilder: (context, index) {
                      Reservation reservation = myReservations[index];

                      if (reservation.status != 'active') {
                        return Container();
                      }

                      return Card(
                        child: ListTile(
                          title: Text(
                            reservation.material.type.name +
                                ' ' +
                                reservation.material.ref,
                          ),
                          subtitle: Text(reservation.startDate.toString() +
                              ' - ' +
                              reservation.endDate.toString()),
                          trailing: Text(reservation.status),
                        ),
                      );
                    },
                  ),
                  SizedBox(height: 20),
                  Text("Future Reservations"),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: myReservations.length,
                    itemBuilder: (context, index) {
                      Reservation reservation = myReservations[index];

                      if (reservation.status == 'active') {
                        return Container();
                      }

                      return Card(
                        child: ListTile(
                          title: Text(
                            reservation.material.type.name +
                                ' ' +
                                reservation.material.ref,
                          ),
                          subtitle: Text(reservation.startDate.toString() +
                              ' - ' +
                              reservation.endDate.toString()),
                          trailing: Text(reservation.status),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
