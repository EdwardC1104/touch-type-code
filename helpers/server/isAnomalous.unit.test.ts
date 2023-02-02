import isAnomalous from "./isAnomalous";

describe("isAnomalous", () => {
  it("should return true if the number is anomalous", () => {
    const result = isAnomalous(100, 5, 5);
    expect(result).toBe(true);
  });

  it("should return false if the number is not anomalous", () => {
    const result = isAnomalous(10, 5, 5);
    expect(result).toBe(false);
  });
});
