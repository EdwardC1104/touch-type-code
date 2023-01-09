import Database from "classes/Database";
import getBlankKeyboard from "./getBlankKeyboard";
import {
  matrix,
  std as calcStandardDeviation,
  index,
  subset,
  range,
  mean,
  filter,
  flatten,
  Matrix,
  max,
  min,
  reshape,
  ones,
  dotMultiply,
  zeros,
  subtract,
  add,
  dotDivide,
  concat,
} from "mathjs";
import dayjs from "dayjs";

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

const generateKeyboardHeatmap = async (userId: number) => {
  // Database query to get all keys a user has ever typed
  const keys = await Database.getKeysForEveryLesson(userId);

  if (keys.length === 0) return await getBlankKeyboard();

  // Create a dictionary to map the index of the key to the character symbol (needed because a matrix can only contain numbers and not strings)
  const codeToSymbolDict: { [key: number]: string } = {};

  const keys2DArray = keys.map((key, index): number[] => {
    // Add the symbol to the dictionary
    codeToSymbolDict[index] = key.symbol;

    // Calculate the number of days ago the key was typed
    const today = dayjs();
    const dayKeyWasTyped = dayjs(key.dateStarted);
    const daysAgo = today.diff(dayKeyWasTyped, "day");

    return [
      index,
      key.timesCorrect,
      key.timesIncorrect,
      key.averageTimeToType,
      daysAgo,
    ];
  });

  // Create a matrix from the 2D array
  const keysMatrix = matrix(keys2DArray);

  // ------------------ Anomaly detection ------------------

  // Create a subset of the matrix that only contains the times to type
  const numberOfKeys = keysMatrix.size()[0];
  const timesToType = flatten(
    subset(keysMatrix, index(range(0, numberOfKeys), 3))
  );

  // Calculate the mean and standard deviation of the times to type
  const meanTime: number = mean(timesToType);
  const standardDeviation = calcStandardDeviation(
    timesToType
  ) as unknown as number; // mathjs types are wrong - the correct type is "number | number[]"

  // A list of the indexes of the keys to filter out
  const indexOfKeysToFilter: number[] = [];

  // Loop through the keys and check if they are anomalous
  keysMatrix.forEach((value, index) => {
    const indexArray = index as number | number[] as number[]; // mathjs types are wrong - the correct type is "number | number[]"

    // Check the value is a time to type and is anomalous
    if (indexArray[1] === 3 && isAnomalous(value, meanTime, standardDeviation))
      indexOfKeysToFilter.push(indexArray[0]);
  });

  // Matrix must be flattened to use the filter function
  const keysMatrixFlat = flatten(keysMatrix);

  // Filter out the keys that are anomalous (index is in the list of anomalous keys)
  const filteredKeys = filter(keysMatrixFlat, (_, index) => {
    const keyNumber = Math.floor(index / 5);
    return !indexOfKeysToFilter.includes(keyNumber);
  }) as Matrix;

  // Reshape the matrix back to the correct shape (5 columns)
  const filteredKeysMatrix = reshape(filteredKeys, [
    filteredKeys.size()[0] / 5,
    5,
  ]);

  // ----------------- Data normalisation -----------------

  // Normalise the times to type column so that every value is between 0 and 1 (fastest time is 0, slowest time is 1)
  const normalisedKeysMatrix = boundMatrixColumn(filteredKeysMatrix, 3);

  // ----------------- Calculate the skill score for each time the key was pressed in a lesson -----------------

  const numberOfFilteredKeys = normalisedKeysMatrix.size()[0];

  // Gets the time column from the matrix
  const normalisedTimeToTypeColumn = flatten(
    subset(normalisedKeysMatrix, index(range(0, numberOfFilteredKeys), 3))
  );

  // Get the "number of times correct" and "number of times incorrect" columns from the matrix
  const timesCorrectColumn = flatten(
    subset(normalisedKeysMatrix, index(range(0, numberOfFilteredKeys), 1))
  );
  const timesIncorrectColumn = flatten(
    subset(normalisedKeysMatrix, index(range(0, numberOfFilteredKeys), 2))
  );

  // accuracy = timesCorrect / (timesCorrect + timesIncorrect)
  const accuracyMatrix = dotDivide(
    timesCorrectColumn,
    add(timesCorrectColumn, timesIncorrectColumn)
  );

  // skillScore = (accuracy + (1 - timeToType)) / 2
  // timeToType is subtracted from 1 because the fastest time is 0 and the slowest time is 1 (so this makes the fastest time 1 and the slowest time 0)
  let skillScoreMatrix = add(
    accuracyMatrix,
    subtract(1, normalisedTimeToTypeColumn)
  ) as Matrix;
  skillScoreMatrix = dotMultiply(skillScoreMatrix, 0.5) as Matrix;

  // Gets the symbol id column from the matrix
  const symbolIdColumn = flatten(
    subset(normalisedKeysMatrix, index(range(0, numberOfFilteredKeys), 0))
  );

  // Create a matrix that contains the symbol id skill score: [[symbolId, skillScore]]
  const symbolIdAndScoreMatrix = concat(
    symbolIdColumn.resize([numberOfFilteredKeys, 1]),
    skillScoreMatrix.resize([numberOfFilteredKeys, 1]),
    1
  ) as Matrix;

  // ----------------- Calculate the average skill score for each symbol -----------------

  const symbolToAverageScoreDict: {
    [key: string]: { count: number; average: number };
  } = {};

  // Loop through the symbol id and skill score matrix and calculate the average skill score for each symbol
  symbolIdAndScoreMatrix.forEach((value, index, matrix) => {
    const indexArray = index as number | number[] as number[]; // mathjs types are wrong - the correct type is "number | number[]"

    // If the index is 0, then the value is a symbol id
    if (indexArray[1] === 0) {
      const symbol = codeToSymbolDict[value];
      // If the symbol is not in the dictionary, add it
      if (!symbolToAverageScoreDict[symbol])
        symbolToAverageScoreDict[symbol] = { count: 0, average: 0 };

      // If the index is 1, then the value is a skill score
    } else {
      const symbolId = matrix.get([indexArray[0], 0]);
      const symbol = codeToSymbolDict[symbolId];

      // Calculate the new average skill score
      const currentAverage = symbolToAverageScoreDict[symbol].average;
      const currentCount = symbolToAverageScoreDict[symbol].count;
      const newAverage =
        (currentAverage * currentCount + value) / (currentCount + 1);

      // Update the dictionary
      symbolToAverageScoreDict[symbol].average = newAverage;
      symbolToAverageScoreDict[symbol].count += 1;
    }
  });

  // ----------------- Create the keyboard -----------------

  const symbolToColorDict: { [key: string]: string } = {};

  // Convert the average skill score to a color
  Object.entries(symbolToAverageScoreDict).forEach(([symbol, { average }]) => {
    if (average > 0.8) symbolToColorDict[symbol] = "GREEN";
    else if (average > 0.6) symbolToColorDict[symbol] = "ORANGE";
    else symbolToColorDict[symbol] = "RED";
  });

  console.log(symbolToColorDict);

  // Get the blank keyboard
  const keyboard = await getBlankKeyboard();

  // Add the color to the keyboard
  const coloredKeyboard = keyboard.map((row) => {
    return row.map((key) => {
      if (key === null) return null;

      const { topCharacter, bottomCharacter } = key;

      // If the top character is in the dictionary, return the key with the color
      if (symbolToColorDict[topCharacter])
        return {
          ...key,
          color: symbolToColorDict[topCharacter],
        };
      // If the bottom character is in the dictionary, return the key with the color
      else if (symbolToColorDict[bottomCharacter])
        return {
          ...key,
          color: symbolToColorDict[bottomCharacter],
        };
      // If the key is not in the dictionary, return the key without a color
      else return key;
    });
  });

  return coloredKeyboard;
};

export default generateKeyboardHeatmap;