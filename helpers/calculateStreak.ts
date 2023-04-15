import dayjs from "dayjs";

type DateString = string;

/**
 * Calculates the streak of a user based on the dates they have completed a lesson.
 */
const calculateStreak = (set: Set<DateString>) => {
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

export default calculateStreak;
