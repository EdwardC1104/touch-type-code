import getBlankKeyboard from "helpers/server/getBlankKeyboard";
import addColorsToKeyboardLayout from "./addColorsToKeyboardLayout";

describe("addColorsToKeyboardLayout", () => {
  it("should return a keyboard layout with the correct colors", async () => {
    expect.assertions(9);

    const keyboard = await getBlankKeyboard();
    const greenKeys = ["A", "B", ";"];
    const orangeKeys = ["D", "E", "["];
    const redKeys = ["G", "H", "'"];

    const coloredKeyboard = addColorsToKeyboardLayout(
      keyboard,
      greenKeys,
      orangeKeys,
      redKeys
    );

    coloredKeyboard.forEach((row) => {
      row.forEach((key) => {
        if (greenKeys.includes(key.topCharacter))
          expect(key.color).toBe("#2EA851");
        else if (orangeKeys.includes(key.topCharacter))
          expect(key.color).toBe("#FF5800");
        else if (redKeys.includes(key.topCharacter))
          expect(key.color).toBe("#B91212");
        else if (greenKeys.includes(key.bottomCharacter))
          expect(key.color).toBe("#2EA851");
        else if (orangeKeys.includes(key.bottomCharacter))
          expect(key.color).toBe("#FF5800");
        else if (redKeys.includes(key.bottomCharacter))
          expect(key.color).toBe("#B91212");
      });
    });
  });
});
