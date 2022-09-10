import Database from "database/Database";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

type CodeLetter = {
  letter: string;
  state: "CORRECT" | "INCORRECT" | "CURRENT" | "LATER";
};

const codeText = `const styles = StyleSheet.create({container: {
\t\tflex: 1,
\t\tbackgroundColor: "#262626",
\t},
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
            letterColor = "bg-blue-900/50 rounded";
            break;
        }

        let letterToDisplay = letter.letter;
        switch (letter.letter) {
          case "\t":
            letterToDisplay = "  ";
            break;
          case "\n":
            letterToDisplay = " \n";
            break;
        }

        return (
          <span key={index} className={letterColor}>
            {letterToDisplay}
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
    action: { inputKey: string }
  ): CodeLetter[] => {
    let inputLetter = action.inputKey;
    switch (action.inputKey) {
      case "Enter":
        inputLetter = "\n";
        break;
    }

    const currentIndex = state.findIndex(
      (letter) => letter.state === "CURRENT"
    );
    if (currentIndex === -1) return state;

    const numberOfCurrentLetters = state.reduce(
      (acc, letter) => (letter.state === "CURRENT" ? acc + 1 : acc),
      0
    );
    const nextIndex = state.findIndex((letter) => letter.state === "LATER");
    if (numberOfCurrentLetters === 1 && nextIndex !== -1)
      state[nextIndex].state = "CURRENT";

    if (inputLetter === state[currentIndex].letter)
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
      let state: CodeLetter["state"] = "LATER";
      if (index === 0) state = "CURRENT";
      if (letter === "\t") state = "CORRECT";
      return {
        letter,
        state,
      };
    })
  );

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      dispatch({ inputKey: event.key });

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
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const courses = await Database.getCourses();

  let paths = courses.map((course) => `/courses/${course.name}`);
  paths = LESSONS.flatMap((lesson) => paths.map((path) => `${path}/${lesson}`));

  return {
    paths,
    fallback: false,
  };
}

export default Lesson;
