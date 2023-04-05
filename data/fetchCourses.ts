import { db } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));

  const data = querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        name: doc.id,
      } as unknown as Course)
  );

  return data;
};

export default fetchCourses;
