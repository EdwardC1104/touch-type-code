import DatabaseConnection from "@database/DatabaseConnection";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

type CodeLetter = {
  letter: string;
  state: "CORRECT" | "INCORRECT" | "CURRENT" | "LATER";
};

const codeText = `const styles = StyleSheet.create({container: {
    flex: 1,
    backgroundColor: "#262626",
  },
});`;

const LessonText = ({ code }: { code: CodeLetter[] }) => {
  return (
    <pre className="text-4xl font-bold font-mono leading-normal">
      {code.map((letter, index) => {
        let letterColor = "text-white";
        switch (letter.state) {
          case "CORRECT":
            letterColor = "text-green-500";
            break;
          case "INCORRECT":
            letterColor = "text-red-500 bg-red-900/30 rounded";
            break;
          case "CURRENT":
            letterColor = "bg-blue-900/30 rounded";
            break;
        }
        return (
          <span key={index} className={letterColor}>
            {letter.letter}
          </span>
        );
      })}
    </pre>
  );
};

const Lesson: NextPage = () => {
  const router = useRouter();

  const courseName = router.query.courseId as string;
  const lessonId = router.query.lessonId as string;

  const reducer = (
    state: CodeLetter[],
    action: { inputLetter: string }
  ): CodeLetter[] => {
    const currentIndex = state.findIndex(
      (letter) => letter.state === "CURRENT"
    );
    if (currentIndex === -1) return state;

    if (currentIndex + 1 !== state.length)
      state[currentIndex + 1].state = "CURRENT";

    if (action.inputLetter === state[currentIndex].letter)
      return state.map((letter, index) => {
        if (index === currentIndex) return { ...letter, state: "CORRECT" };

        return letter;
      });
    else
      return state.map((letter, index) => {
        if (index === currentIndex) return { ...letter, state: "INCORRECT" };

        return letter;
      });
  };

  const [code, dispatch] = useReducer(
    reducer,
    codeText.split("").map((letter, index): CodeLetter => {
      return {
        letter,
        state: index === 0 ? "CURRENT" : "LATER",
      };
    })
  );

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      dispatch({ inputLetter: event.key });

    window.addEventListener("keypress", onKeyPress);
    return () => window.removeEventListener("keypress", onKeyPress);
  }, []);

  return (
    <>
      <Head>
        <title>{lessonId}</title>
      </Head>
      <div>
        <div className="flex justify-center mt-16">
          <LessonText code={code} />
        </div>
      </div>
    </>
  );
};

const LESSONS = ["1", "2", "3", "4"];

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const db = new DatabaseConnection();

  const courses = await db.getCourses();

  db.close();

  let paths = courses.map((course) => `/courses/${course.name}`);
  paths = LESSONS.flatMap((lesson) => paths.map((path) => `${path}/${lesson}`));

  return {
    paths,
    fallback: false,
  };
}

export default Lesson;
