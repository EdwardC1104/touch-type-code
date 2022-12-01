import Database from "classes/Database";

const getBlankKeyboard = async () => {
  const keyboard: Array<Key | null>[] = [...Array(5)].map(() =>
    [...Array(14)].map(() => null)
  );

  const characters = await Database.getCharacters();

  characters.forEach((character) => {
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
