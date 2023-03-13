import Database from "classes/server/Database";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Get extra letter data
 * @method GET
 */
const getExtraLetterData = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Invalid request method" });
    return;
  }

  const { letterUnicode } = req.query;
  if (typeof letterUnicode !== "string" || !letterUnicode) {
    res.status(400).json({ message: "No letter provided" });
    return;
  }

  const letter = String.fromCharCode(parseInt(letterUnicode));

  if (typeof letter !== "string" || !letter) {
    res.status(400).json({ message: "No letter provided" });
    return;
  }

  const character = await Database.getCharacter(letter);

  if (!character) {
    res.status(400).json({ message: "No character found" });
    return;
  }

  const { finger, shift } = character;
  if (!finger) {
    res.status(200).json({ left: "L", right: "R" });
    return;
  }

  let left = "L";
  let right = "R";
  if (shift === "left") left = "L5";
  if (shift === "right") right = "R5";
  if (finger.startsWith("L")) left = finger;
  if (finger.startsWith("R")) right = finger;

  let shiftKeyName = "no shift";
  if (shift === "left") shiftKeyName = "lshift";
  if (shift === "right") shiftKeyName = "rshift";

  res.status(200).json({ finger: { left, right }, shift: shiftKeyName });
};

export default getExtraLetterData;
