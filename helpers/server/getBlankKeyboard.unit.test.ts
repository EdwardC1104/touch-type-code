import getBlankKeyboard from "./getBlankKeyboard";

describe("getBlankKeyboard", () => {
  it("should return a keyboard", async () => {
    expect(getBlankKeyboard()).resolves.toBeDefined();
  });

  it("should not have colors on any keys", async () => {
    const keyboard = await getBlankKeyboard();
    keyboard.forEach((row) => {
      row.forEach((key) => {
        expect(key.color).toBeUndefined();
      });
    });
  });
});
