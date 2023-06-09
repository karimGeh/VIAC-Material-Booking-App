import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';

import 'dart:io';
import 'dart:async';

class DbProvider {
  Database? _db;

  Future<Database> getDB() async {
    if (_db != null) {
      return _db!;
    }
    _db = await init();
    return _db!;
  }

  Future<Database> init() async {
    Directory documentDirectory = await getApplicationDocumentsDirectory();
    print(documentDirectory.path);
    // await deleteDB();
    // return null
    String path = join(documentDirectory.path, "main.db");
    var ourDb = await openDatabase(path, version: 1, onCreate: _onCreate);
    return ourDb;
  }

  Future<void> deleteDB() async {
    Directory documentDirectory = await getApplicationDocumentsDirectory();
    String path = join(documentDirectory.path, "main.db");
    await deleteDatabase(path);
    // return true;
  }

  void dropAllTables() async {
    final db = await getDB();
    await db.execute("DROP TABLE IF EXISTS KeyPairs");
    await db.execute("DROP TABLE IF EXISTS Users");
    await db.execute("DROP TABLE IF EXISTS MaterialCategories");
    await db.execute("DROP TABLE IF EXISTS Materials");
    await db.execute("DROP TABLE IF EXISTS Reservations");
    await db.execute("DROP TABLE IF EXISTS Notifications");
  }

  void _onCreate(Database db, int version) async {
    await _createTables(db);
    print("Tables is created");
  }

  Future _createTables(Database db) async {
    // here we will store tokens and other key value pairs
    await db.execute("""
        CREATE TABLE KeyPairs
        (
          _id INTEGER PRIMARY KEY, 
          key TEXT, 
          value TEXT
          )
      """);

    // here we will save the user data
    await db.execute("""
        CREATE TABLE Users
        (
          _id TEXT PRIMARY KEY, 
          code TEXT, 
          fullName TEXT, 
          email TEXT, 
          phoneNum TEXT, 
          type TEXT, 
          createdAt TEXT, 
          updatedAt TEXT
        )""");

    await db.execute("""
        CREATE TABLE MaterialCategories
        (
          _id TEXT PRIMARY KEY, 
          name TEXT, 
          createdAt TEXT, 
          updatedAt TEXT
        )
    """);

    await db.execute("""
        CREATE TABLE Materials
        (
          _id TEXT PRIMARY KEY, 
          name TEXT, 
          type TEXT, 
          ref TEXT, 
          state TEXT, 
          barcode TEXT, 
          compatibleWith BLOB, 
          compatibleWithMe BLOB, 
          createdAt TEXT, 
          updatedAt TEXT, 
          FOREIGN KEY(type) REFERENCES MaterialCategories(_id)
        )
    """);

    await db.execute("""
        CREATE TABLE Reservations
        (
          _id TEXT PRIMARY KEY, 
          author TEXT, 
          material TEXT, 
          owner TEXT, 
          status TEXT, 
          startDate TEXT, 
          endDate TEXT, 
          returnedAt TEXT, 
          cancelledAt TEXT, 
          expiredAt TEXT, 
          createdAt TEXT, 
          updatedAt TEXT, 
          FOREIGN KEY(author) REFERENCES Users(_id), 
          FOREIGN KEY(material) REFERENCES Materials(_id), 
          FOREIGN KEY(owner) REFERENCES Users(_id)
        )
    """);

    await db.execute("""
        CREATE TABLE Notifications
        (
          _id TEXT PRIMARY KEY, 
          title TEXT, 
          body TEXT, 
          type TEXT, 
          createdAt TEXT, 
          updatedAt TEXT
        )
    """);
  }
}
