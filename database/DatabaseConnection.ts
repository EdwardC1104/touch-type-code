import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

sqlite3.verbose();

class DatabaseConnection {
  private db: Database<sqlite3.Database, sqlite3.Statement>;

  constructor() {
    this.openAndInitialise();
  }

  private async openAndInitialise() {
    this.db = await open({
      filename: "database/database.db",
      driver: sqlite3.Database,
    });

    await this.initialiseTables();
    await this.addDevCourses();
  }

  public close() {
    this.db.close();
  }

  private async initialiseTables() {
    await this.db.run(
      "CREATE TABLE IF NOT EXISTS users (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL,\
          username TEXT UNIQUE,\
          email TEXT NOT NULL,\
          passwordSalt TEXT,\
          passwordHash TEXT,\
          isSSO INTEGER NOT NULL\
        )"
    );

    await this.db.run(
      "CREATE TABLE IF NOT EXISTS courses (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL UNIQUE,\
          description TEXT NOT NULL,\
          image TEXT NOT NULL\
        )"
    );

    await this.db.run(
      "CREATE TABLE IF NOT EXISTS lessons (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL,\
          courseId INTEGER NOT NULL,\
          FOREIGN KEY (courseId) REFERENCES courses(id)\
        )"
    );

    await this.db.run(
      "CREATE TABLE IF NOT EXISTS users_courses (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          userID INTEGER NOT NULL,\
          courseId INTEGER NOT NULL,\
          FOREIGN KEY (userID) REFERENCES users(id),\
          FOREIGN KEY (courseId) REFERENCES courses(id)\
        )"
    );
  }

  private async addDevCourses() {
    try {
      const rows = await this.db.all("SELECT * FROM courses");

      if (rows.length === 0) {
        await this.addCourse({
          name: "JavaScript",
          description:
            "Master the use of curly braces as well as greater-than and less-than signs in this symbol-heavy language.",
          image: "/javascript.jpg",
        });
        await this.addCourse({
          name: "Python",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          image: "/python.png",
        });
        await this.addCourse({
          name: "Go",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          image: "/go.png",
        });
      }
    } catch (err) {
      if (err) return err;
    }
  }

  public addUser(user: UserData): Promise<UserData> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO users (name, username, email, passwordSalt, passwordHash, isSSO) VALUES ($name, $username, $email, $passwordSalt, $passwordHash, $isSSO)",
        {
          $name: user.name,
          $username: user.username,
          $email: user.email,
          $passwordSalt: user.passwordSalt,
          $passwordHash: user.passwordHash,
          $isSSO: user.isSSO,
        },
        (err) => {
          if (err) reject(err);
          resolve(user);
        }
      );
    });
  }

  public getUserById(id: number): Promise<UserData> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM users WHERE id = $id",
        { $id: id },
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });
  }

  public getCourses(): Promise<Course[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM courses", (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  public addCourse(course: CourseData): Promise<CourseData> {
    return new Promise((resolve, reject) => {
      const { name, description, image } = course;

      this.db.run(
        "INSERT INTO courses (name, description, image) VALUES (?, ?, ?)",
        [name, description, image],
        (err) => {
          if (err) reject(err);
          resolve(course);
        }
      );
    });
  }
}

export default DatabaseConnection;
