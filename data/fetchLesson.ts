import { db } from "config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const fetchLesson = async (courseName: string, lessonName: string) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "courses", courseName, "lessons"),
      where("name", "==", parseInt(lessonName))
    )
  );

  const doc = querySnapshot.docs[0];

  const data = doc?.data();

  if (!data) return null;
  return { ...data, uid: doc?.id } as Lesson;
};

export default fetchLesson;
