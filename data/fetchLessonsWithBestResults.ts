import { db } from "config/firebase";
import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const fetchLessonsWithBestResults = async (userUID: string) => {
  const resultsQuerySnapshot = await getDocs(
    query(
      collection(db, "users", userUID, "lessonResults"),
      orderBy("rating", "desc")
    )
  );

  const results = resultsQuerySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        uid: doc.id,
        dateStarted: doc.data().dateStarted?.toDate().toDateString(),
      } as LessonResult)
  );

  // Get the best result a user has achieved for each lesson
  const bestResultsTable = results.reduce((acc, result) => {
    const lessonUID = result.lesson.id;
    if (!acc[lessonUID]) {
      acc[lessonUID] = result;
    } else {
      const currentBestResult = acc[lessonUID];
      if (result.rating > currentBestResult.rating) {
        acc[lessonUID] = result;
      }
    }
    return acc;
  }, {} as Record<string, LessonResult>);

  const lessonsQuerySnapshot = await getDocs(
    query(collectionGroup(db, "lessons"))
  );

  const lessons = lessonsQuerySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        uid: doc.id,
      } as Lesson)
  );

  const lessonsWithBestResults: LessonWithResult[] = lessons.map((lesson) => {
    const bestResult = bestResultsTable[lesson.uid];
    if (!bestResult) return lesson;
    return {
      ...bestResult,
      ...lesson,
    };
  });

  return lessonsWithBestResults;
};

export default fetchLessonsWithBestResults;
