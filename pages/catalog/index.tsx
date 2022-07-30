import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

interface Props {
  courses: string[];
}

const Catalog: NextPage<Props> = ({ courses }) => {
  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>
      <div>
        <h1>Catalog</h1>

        {courses?.map((course) => (
          <p key={course}>
            <Link href={`/catalog/${course}`}>{course}</Link>
          </p>
        ))}
      </div>
    </>
  );
};

const COURSES = ["javascript", "python", "html"];

export async function getStaticProps() {
  return {
    props: {
      courses: COURSES,
    },
    revalidate: 60,
  };
}

export default Catalog;
