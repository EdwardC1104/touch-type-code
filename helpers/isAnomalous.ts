/**
 * Returns true if the value is more than 3 standard deviations from the mean
 */
const isAnomalous = (
  value: number,
  mean: number,
  standardDeviation: number
) => {
  return (
    value > mean + standardDeviation * 3 || value < mean - standardDeviation * 3
  );
};

export default isAnomalous;
