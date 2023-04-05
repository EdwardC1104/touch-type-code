import Database from "classes/server/Database";
import { db } from "config/firebase";
import { doc, runTransaction } from "firebase/firestore";

function generateFirestoreId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
  return autoId;
}

const temp = async (req, res) => {
  const allCharacters = await Database.getCharacters();

  await runTransaction(db, async (transaction) => {
    allCharacters.forEach(async (character) => {
      // clone the character but convert IsHidden and usesSpecialEnterShape to a boolean
      const characterClone = Object.keys(character).reduce((obj, key) => {
        if (key === "isHidden" || key === "usesSpecialEnterShape") {
          obj[key] = character[key] === 1;
        } else {
          obj[key] = character[key];
        }
        return obj;
      }, {});

      await transaction.set(
        doc(db, "characters", generateFirestoreId()),
        characterClone
      );
    });
  });

  res.status(200).json({ message: "success" });
};

export default temp;
