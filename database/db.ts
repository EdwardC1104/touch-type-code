import sqlite3 from "sqlite3";

sqlite3.verbose();

const openDb = (): sqlite3.Database => {
  const db = new sqlite3.Database("database/database.db");

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS users (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name TEXT NOT NULL,\
    username TEXT NOT NULL,\
    email TEXT NOT NULL,\
    passwordSalt TEXT NOT NULL,\
    passwordHash TEXT NOT NULL,\
    isSSO INTEGER NOT NULL\
  )"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS courses (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name TEXT NOT NULL\
  )"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS lessons (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name TEXT NOT NULL,\
    courseId INTEGER NOT NULL,\
    FOREIGN KEY (courseId) REFERENCES courses(id)\
  )"
    );
  });

  return db;
};
const closeDb = (db: sqlite3.Database) => db.close();

export { openDb, closeDb };
