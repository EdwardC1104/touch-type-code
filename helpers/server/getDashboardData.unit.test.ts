import getDashboardData from "./getDashboardData";
import Database from "classes/server/Database";

describe("getDashboardData", () => {
  it("should return the correct data", async () => {
    const results = [
      {
        dateStarted: "2021-01-01",
        wpm: 100,
        accuracy: 0.9,
        rating: 4,
      },
      {
        dateStarted: "2021-01-01",
        wpm: 200,
        accuracy: 0.8,
        rating: 5,
      },
      {
        dateStarted: "2021-01-02",
        wpm: 300,
        accuracy: 0.7,
        rating: 5,
      },
    ];

    const bestResults = [
      {
        dateStarted: "2021-01-01",
        wpm: 200,
        accuracy: 0.8,
        rating: 5,
      },
      {
        dateStarted: "2021-01-02",
        wpm: 300,
        accuracy: 0.7,
        rating: 5,
      },
    ];

    jest.mock("classes/server/Database");
    Database.getLessons = jest.fn().mockReturnValue(results);
    Database.getResults = jest.fn().mockReturnValue(bestResults);

    await expect(getDashboardData(2)).resolves.toEqual({
      averageRating: 5,
      numberCompleted: 2,
      daysActive: 2,
      streak: 0,
      speed: 250,
      accuracy: 0.75,
      speedGraphData: [{ month: "Jan", value: 250, numberCompleted: 2 }],
      accuracyGraphData: [{ month: "Jan", value: 75, numberCompleted: 2 }],
    });
  });

  it("should return the correct data when there are no results", async () => {
    const results: Lesson[] = [];

    const bestResults: Lesson[] = [];

    jest.mock("classes/server/Database");
    Database.getLessons = jest.fn().mockReturnValue(results);
    Database.getResults = jest.fn().mockReturnValue(bestResults);

    await expect(getDashboardData(2)).resolves.toEqual({
      averageRating: 0,
      numberCompleted: 0,
      daysActive: 0,
      streak: 0,
      speed: 0,
      accuracy: 0,
      speedGraphData: [],
      accuracyGraphData: [],
    });
  });
});
