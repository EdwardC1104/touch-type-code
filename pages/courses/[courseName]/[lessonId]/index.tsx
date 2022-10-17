import Database from "database/Database";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer, useRef } from "react";

type CodeLetter = {
  letter: string;
  state: "CORRECT" | "INCORRECT" | "CURRENT" | "LATER" | "IGNORE";
};

const codeText = `const styles = StyleSheet.create({container: {\n\t\tflex: 1,\n\t\tbackgroundColor: "#262626",\n\t},\n});`;

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
          <span
            key={index}
            className={`${letterColor} transition-all duration-100 ease-in-out`}
          >
            {letterToDisplay}
          </span>
        );
      })}
    </pre>
  );
};

interface Props {
  lessons: Lesson[];
}

const Lesson: NextPage<Props> = ({ lessons }) => {
  const router = useRouter();

  const courseName = router.query.courseName as string;
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
      if (letter === "\t") state = "IGNORE";
      return {
        letter,
        state,
      };
    })
  );

  const typedLetters = code.filter(
    (letter) => letter.state === "CORRECT" || letter.state === "INCORRECT"
  ).length;
  const correctLetters = code.filter(
    (letter) => letter.state === "CORRECT"
  ).length;
  const startTimeRef = useRef<number | null>(null);

  const accuracy = Math.round((correctLetters / typedLetters) * 100);

  let wpm: number | null = null;
  if (startTimeRef.current !== null)
    wpm = Math.round(
      (typedLetters / 5 / (Date.now() - startTimeRef.current)) * 60000
    );

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (startTimeRef.current === null) startTimeRef.current = Date.now();
      dispatch({ inputKey: event.key });
    };

    window.addEventListener("keypress", onKeyPress);
    return () => window.removeEventListener("keypress", onKeyPress);
  }, []);

  return (
    <>
      <Head>
        <title>{`${courseName} - ${lessonId}`}</title>
      </Head>
      <div>
        <div className="flex justify-center mt-16">
          <LessonText code={code} />
        </div>
        {typedLetters > 5 && (
          <>
            <p>{wpm}</p>
            <p>{accuracy}%</p>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // Check if the URL is valid (the course and lesson exist)
  const courses = await Database.getCourses();
  const courseName = params?.courseName as string;
  if (!courses.find((course) => course.name === courseName))
    return {
      notFound: true,
    };
  const lessons = await Database.getLessons();
  const lessonId = parseInt(params?.lessonId as string);
  if (!lessons.find((lesson) => lesson.id === lessonId))
    return {
      notFound: true,
    };

  return {
    props: {
      lessons,
    },
  };
};

// export async function getStaticProps() {
//   const lessons = await Database.getLessons();
//   return {
//     props: { lessons },
//     revalidate: 60,
//   };
// }

// export async function getStaticPaths() {
//   const courses = await Database.getCourses();
//   const lessons = await Database.getLessons();

//   let paths = courses.map((course) => `/courses/${course.name}`);
//   paths = lessons.flatMap((lesson) =>
//     paths.map((path) => `${path}/${lesson.name}`)
//   );

//   return {
//     paths,
//     fallback: false,
//   };
// }

export default Lesson;
