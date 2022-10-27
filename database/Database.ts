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
      "CREATE TABLE IF NOT EXISTS userTbl (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT NOT NULL,\
        username TEXT NOT NULL UNIQUE,\
        email TEXT NOT NULL UNIQUE,\
        passwordSalt TEXT NOT NULL,\
        passwordHash TEXT NOT NULL\
      );"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS courseTbl (\
        name TEXT PRIMARY KEY,\
        description TEXT NOT NULL,\
        image TEXT NOT NULL\
      );"
    );

    // The lesson name and courseName form a composite primary key.
    await db.run(
      "CREATE TABLE IF NOT EXISTS lessonTbl (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT NOT NULL,\
        description TEXT NOT NULL,\
        courseName TEXT NOT NULL,\
        background TEXT NOT NULL,\
        content TEXT NOT NULL,\
        FOREIGN KEY (courseName) REFERENCES courseTbl(name),\
        UNIQUE(name, courseName)\
      );"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS userCourseTbl (\
        dateStarted TEXT NOT NULL,\
        userId INTEGER NOT NULL,\
        courseName TEXT NOT NULL,\
        FOREIGN KEY (userId) REFERENCES userTbl(id),\
        FOREIGN KEY (courseName) REFERENCES courseTbl(name),\
        PRIMARY KEY (userId, courseName)\
      );"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS userLessonTbl (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        dateStarted TEXT NOT NULL,\
        userId INTEGER NOT NULL,\
        lessonId INTEGER NOT NULL,\
        rating INTEGER NOT NULL,\
        wpm INTEGER NOT NULL,\
        accuracy REAL NOT NULL,\
        FOREIGN KEY (userId) REFERENCES userTbl(id),\
        FOREIGN KEY (lessonId) REFERENCES lessonTbl(id)\
      );"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS characterTbl (\
          symbol TEXT PRIMARY KEY\
        )"
    );

    await db.run(
      "CREATE TABLE IF NOT EXISTS userCharacterTbl (\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        timesCorrect INTEGER NOT NULL,\
        timesIncorrect INTEGER NOT NULL,\
        averageTimeToType REAL NOT NULL,\
        userId INTEGER NOT NULL,\
        characterSymbol TEXT NOT NULL,\
        FOREIGN KEY (userId) REFERENCES userTbl(id),\
        FOREIGN KEY (characterSymbol) REFERENCES characterTbl(symbol)\
      );"
    );
  }

  /**
   * Creates a new user in the database and returns the user's data.
   */
  public static async addUser(user: UserData): Promise<UserData> {
    const db = await this.open();

    await db.run(
      "INSERT INTO userTbl (name, username, email, passwordSalt, passwordHash) VALUES ($name, $username, $email, $passwordSalt, $passwordHash)",
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

    await db.run("DELETE FROM userTbl WHERE id = $id", {
      $id: id,
    });

    await this.close(db);
  }

  /**
   * Returns a given user found by their id.
   */
  public static async getUserById(id: number): Promise<User> {
    const db = await this.open();

    const row = await db.get("SELECT * FROM userTbl WHERE id = $id", {
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

    const row = await db.get(
      "SELECT * FROM userTbl WHERE username = $username",
      {
        $username: username,
      }
    );

    await this.close(db);

    return row;
  }

  /**
   * Returns all the courses in the database.
   */
  public static async getCourses(): Promise<Course[]> {
    const db = await this.open();

    const rows = await db.all("SELECT * FROM courseTbl");
    return rows;
  }

  /**
   * Creates a new course in the database and returns the course's data.
   */
  public static async addCourse(course: Course): Promise<Course> {
    const db = await this.open();

    const { name, description, image } = course;

    await db.run(
      "INSERT INTO courseTbl (name, description, image) VALUES (?, ?, ?)",
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
        FROM  (\
          SELECT *\
          FROM  (\
            SELECT *\
            FROM lessonTbl\
            LEFT JOIN userLessonTbl\
            ON lessonTbl.id = userLessonTbl.lessonId\
            AND userLessonTbl.userId = $userId\
            WHERE courseName = $courseName\
            ORDER BY userLessonTbl.rating DESC\
          )\
          GROUP BY lessonId\
        )\
        ORDER BY name ASC",
        {
          $userId: userId,
          $courseName: courseName,
        }
      );

    // Gets all the lessons with the user's progress on them.
    if (userId)
      return await db.all(
        "SELECT *\
        FROM  (\
          SELECT *\
          FROM  (\
            SELECT *\
            FROM lessonTbl\
            LEFT JOIN userLessonTbl\
            ON lessonTbl.id = userLessonTbl.lessonId\
            AND userLessonTbl.userId = $userId\
            ORDER BY userLessonTbl.rating DESC\
          )\
          GROUP BY lessonId\
        )\
        ORDER BY name ASC",
        {
          $userId: userId,
        }
      );

    // Gets all the lessons with the given course name.
    if (courseName)
      return await db.all(
        "SELECT * FROM lessonTbl WHERE courseName = $courseName",
        {
          $courseName: courseName,
        }
      );

    // Gets all the lessons.
    return await db.all("SELECT * FROM lessonTbl");
  }

  public static async getResults(userId: number): Promise<Lesson[]> {
    const db = await this.open();

    const results = await db.all(
      "SELECT * FROM userLessonTbl WHERE userId = $userId",
      {
        $userId: userId,
      }
    );

    await this.close(db);

    results.sort(
      (a, b) =>
        new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime()
    );

    return results;
  }

  /**
   * Gets the specified lesson from the database by using the unique combination of course name and lesson name.
   */
  public static async getLesson(
    courseName: string,
    lessonName: string
  ): Promise<Lesson[] | undefined> {
    const db = await this.open();

    return await db.get(
      "SELECT * FROM lessonTbl WHERE courseName = $courseName AND name = $lessonName",
      {
        $courseName: courseName,
        $lessonName: lessonName,
      }
    );
  }

  /**
   * Creates a new lesson in the database and returns the lesson's data.
   */
  public static async addLesson(lesson: LessonData): Promise<LessonData> {
    const db = await this.open();

    const { name, background, content, courseName, description } = lesson;

    await db.run(
      "INSERT INTO lessonTbl (name, background, content, courseName, description) VALUES ($name, $background, $content, $courseName, $description)",
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

  public static async addLessonResult(
    userId: number,
    lessonId: number,
    rating: number,
    wpm: number,
    accuracy: number,
    dateStarted: string,
    correctKeys: string[],
    incorrectKeys: string[]
  ) {
    const db = await this.open();

    await db.run(
      "INSERT INTO userLessonTbl (userId, lessonId, rating, wpm, accuracy, dateStarted) VALUES ($userId, $lessonId, $rating, $wpm, $accuracy, $dateStarted)",
      {
        $userId: userId,
        $lessonId: lessonId,
        $rating: rating,
        $wpm: wpm,
        $accuracy: accuracy,
        $dateStarted: dateStarted,
      }
    );

    await this.close(db);
  }
}

export default Database;
