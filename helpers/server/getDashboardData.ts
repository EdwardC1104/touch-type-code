import Database from "classes/server/Database";
import dayjs from "dayjs";
import averageList from "helpers/shared/averageList";
import round from "helpers/shared/round";
import calculateStreak from "./calculateStreak";

/**
 * Gathers all the data needed to display statistics on the dashboard page.
 * Then, performs the calculations needed to get useful values to show the user.
 */
const getDashboardData = async (userId: number) => {
  // Get the best result a user has achieved for each lesson
  const bestResults = await Database.getLessons(undefined, userId);

  // Get all the results a user has achieved
  const results = await Database.getResults(userId);

  // Get the average rating of the best results
  let averageRating = 0;
  let bestResultsCount = 0;
  for (const result of bestResults) {
    if (result.rating || result.rating === 0) {
      averageRating += result.rating;
      bestResultsCount += 1;
    }
  }
  // Prevent division by zero bug if the user has no results
  if (bestResultsCount > 0)
    averageRating = round(averageRating / bestResultsCount);

  // Get the average speed and accuracy from all their lessons
  // Also make a list of unique dates they have completed lessons on
  let numberCompleted = 0;
  const setOfLessonDates: Set<string> = new Set();
  const listOfSpeeds: number[] = [];
  const listOfAccuracies: number[] = [];
  const speedGraphData: {
    month: string;
    value: number;
    numberCompleted: number;
  }[] = [];
  const accuracyGraphData: {
    month: string;
    value: number;
    numberCompleted: number;
  }[] = [];
  for (const result of results) {
    if (result.dateStarted && result.wpm && result.accuracy) {
      numberCompleted += 1;
      // Cast to date and then back to string so that, for example, "2022/01/01" and "2022-01-01" are considered the same
      setOfLessonDates.add(new Date(result.dateStarted).toDateString());
      listOfSpeeds.push(result.wpm);
      listOfAccuracies.push(result.accuracy);

      const month = dayjs(result.dateStarted).format("MMM");

      if (month !== speedGraphData[speedGraphData.length - 1]?.month)
        speedGraphData.push({ month, value: result.wpm, numberCompleted: 1 });
      else {
        const { value, numberCompleted } = speedGraphData.pop()!;
        speedGraphData.push({
          month,
          value: round(
            (value * numberCompleted + result.wpm) / (numberCompleted + 1)
          ),
          numberCompleted: numberCompleted + 1,
        });
      }

      if (month !== accuracyGraphData[accuracyGraphData.length - 1]?.month)
        accuracyGraphData.push({
          month,
          value: result.accuracy * 100,
          numberCompleted: 1,
        });
      else {
        const { value, numberCompleted } = accuracyGraphData.pop()!;
        accuracyGraphData.push({
          month,
          value: round(
            (value * numberCompleted + result.accuracy * 100) /
              (numberCompleted + 1)
          ),
          numberCompleted: numberCompleted + 1,
        });
      }
    }
  }
  const daysActive = setOfLessonDates.size;
  const streak = calculateStreak(setOfLessonDates);
  const speed = averageList(listOfSpeeds, 3);
  const accuracy = averageList(listOfAccuracies, 3, 2);

  return {
    averageRating,
    numberCompleted,
    daysActive,
    streak,
    speed,
    accuracy,
    speedGraphData,
    accuracyGraphData,
  };
};

export default getDashboardData;
