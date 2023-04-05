import { db } from "config/firebase";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

interface LessonResultData {
  userId: string;
  lessonId: string;
  courseName: string;
  wpm: number;
  accuracy: number;
  rating: number;
}

const storeLessonResult = async (resultData: LessonResultData) => {
  await addDoc(collection(db, "users", resultData.userId, "lessonResults"), {
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
    dataStarted: serverTimestamp(),
  });
};

export default storeLessonResult;
