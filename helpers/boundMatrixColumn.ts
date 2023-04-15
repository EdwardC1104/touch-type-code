import {
  dotMultiply,
  flatten,
  index,
  Matrix,
  max,
  min,
  ones,
  range,
  subset,
  subtract,
  zeros,
} from "mathjs";

/**
 * Takes a matrix and a column index and returns a new matrix with the column bound between 0 and 1.
 * First, the minimum value in the column is subtracted from every value in the column.
 * Then, the maximum value in the column is divided by every value in the column.
 */
const boundMatrixColumn = (inputMatrix: Matrix, columnIndex: number) => {
  const numberOfRows = inputMatrix.size()[0];

  // Get the column to normalise
  const column = flatten(
    subset(inputMatrix, index(range(0, numberOfRows), columnIndex))
  );

  // Get the minimum and maximum values in the column
  const minimum = min(column);
  const maximum = max(column);

  // The indexes of every value in the column to bound
  const indexesToBound = index(range(0, numberOfRows), columnIndex);

  // Create a matrix that will be used to subtract the minimum value from the column in the input matrix (to make the minimum value 0)
  let adderMatrix = zeros(inputMatrix.size());
  const adderReplacement = Array(numberOfRows).fill(minimum);
  adderMatrix = subset(adderMatrix, indexesToBound, adderReplacement);

  // Subtract the minimum value from the column in input matrix
  const tempNormalisedMatrix = subtract(inputMatrix, adderMatrix);

  // Calculate the multiplier which will make the maximum value 1
  const boundMultiplier = 1 / (maximum - minimum);

  // Create a matrix that will be used to multiply the column in the input matrix (to make the maximum value 1)
  let multiplierMatrix = ones(inputMatrix.size());
  const multiplierReplacement = Array(numberOfRows).fill(boundMultiplier);
  multiplierMatrix = subset(
    multiplierMatrix,
    indexesToBound,
    multiplierReplacement
  );

  // Multiply input matrix by the multiplier matrix
  return dotMultiply(tempNormalisedMatrix, multiplierMatrix) as Matrix;
};

export default boundMatrixColumn;
