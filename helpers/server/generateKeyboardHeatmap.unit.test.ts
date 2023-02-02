import Database from "classes/server/Database";
import generateKeyboardHeatmap from "./generateKeyboardHeatmap";
import getBlankKeyboard from "./getBlankKeyboard";

describe("generateKeyboardHeatmap", () => {
  it("returns a blank keyboard if no data is received from the database", async () => {
    const expected = await getBlankKeyboard();
    const userID = 2;

    jest.mock("classes/server/Database");
    Database.getKeysForEveryLesson = jest.fn().mockReturnValue([]);

    await expect(generateKeyboardHeatmap(userID)).resolves.toEqual(expected);
  });

  it("returns a keyboard with the correct key colors", async () => {
    const userID = 2;

    jest.mock("classes/server/Database");
    Database.getKeysForEveryLesson = jest.fn().mockReturnValue([
      {
        symbol: "A",
        timesCorrect: 1,
        timesIncorrect: 0,
        averageTimeToType: 400,
        dateStarted: "2021-01-01",
      },
      {
        symbol: "B",
        timesCorrect: 1,
        timesIncorrect: 0,
        averageTimeToType: 200,
        dateStarted: "2021-01-01",
      },
      {
        symbol: "C",
        timesCorrect: 1,
        timesIncorrect: 0,
        averageTimeToType: 300,
        dateStarted: "2021-01-01",
      },
    ]);

    const keyboard = await getBlankKeyboard();
    for (const row of keyboard) {
      for (const key of row) {
        if (key.topCharacter === "A") key.color = "RED";
        if (key.topCharacter === "B") key.color = "GREEN";
        if (key.topCharacter === "C") key.color = "ORANGE";
      }
    }

    await expect(generateKeyboardHeatmap(userID)).resolves.toEqual(keyboard);
  });
});
