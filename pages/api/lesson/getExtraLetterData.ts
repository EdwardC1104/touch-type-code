import Database from "classes/Database";
import { NextApiRequest, NextApiResponse } from "next";

const getExtraLetterData = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("Getting extra letter data");
  const { letter } = req.body;

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
