const RED = "#B91212";
const ORANGE = "#FF5800";
const GREEN = "#2EA851";

const addColorsToKeyboardLayout = (
  keyboardLayout: Key[][],
  greenKeys?: Array<string | undefined>,
  orangeKeys?: Array<string | undefined>,
  redKeys?: Array<string | undefined>
) => {
  // Clone the keyboard layout so we don't mutate the original
  const newLayout = keyboardLayout.map((row) => [
    ...row.map((key) => ({ ...key })),
  ]);

  for (const row of newLayout) {
    for (const key of row) {
      if (redKeys?.includes(key.bottomCharacter)) key.color = RED;
      else if (orangeKeys?.includes(key.bottomCharacter)) key.color = ORANGE;
      else if (greenKeys?.includes(key.bottomCharacter)) key.color = GREEN;

      if (redKeys?.includes(key.topCharacter)) key.color = RED;
      else if (orangeKeys?.includes(key.topCharacter)) key.color = ORANGE;
      else if (greenKeys?.includes(key.topCharacter)) key.color = GREEN;
    }
  }

  return newLayout;
};

export default addColorsToKeyboardLayout;
