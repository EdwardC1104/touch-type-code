import boundMatrixColumn from "./boundMatrixColumn";
import { matrix } from "mathjs";

describe("boundMatrixColumn", () => {
  it("should bound the selected column between its min/max and 0/1", () => {
    const originalMatrix = matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const column = 1;

    const expected = [
      [1, 0, 3],
      [4, 0.5, 6],
      [7, 1, 9],
    ];

    expect(boundMatrixColumn(originalMatrix, column).toArray()).toEqual(
      expected
    );
  });
});
