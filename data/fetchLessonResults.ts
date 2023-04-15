import { db } from "config/firebase";
import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const fetchLessonResults = async (userUID: string) => {
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

  const resultsWithLessons: ResultWithLesson[] = results.map((result) => {
    const lesson = lessons.find((lesson) => lesson.uid === result.lesson.id);
    if (!lesson) return result;
    return {
      ...result,
      ...lesson,
    };
  });

  return resultsWithLessons;
};

export default fetchLessonResults;
