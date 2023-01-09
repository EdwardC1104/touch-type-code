import Database from "classes/server/Database";

const getBlankKeyboard = async () => {
  // Template matrix for the blank keyboard
  const keyboard: Array<Key | null>[] = [...Array(5)].map(() =>
    [...Array(14)].map(() => null)
  );

  const characters = await Database.getCharacters();

  // Don't show hidden characters (lowercase letters) on the keyboard
  const visible = characters.filter((character) => character.isHidden === 0);

  visible.forEach((character) => {
    const {
      keyboardRow,
      keyboardColumn,
      symbol,
      keyTextPosition,
      usesSpecialEnterShape,
    } = character;

    const existingTopCharacter =
      keyboard[keyboardRow][keyboardColumn]?.topCharacter || "";
    const existingBottomCharacter =
      keyboard[keyboardRow][keyboardColumn]?.topCharacter || "";
    keyboard[keyboardRow][keyboardColumn] = {
      topCharacter: keyTextPosition === "top" ? symbol : existingTopCharacter,
      bottomCharacter:
        keyTextPosition === "bottom" ? symbol : existingBottomCharacter,
      widthMultipler: character.keyWidthMultipler,
      specialEnter: usesSpecialEnterShape,
    };
  });

  return keyboard.map((row) => row.filter((key) => key !== null));
};

export default getBlankKeyboard;
