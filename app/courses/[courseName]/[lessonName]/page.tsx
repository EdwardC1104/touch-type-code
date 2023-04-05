import OldTypingLesson from "components/TypingLesson/old";
import fetchLesson from "data/fetchLesson";
import getBlankKeyboard from "helpers/server/getBlankKeyboard";
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
    <OldTypingLesson
      keyboardLayout={keyboardLayout}
      lesson={lessonData}
      courseName={courseName}
    />
  );

  // return (
  //   <TypingLesson keyboardLayout={keyboardLayout} lessonData={lessonData} />
  // );
};

export default Lesson;
