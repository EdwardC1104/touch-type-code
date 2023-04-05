import StarRating from "components/StarRating";
import fetchCourses from "data/fetchCourses";
import fetchLessons from "data/fetchLessons";
import Link from "next/link";
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
      {lessons.map(({ name, description, background, rating }) => (
        <div
          key={name}
          className="bg-neutral-900 rounded-2xl sm:w-[16rem] w-full my-4 drop-shadow-lg flex flex-col mx-12"
        >
          <div
            className="w-full flex justify-center items-center flex-col rounded-t-3xl rounded-b-lg shadow-md"
            style={{ background }}
          >
            <h2 className="font-bold font-mono text-9xl mt-6 mb-1 text-white/50 text-center">
              {name}
            </h2>
            <h3 className="font-bold font-mono text-xl text-white/50 mb-4 text-center">
              {description}
            </h3>
          </div>
          <div className="flex justify-between items-center py-3 px-4 flex-row-reverse">
            <Link
              href={`/courses/${courseName}/${name}`}
              className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-0.5 px-5 rounded-lg text-center max-w-fit self-end"
            >
              {rating ? "Repeat" : "Begin"}
            </Link>
            {typeof rating === "number" && <StarRating rating={rating} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Course;
