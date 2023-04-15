import { db } from "config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const fetchCharacter = async (symbol: string) => {
  const querySnapshot = await getDocs(
    query(collection(db, "characters"), where("symbol", "==", symbol))
  );

  const doc = querySnapshot.docs[0];
  const data = doc?.data();

  if (!data) return null;
  return { ...data, uid: doc?.id } as Character;
};

export default fetchCharacter;
