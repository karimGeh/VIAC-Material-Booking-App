import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile_app/src/api/materials/MaterialsClientAPI.dart';
import 'package:mobile_app/src/api/materials/MaterialsResponses.dart';
import 'package:mobile_app/src/component/cards/PrimaryMaterialCard.dart';
import 'package:mobile_app/src/component/navigation/NavDrawer.dart';
import 'package:mobile_app/src/db/auth.provider.dart';
import 'package:mobile_app/src/styles/colors.dart';
import 'package:mobile_app/src/api/models/Material.dart' as MaterialModel;

class ReserveAMaterialScreen extends StatefulWidget {
  const ReserveAMaterialScreen({Key? key}) : super(key: key);

  @override
  _ReserveAMaterialScreenState createState() => _ReserveAMaterialScreenState();
}

class _ReserveAMaterialScreenState extends State<ReserveAMaterialScreen> {
  List<MaterialModel.Material> materials = [];
  List<MaterialModel.Material> filteredMaterials = [];

  String search = '';
  void _filterMaterials() {
    setState(() {
      filteredMaterials = materials.where((material) {
        // split words and search for each word
        List<String> words = search.split(' ');
        bool isMatch = true;
        for (String word in words) {
          if (!material.ref.toLowerCase().contains(word.toLowerCase()) &&
              !material.type.name.toLowerCase().contains(word.toLowerCase())) {
            isMatch = false;
            break;
          }
        }
        return isMatch;
      }).toList();
    });
  }

  Future<void> _getMaterials() async {
    AuthProvider authProvider = AuthProvider();
    String? token = await authProvider.getAuthToken();

    GetMaterialsResponse response = await MaterialsClientAPI.getMaterials(
      token!,
    );

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

    setState(() {
      materials = response.materials!;
    });
    _filterMaterials();
  }

  _onSearchChange(String value) {
    setState(() {
      search = value;
    });
    _filterMaterials();
  }

  Future<void> _onRefresh() async {
    await _getMaterials();
  }

  @override
  void initState() {
    super.initState();
    _getMaterials();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text('Reserve A Material'),
        backgroundColor: CustomColors.blue1,
      ),
      body: RefreshIndicator(
        onRefresh: _onRefresh,
        child: Flex(
          direction: Axis.vertical,
          children: [
            TextField(
              decoration: InputDecoration(
                // labelText: 'Search',
                hintText: 'Search',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onChanged: _onSearchChange,
              onTapOutside: (event) => FocusScope.of(context).unfocus(),
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: filteredMaterials.length,
                itemBuilder: (context, index) {
                  return PrimaryMaterialCard(filteredMaterials[index]);
                },
              ),
            )
          ],
        ).paddingOnly(left: 16, right: 16, top: 16, bottom: 16),
      ),
    );
  }
}
