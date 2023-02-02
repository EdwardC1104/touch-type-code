import round from "./round";

describe("round", () => {
  it("should round a number to the nearest integer by default", () => {
    expect(round(1.5)).toBe(2);
  });

  it("should round to n decimal places when n is passed as a parameter", () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2345, 3)).toBe(1.235);
    expect(round(1.2345, 4)).toBe(1.2345);
  });
});
