import fetchCourses from "data/fetchCourses";
import Image from "next/image";
import Link from "next/link";

/**
 * @Path /courses
 */
const Courses = async () => {
  const courses = await fetchCourses();

  return (
    <div className="flex items-center flex-col">
      {courses?.map((course) => (
        <div
          key={course.name}
          className="bg-neutral-900 rounded-xl p-4 sm:w-[30rem] w-full my-4 drop-shadow-lg flex"
        >
          <div className="self-center flex rounded-md">
            <Image
              src={course.image}
              width={230}
              height={230}
              alt={`${course.name} logo`}
              className="self-center object-contain rounded-md"
            />
          </div>
          <div className="ml-4 flex flex-col">
            <h2 className="font-bold text-2xl mb-2">{course.name}</h2>
            <p className="text-neutral-400 text-sm font-medium mb-2">
              {course.description}
            </p>
            <Link
              href={`/courses/${course.name}`}
              className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-0.5 px-5 rounded-lg text-center max-w-fit self-end"
            >
              Begin
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
