/**
 * Rounds a number to a given number of decimal places.
 * The default is 0 decimal places.
 * There is no native JavaScript function for this.
 */
const round = (value: number, precision: number = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

export default round;
