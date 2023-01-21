import Database from "classes/server/Database";
import dayjs from "dayjs";
import round from "helpers/shared/round";

const getStreak = (set: Set<string>) => {
  const sortedDates = Array.from(set);

  let count = 0;
  sortedDates.reverse().forEach((date: string, index) => {
    const thisDate = dayjs(date).startOf("day");
    const today = dayjs().startOf("day");
    const pastDate = today.subtract(index, "day");

    if (pastDate.isSame(thisDate)) count += 1;
  });
  return count;
};

const average = (
  list: number[],
  numberToAverage: number = 0,
  precision: number = 0
) => {
  const speeds = list.slice(-numberToAverage);
  const total = speeds.reduce((a, b) => a + b, 0);
  return round(total / speeds.length, precision);
};

const getDashboardData = async (userId: number) => {
  const bestResults = await Database.getLessons(undefined, userId);
  const results = await Database.getResults(userId);

  let averageRating = 0;
  let bestResultsCount = 0;
  for (const result of bestResults) {
    if (result.rating || result.rating === 0) {
      averageRating += result.rating;
      bestResultsCount += 1;
    }
  }
  averageRating = round(averageRating / bestResultsCount);

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
  const streak = getStreak(setOfLessonDates);
  const speed = average(listOfSpeeds, 3);
  const accuracy = average(listOfAccuracies, 3, 2);

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
