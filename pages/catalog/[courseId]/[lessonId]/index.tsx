import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Lesson: NextPage = () => {
  const router = useRouter();

  const courseName = router.query.courseId as string;
  const lessonId = router.query.lessonId as string;

  return (
    <>
      <Head>
        <title>{lessonId}</title>
      </Head>
      <div>
        <h1>
          {courseName}/{lessonId}
        </h1>
      </div>
    </>
  );
};

const LESSONS = ["1", "2", "3", "4"];

const COURSES = ["javascript", "python", "html"];

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  let paths = COURSES.map((course) => `/catalog/${course}`);
  paths = LESSONS.flatMap((lesson) => paths.map((path) => `${path}/${lesson}`));

  return {
    paths,
    fallback: false,
  };
}

export default Lesson;
