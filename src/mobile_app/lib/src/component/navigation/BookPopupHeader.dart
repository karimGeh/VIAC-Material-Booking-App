import 'package:flutter/material.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/src/api/models/Material.dart' as MaterialModel;
import 'package:mobile_app/src/styles/colors.dart';

class BookPopupHeader extends StatefulWidget {
  MaterialModel.Material material;

  BookPopupHeader(this.material);

  @override
  _BookPopupHeaderState createState() => _BookPopupHeaderState();
}

class _BookPopupHeaderState extends State<BookPopupHeader> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Flex(
      direction: Axis.horizontal,
      children: [
        // close icon
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: CustomColors.blue4,
            borderRadius: BorderRadius.circular(12),
          ),
          child: IconButton(
            icon: Icon(Icons.close, color: CustomColors.white),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        SizedBox(width: 16),
        // info
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.material.type.name,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                widget.material.ref,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
