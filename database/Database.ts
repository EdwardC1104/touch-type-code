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
      "CREATE TABLE IF NOT EXISTS user (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL,\
          username TEXT NOT NULL UNIQUE,\
          email TEXT NOT NULL,\
          passwordSalt TEXT NOT NULL,\
          passwordHash TEXT NOT NULL\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS course (\
          name TEXT PRIMARY KEY,\
          description TEXT NOT NULL,\
          image TEXT NOT NULL\
        )"
    );

    // The lesson name and courseName form a composite primary key.
    await db.run(
      "CREATE TABLE IF NOT EXISTS lesson (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          name TEXT NOT NULL,\
          description TEXT NOT NULL,\
          courseName TEXT NOT NULL,\
          background TEXT NOT NULL,\
          content TEXT NOT NULL,\
          FOREIGN KEY (courseName) REFERENCES course(name)\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS user_course (\
          dateStarted TEXT NOT NULL,\
          userId INTEGER NOT NULL,\
          courseName TEXT NOT NULL,\
          FOREIGN KEY (userID) REFERENCES user(id),\
          FOREIGN KEY (courseName) REFERENCES course(name),\
          PRIMARY Key (userId, courseName)\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS user_lesson (\
          dateStarted TEXT NOT NULL,\
          userId INTEGER NOT NULL,\
          lessonId INTEGER NOT NULL,\
          rating INTEGER NOT NULL,\
          wps INTEGER NOT NULL,\
          accuracy REAL NOT NULL,\
          FOREIGN KEY (userID) REFERENCES user(id),\
          FOREIGN KEY (lessonId) REFERENCES lesson(id),\
          PRIMARY Key (userId, lessonId)\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS character (\
          symbol TEXT PRIMARY KEY\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS user_character (\
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          timesCorrect INTEGER NOT NULL,\
          timesIncorrect INTEGER NOT NULL,\
          averageTimeToType REAL NOT NULL,\
          userId INTEGER NOT NULL,\
          characterSymbol TEXT NOT NULL,\
          FOREIGN KEY (userID) REFERENCES user(id),\
          FOREIGN KEY (characterSymbol) REFERENCES character(symbol)\
        )"
    );
  }

  /**
   * Creates a new user in the database and returns the user's data.
   */
  public static async addUser(user: UserData): Promise<UserData> {
    const db = await this.open();

    await db.run(
      "INSERT INTO user (name, username, email, passwordSalt, passwordHash) VALUES ($name, $username, $email, $passwordSalt, $passwordHash)",
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

    await db.run("DELETE FROM user WHERE id = $id", {
      $id: id,
    });

    await this.close(db);
  }

  /**
   * Returns a given user found by their id.
   */
  public static async getUserById(id: number): Promise<User> {
    const db = await this.open();

    const row = await db.get("SELECT * FROM user WHERE id = $id", {
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

    const row = await db.get("SELECT * FROM user WHERE username = $username", {
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

    const rows = await db.all("SELECT * FROM course");
    return rows;
  }

  /**
   * Creates a new course in the database and returns the course's data.
   */
  public static async addCourse(course: Course): Promise<Course> {
    const db = await this.open();

    const { name, description, image } = course;

    await db.run(
      "INSERT INTO course (name, description, image) VALUES (?, ?, ?)",
      [name, description, image]
    );

    await this.close(db);

    return course;
  }

  /**
   * Returns all the lessons in the database.
   */
  public static async getLessons(
    courseName?: string,
    userId?: number
  ): Promise<Lesson[]> {
    const db = await this.open();

    // Gets all the lessons with the given course name and the user's progress on them.
    if (courseName && userId)
      return await db.all(
        "SELECT *\
        FROM lesson\
        LEFT JOIN user_lesson\
        ON lesson.id = user_lesson.lessonId\
        AND user_lesson.userId = $userId\
        WHERE courseName = $courseName",
        {
          $userId: userId,
          $courseName: courseName,
        }
      );

    // Gets all the lessons with the user's progress on them.
    if (userId)
      return await db.all(
        "SELECT *\
        FROM lesson\
        LEFT JOIN user_lesson\
        ON lesson.id = user_lesson.lessonId\
        AND user_lesson.userId = $userId",
        {
          $userId: userId,
        }
      );

    // Gets all the lessons with the given course name.
    if (courseName)
      return await db.all(
        "SELECT * FROM lesson WHERE courseName = $courseName",
        {
          $courseName: courseName,
        }
      );

    // Gets all the lessons.
    return await db.all("SELECT * FROM lesson");
  }

  /**
   * Creates a new lesson in the database and returns the lesson's data.
   */
  public static async addLesson(lesson: LessonData): Promise<LessonData> {
    const db = await this.open();

    const { name, background, content, courseName, description } = lesson;

    await db.run(
      "INSERT INTO lesson (name, background, content, courseName, description) VALUES ($name, $background, $content, $courseName, $description)",
      {
        $name: name,
        $background: background,
        $content: content,
        $courseName: courseName,
        $description: description,
      }
    );

    await this.close(db);

    return lesson;
  }
}

export default Database;
