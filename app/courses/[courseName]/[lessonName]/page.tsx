import TypingLesson from "components/TypingLesson";
import fetchLesson from "data/fetchLesson";
import getBlankKeyboard from "helpers/getBlankKeyboard";
import { redirect } from "next/navigation";

interface Props {
  params: {
    courseName: string;
    lessonName: string;
  };
}

const Lesson = async ({ params: { courseName, lessonName } }: Props) => {
  const [keyboardLayout, lessonData] = await Promise.all([
    getBlankKeyboard(),
    fetchLesson(courseName, lessonName),
  ]);

  if (!lessonData) return redirect(`/courses/${courseName}`);

  return (
    <TypingLesson
      keyboardLayout={keyboardLayout}
      lesson={lessonData}
      courseName={courseName}
    />
  );
};

export default Lesson;
