import { db } from "config/firebase";
import { addDoc, collection } from "firebase/firestore";

const storeLesson = async (courseName: string, lessonData: Lesson) => {
  await addDoc(collection(db, "courses", courseName, "lessons"), lessonData);
};

export default storeLesson;
