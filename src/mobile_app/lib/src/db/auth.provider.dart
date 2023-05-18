import 'package:mobile_app/src/api/models/User.dart';
import 'package:mobile_app/src/api/users/AuthResponses.dart';
import 'package:mobile_app/src/db/db.provider.dart';
import 'package:sqflite/sqflite.dart';

class AuthProvider extends DbProvider {
  Future<bool> isLoggedIn() async {
    final db = await getDB();

    final List<Map<String, dynamic>> results = await db.query(
      'KeyPairs',
      where: 'key = ?',
      whereArgs: ['is_logged_in'],
    );

    return results.isNotEmpty && results[0]['value'] == 'true';
  }

  Future<String?> getAuthToken() async {
    final db = await getDB();

    final List<Map<String, dynamic>> results = await db.query(
      'KeyPairs',
      where: 'key = ?',
      whereArgs: ['auth_token'],
    );

    if (results.length == 0) {
      return null;
    }

    return results[0]['value'];
  }

  Future<String?> getUserID() async {
    final db = await getDB();

    final List<Map<String, dynamic>> results = await db.query(
      'KeyPairs',
      where: 'key = ?',
      whereArgs: ['userID'],
    );

    if (results.length == 0) {
      return null;
    }

    return results[0]['value'];
  }

  Future<User?> getUser() async {
    final db = await getDB();

    final List<Map<String, dynamic>> results = await db.query(
      'Users',
      where: 'id = ?',
      whereArgs: [await getUserID()],
    );

    if (results.length == 0) {
      return null;
    }

    return User.fromJson(results[0]);
  }

  Future<bool> onLogin(LoginResponse loginResponse) async {
    final db = await getDB();

    if (loginResponse.auth_token == null || loginResponse.user == null) {
      return false;
    }

    await db.insert(
      'KeyPairs',
      {
        'key': 'is_logged_in',
        'value': 'true',
      },
    );
    await db.insert(
      'KeyPairs',
      {
        'key': 'auth_token',
        'value': loginResponse.auth_token,
      },
    );

    await db.insert(
      'KeyPairs',
      {
        'key': 'userID',
        'value': loginResponse.user!.id,
      },
    );

    await db.insert(
      'Users',
      loginResponse.user!.toJson(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );

    return true;
  }

  Future<bool> onLogout() async {
    final db = await getDB();

    await db.delete(
      'KeyPairs',
      where: 'key = ?',
      whereArgs: ['is_logged_in'],
    );
    await db.delete(
      'KeyPairs',
      where: 'key = ?',
      whereArgs: ['auth_token'],
    );
    await db.delete(
      'KeyPairs',
      where: 'key = ?',
      whereArgs: ['userID'],
    );

    return true;
  }
}
