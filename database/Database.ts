import sqlite3 from "sqlite3";
import sqlite, { open } from "sqlite";

sqlite3.verbose();

class Database {
  /**
   * Opens a connection to the database.
   * @returns The database connection.
   */
  private static async open() {
    const db = await open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    await this.initialiseTables(db);

    return db;
  }

  /**
   * Closes the database connection.
   */
  private static async close(
    db: sqlite.Database<sqlite3.Database, sqlite3.Statement>
  ) {
    await db.close();
  }

  /**
   * Creates the tables if they don't exist.
   */
  private static async initialiseTables(
    db: sqlite.Database<sqlite3.Database, sqlite3.Statement>
  ) {
    await db.run(
      "CREATE TABLE IF NOT EXISTS users (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL,\
          username TEXT NOT NULL UNIQUE,\
          email TEXT NOT NULL,\
          passwordSalt TEXT NOT NULL,\
          passwordHash TEXT NOT NULL\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS courses (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL UNIQUE,\
          description TEXT NOT NULL,\
          image TEXT NOT NULL\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS lessons (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL,\
          courseId INTEGER NOT NULL,\
          FOREIGN KEY (courseId) REFERENCES courses(id)\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS users_courses (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          userID INTEGER NOT NULL,\
          courseId INTEGER NOT NULL,\
          FOREIGN KEY (userID) REFERENCES users(id),\
          FOREIGN KEY (courseId) REFERENCES courses(id)\
        )"
    );
  }

  /**
   * Creates a new user in the database and returns the user's data.
   */
  public static async addUser(user: UserData): Promise<UserData> {
    const db = await this.open();

    await db.run(
      "INSERT INTO users (name, username, email, passwordSalt, passwordHash) VALUES ($name, $username, $email, $passwordSalt, $passwordHash)",
      {
        $name: user.name,
        $username: user.username,
        $email: user.email,
        $passwordSalt: user.passwordSalt,
        $passwordHash: user.passwordHash,
      }
    );

    await this.close(db);

    return user;
  }

  /**
   * Deletes a user from the database by their id.
   */
  public static async deleteUser(id: number): Promise<void> {
    const db = await this.open();

    await db.run("DELETE FROM users WHERE id = $id", {
      $id: id,
    });

    await this.close(db);
  }

  /**
   * Returns a given user found by their id.
   */
  public static async getUserById(id: number): Promise<User> {
    const db = await this.open();

    const row = await db.get("SELECT * FROM users WHERE id = $id", {
      $id: id,
    });

    await this.close(db);

    return row;
  }

  /**
   * Returns a given user found by their username.
   */
  public static async getUserByUsername(username: string): Promise<User> {
    const db = await this.open();

    const row = await db.get("SELECT * FROM users WHERE username = $username", {
      $username: username,
    });

    await this.close(db);

    return row;
  }

  /**
   * Returns all the courses in the database.
   */
  public static async getCourses(): Promise<Course[]> {
    const db = await this.open();

    const rows = await db.all("SELECT * FROM courses");
    return rows;
  }

  /**
   * Creates a new course in the database and returns the course's data.
   */
  public static async addCourse(course: CourseData): Promise<CourseData> {
    const db = await this.open();

    const { name, description, image } = course;

    await db.run(
      "INSERT INTO courses (name, description, image) VALUES (?, ?, ?)",
      [name, description, image]
    );

    await this.close(db);

    return course;
  }
}

export default Database;
