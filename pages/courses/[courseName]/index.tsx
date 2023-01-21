import Database from "classes/server/Database";
import { getServerSession } from "helpers/server/getServerSession";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  lessons: Lesson[];
}

const StarRating = ({ rating }: { rating: 0 | 1 | 2 | 3 | 4 | 5 }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg
        key={`${i}gold`}
        width={20}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.378 7.235l-4.693 3.412a.269.269 0 00-.098.3l1.793 5.52a.387.387 0 01-.144.444.386.386 0 01-.466 0L10.076 13.5a.269.269 0 00-.316 0L5.067 16.91a.386.386 0 01-.466 0 .387.387 0 01-.144-.443l1.793-5.52a.27.27 0 00-.098-.301L1.46 7.235a.387.387 0 01-.144-.443.386.386 0 01.377-.274h5.801c.117 0 .22-.075.256-.186L9.54.812a.386.386 0 01.377-.274c.14 0 .312.072.377.274l1.793 5.52c.036.111.14.186.256.186h5.8c.213 0 .335.142.378.274a.387.387 0 01-.144.443z"
          fill="gold"
        />
      </svg>
    );
  }
  for (let i = 0; i < 5 - rating; i++) {
    stars.push(
      <svg
        key={`${i}grey`}
        width={19}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.297 7.235l-4.693 3.412a.27.27 0 00-.098.3l1.793 5.52a.387.387 0 01-.144.444.386.386 0 01-.466 0L9.995 13.5a.269.269 0 00-.316 0L4.986 16.91a.386.386 0 01-.466 0 .387.387 0 01-.144-.443l1.793-5.52a.27.27 0 00-.098-.301L1.378 7.235a.387.387 0 01-.144-.443.386.386 0 01.377-.274h5.801c.117 0 .22-.075.256-.186L9.46.812a.386.386 0 01.377-.274c.14 0 .312.072.377.274l1.793 5.52c.036.111.14.186.256.186h5.8c.213 0 .335.142.378.274a.387.387 0 01-.144.443z"
          fill="#fff"
          fillOpacity={0.3}
        />
      </svg>
    );
  }
  return <div className="flex">{stars}</div>;
};

const Course: NextPage<Props> = ({ lessons }) => {
  const router = useRouter();

  const courseName = router.query.courseName as string;

  return (
    <>
      <Head>
        <title>{courseName}</title>
      </Head>
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
              <Link href={`/courses/${courseName}/${name}`}>
                <button className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-0.5 px-5 rounded-lg text-center max-w-fit self-end">
                  {rating ? "Repeat" : "Begin"}
                </button>
              </Link>
              {typeof rating === "number" && <StarRating rating={rating} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // Check if the URL is valid (the course exists)
  const courses = await Database.getCourses();
  const courseName = params?.courseName as string;
  if (!courses.find((course) => course.name === courseName))
    return {
      notFound: true,
    };

  // Get the lessons for the course and the user's rating for each lesson if logged in
  const user = await getServerSession(req);
  const lessons = await Database.getLessons(
    params?.courseName as string,
    user?.id
  );
  return {
    props: {
      lessons,
    },
  };
};

export default Course;
