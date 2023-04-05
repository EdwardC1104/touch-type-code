import { db } from "config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const fetchLessons = async (courseName: string) => {
  const querySnapshot = await getDocs(
    query(collection(db, "courses", courseName, "lessons"), orderBy("name"))
  );

  const data = querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        uid: doc.id,
      } as Lesson)
  );

  return data;
};

export default fetchLessons;
