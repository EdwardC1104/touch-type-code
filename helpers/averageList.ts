import round from "./round";

/**
 * Returns the average of the last `numberToAverage` items in `list`.
 * If `numberToAverage` is 0, it will average all items in `list`.
 * If `list` is empty, it will return 0.
 * The average is rounded to `decimalPlaces` decimal places.
 */
const averageList = (
  list: number[],
  numberToAverage: number = 0,
  decimalPlaces: number = 0
) => {
  if (list.length === 0) return 0;

  const values = list.slice(-numberToAverage);
  const total = values.reduce((a, b) => a + b, 0);
  return round(total / values.length, decimalPlaces);
};

export default averageList;
