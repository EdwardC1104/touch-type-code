import { db } from "config/firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const fetchBestLessonResult = async (
  userUID: string,
  lessonUID: string,
  courseName: string
) => {
  const lessonRef = doc(db, "courses", courseName, "lessons", lessonUID);

  const querySnapshot = await getDocs(
    query(
      collection(db, "users", userUID, "lessonResults"),
      where("lesson", "==", lessonRef),
      orderBy("rating", "desc")
    )
  );

  const docFromQuery = querySnapshot.docs[0];
  const data = docFromQuery?.data();

  if (!data) return null;
  return { ...data, uid: docFromQuery?.id } as LessonResult;
};

export default fetchBestLessonResult;
