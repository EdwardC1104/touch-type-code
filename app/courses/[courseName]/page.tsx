import LessonCard from "components/LessonCard";
import fetchCourses from "data/fetchCourses";
import fetchLessons from "data/fetchLessons";
import { redirect } from "next/navigation";

type Props = {
  params: {
    courseName: string;
  };
};

/**
 * @Path /courses/[courseName]
 */
const Course = async ({ params }: Props) => {
  const courseName = params?.courseName as string;

  // Check if the course exists
  const courses = await fetchCourses();
  const course = courses.find((course) => course.name === courseName);
  if (!course) redirect("/courses");

  // Fetch the lessons
  const lessons = await fetchLessons(courseName);

  return (
    <div className="flex flex-wrap justify-center content-center items-center">
      {lessons.map(({ name, description, background, uid }) => (
        <LessonCard
          key={uid}
          uid={uid}
          name={name}
          description={description}
          background={background}
          courseName={courseName}
        />
      ))}
    </div>
  );
};

export default Course;
