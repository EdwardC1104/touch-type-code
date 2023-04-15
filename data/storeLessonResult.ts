import { db } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

interface LessonResultData {
  userId: string;
  lessonId: string;
  courseName: string;
  wpm: number;
  accuracy: number;
  rating: number;
  keys: {
    symbol: string;
    averageTimeToType: number;
    timesCorrect: number;
    timesIncorrect: number;
  }[];
}

const storeLessonResult = async (resultData: LessonResultData) => {
  const resultDoc = await addDoc(
    collection(db, "users", resultData.userId, "lessonResults"),
    {
      wpm: resultData.wpm,
      accuracy: resultData.accuracy,
      rating: resultData.rating,
      lesson: doc(
        db,
        "courses",
        resultData.courseName,
        "lessons",
        resultData.lessonId
      ),
      dateStarted: serverTimestamp(),
    }
  );

  const characterResultsCollection = collection(
    db,
    "users",
    resultData.userId,
    "lessonResults",
    resultDoc.id,
    "characterResults"
  );

  resultData.keys.forEach(
    async ({ symbol, averageTimeToType, timesCorrect, timesIncorrect }) => {
      const querySnapshot = await getDocs(
        query(collection(db, "characters"), where("symbol", "==", symbol))
      );
      const characterRef = querySnapshot.docs[0].ref;

      addDoc(characterResultsCollection, {
        symbol,
        averageTimeToType,
        timesCorrect,
        timesIncorrect,
        characterRef,
      });
    }
  );
};

export default storeLessonResult;
