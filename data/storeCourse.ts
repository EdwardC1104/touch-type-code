import { db } from "config/firebase";
import { doc, setDoc } from "firebase/firestore";

const storeCourse = async (courseData: Course) => {
  const courseRef = doc(db, "courses", courseData.name);

  await setDoc(courseRef, {
    description: courseData.description,
    image: courseData.image,
  });
};

export default storeCourse;
