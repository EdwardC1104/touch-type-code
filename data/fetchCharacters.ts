import { db } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchCharacters = async () => {
  const querySnapshot = await getDocs(collection(db, "characters"));

  const data = querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        uid: doc.id,
      } as Character)
  );

  return data;
};

export default fetchCharacters;
