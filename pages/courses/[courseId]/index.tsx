import DatabaseConnection from "@database/DatabaseConnection";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  lessons: string[];
}

const Course: NextPage<Props> = ({ lessons }) => {
  const router = useRouter();

  const courseName = router.query.courseId as string;

  return (
    <>
      <Head>
        <title>{courseName}</title>
      </Head>
      <div>
        {lessons.map((lesson) => (
          <p key={lesson}>
            <Link href={`/courses/${courseName}/${lesson}`}>{lesson}</Link>
          </p>
        ))}
      </div>
    </>
  );
};

const LESSONS = ["1", "2", "3", "4"];

export async function getStaticProps() {
  return {
    props: {
      lessons: LESSONS,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const db = new DatabaseConnection();

  const courses = await db.getCourses();

  db.close();

  const paths = courses.map((course) => `/courses/${course.name}`);

  return {
    paths,
    fallback: false,
  };
}

export default Course;
