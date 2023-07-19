import 'package:flutter/material.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/styles/textStyles.dart';

const TABS = ['Calendar', 'Details'];

class BookPopupNavigation extends StatefulWidget {
  String activeTab;
  Function onSelectedTab;

  BookPopupNavigation(this.activeTab, this.onSelectedTab);

  @override
  _BookPopupNavigationState createState() => _BookPopupNavigationState();
}

class _BookPopupNavigationState extends State<BookPopupNavigation> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      padding: EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: CustomColors.dark2,
        borderRadius: BorderRadius.circular(12),
      ),
      clipBehavior: Clip.hardEdge,
      child: Flex(
        direction: Axis.horizontal,
        children: [
          CustomTab(
            'Calendar',
            widget.activeTab == 'Calendar',
            widget.onSelectedTab,
          ),
          CustomTab(
            'Details',
            widget.activeTab == 'Details',
            widget.onSelectedTab,
          ),
        ],
      ),
    );
  }
}

class CustomTab extends StatefulWidget {
  String tabName;
  bool isSelected;
  Function onSelectedTab;

  @override
  CustomTab(this.tabName, this.isSelected, this.onSelectedTab, {super.key});

  @override
  _CustomTabState createState() => _CustomTabState();
}

class _CustomTabState extends State<CustomTab> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            widget.onSelectedTab(widget.tabName);
          });
        },
        child: Container(
          // height: 36,
          decoration: BoxDecoration(
            color: widget.isSelected ? CustomColors.blue2 : CustomColors.dark2,
            borderRadius: BorderRadius.circular(8),
          ),
          alignment: Alignment.center,
          child: Text(
            widget.tabName,
            style: widget.isSelected
                ? CustomTextStyles.p(
                    color: CustomColors.white,
                    fontWeight: FontWeight.bold,
                  )
                : CustomTextStyles.p(
                    color: CustomColors.white.withOpacity(0.5),
                    fontWeight: FontWeight.bold,
                  ),
          ),
        ),
      ),
    );
  }
}
