import { db } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchLessonResults = async (userUID: string) => {
  const resultsQuerySnapshot = await getDocs(
    collection(db, "users", userUID, "lessonResults")
  );

  const data: CharacterResult[] = [];

  for (const result of resultsQuerySnapshot.docs) {
    const characterQuerySnapshot = await getDocs(
      collection(
        db,
        "users",
        userUID,
        "lessonResults",
        result.id,
        "characterResults"
      )
    );

    characterQuerySnapshot.docs.forEach((character) => {
      data.push({
        dateStarted: result.data().dateStarted.toDate().toDateString(),
        ...character.data(),
      } as CharacterResult);
    });
  }

  return data;
};

export default fetchLessonResults;
