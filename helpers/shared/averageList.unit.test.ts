import averageList from "./averageList";

describe("averageList", () => {
  it("should return 0 if no values are provided", () => {
    expect(averageList([])).toBe(0);
  });

  it("should return the average of all values", () => {
    expect(averageList([1, 2, 3])).toBe(2);
  });

  it("should return the average of the last n values", () => {
    expect(averageList([1, 2, 3, 4, 5], 3)).toBe(4);
  });

  it("should round the average to the specified number of decimal places", () => {
    expect(averageList([3, 4, 3], 3, 2)).toBe(3.33);
  });
});
