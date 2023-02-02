import calculateStreak from "./calculateStreak";

const getDateStringForDaysAgo = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toDateString();
};

describe("calculateStreak", () => {
  it("should return 0 if no streak", () => {
    expect(calculateStreak(new Set())).toBe(0);
  });

  it("should return 1 if one streak", () => {
    const daysAgo = [0];
    const dates = daysAgo.map(getDateStringForDaysAgo);
    expect(calculateStreak(new Set(dates))).toBe(1);
  });

  it("should return 2 if two streak", () => {
    const daysAgo = [1, 0];
    const dates = daysAgo.map(getDateStringForDaysAgo);
    expect(calculateStreak(new Set(dates))).toBe(2);
  });

  it("should return 1 if two streak with a break", () => {
    const daysAgo = [2, 0];
    const dates = daysAgo.map(getDateStringForDaysAgo);
    expect(calculateStreak(new Set(dates))).toBe(1);
  });

  it("should return 2 if three streak with a break", () => {
    const daysAgo = [3, 1, 0];
    const dates = daysAgo.map(getDateStringForDaysAgo);
    expect(calculateStreak(new Set(dates))).toBe(2);
  });
});
