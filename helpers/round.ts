/**
 * Rounds a number to a given number of decimal places.
 * The default is 0 decimal places.
 * There is no native JavaScript function for this.
 */
const round = (value: number, decimalPlaces: number = 0) => {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
};

export default round;
