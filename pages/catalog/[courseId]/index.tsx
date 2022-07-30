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
        <h1>{courseName}</h1>

        {lessons.map((lesson) => (
          <p key={lesson}>
            <Link href={`/catalog/${courseName}/${lesson}`}>{lesson}</Link>
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

const COURSES = ["javascript", "python", "html"];

export async function getStaticPaths() {
  const paths = COURSES.map((course) => `/catalog/${course}`);
  return {
    paths,
    fallback: false,
  };
}

export default Course;
