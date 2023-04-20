import { db } from "config/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const storeLesson = async (courseName: string, lessonData: Lesson) => {
  if (lessonData.uid) {
    const lessonRef = doc(db, "courses", courseName, "lessons", lessonData.uid);

    await setDoc(lessonRef, {
      name: lessonData.name,
      description: lessonData.description,
      background: lessonData.background,
      content: lessonData.content,
    });
  } else {
    await addDoc(collection(db, "courses", courseName, "lessons"), {
      name: lessonData.name,
      description: lessonData.description,

      background: lessonData.background,
      content: lessonData.content,
    });
  }
};

export default storeLesson;
