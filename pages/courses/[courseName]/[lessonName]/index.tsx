import LessonContent from "classes/LessonContent";
import Keyboard from "components/Keyboard";
import Database from "classes/Database";
import { getServerSession } from "lib/getServerSession";
import round from "lib/round";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { NextRouter, withRouter } from "next/router";
import { Component } from "react";
import getBlankKeyboard from "lib/getBlankKeyboard";
import addColorsToKeyboardLayout from "lib/addColorsToKeyboardLayout";

interface Props {
  user: User;
  lesson: Lesson;
  router: NextRouter;
  keyboardLayout: Key[][];
}

interface State {
  practiceCodeSnippet: JSX.Element[];
}

export class LessonPage extends Component<Props, State> {
  /**
   * Used to keep track of the user's wpm.
   */
  startTime: number | null = null;

  /**
   * Used to track how long it takes the user to type each key.
   */
  timeSinceLastKey: number | null = null;

  /**
   * The linked list of letters that make up the lesson content.
   */
  contentLinkedList: LessonContent;

  constructor(props: Props) {
    // Call the parent's constructor and pass the props up to React.js
    super(props);

    // Initialise the linked list of letters with the lesson content.
    // The lesson content was passed in as a prop from the server side.
    this.contentLinkedList = new LessonContent(this.props.lesson.content);

    // The generated code snippet is stored in state so that the webpage re-renders every time it changes - which is every time a key is pressed.
    this.state = {
      practiceCodeSnippet: this.contentLinkedList.generateLetterElements(),
    };
  }

  /**
   * Gets the page title from the props.
   */
  getPageTitle(): string {
    return `${this.props.lesson.courseName} - ${this.props.lesson.name}`;
  }

  /**
   * Calculates the user's wpm.
   * https://www.speedtypingonline.com/typing-equations
   */
  calculateWPM(): number {
    if (this.startTime === null) this.startTime = Date.now();
    const minutesElapsed = (Date.now() - this.startTime) / 1000 / 60;
    const lettersTypedSoFar = this.contentLinkedList.getNumberTypedSoFar();
    const numberOfWords = lettersTypedSoFar / 5;
    return round(numberOfWords / minutesElapsed);
  }

  calculateAccuracy(): number {
    const numberOfLetters = this.contentLinkedList.getNumberTypedSoFar();
    const numberOfCorrectLetters = this.contentLinkedList.getNumberCorrect();
    return round(numberOfCorrectLetters / numberOfLetters, 2);
  }

  calculateRating(): number {
    const computedWPM = this.calculateWPM() * this.calculateAccuracy();

    if (computedWPM < 0) return 0;
    if (computedWPM < 10) return 1;
    if (computedWPM < 20) return 2;
    if (computedWPM < 25) return 3;
    if (computedWPM < 30) return 4;
    return 5;
  }

  async onLessonFinish(): Promise<void> {
    const { router } = this.props;

    const wpm = this.calculateWPM();
    const accuracy = this.calculateAccuracy();
    const rating = this.calculateRating();
    const incorrectKeys =
      this.contentLinkedList.getIncorrectLettersForKeyboard();
    const correctKeys = this.contentLinkedList.getCorrectLettersForKeyboard();
    const dateStarted = new Date().toDateString();

    const keys = this.contentLinkedList.getKeysFormattedForResults();

    await fetch("/api/lesson/addResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.props.user.id,
        lessonId: this.props.lesson.id,
        wpm,
        accuracy,
        rating,
        dateStarted,
        keys,
      }),
    });

    router.push(
      {
        pathname: "/results",
        query: {
          courseName: this.props.lesson.courseName,
          lessonName: this.props.lesson.name,
          rating,
          wpm,
          accuracy,
          dateStarted,
          incorrectKeys,
          correctKeys,
        },
      },
      "/results"
    );
  }

  /**
   * Callback which is called when the user presses a key.
   * Determines whether the key is correct or not and updates the linked list of letters accordingly.
   * Updates state with the newly generated code snippet so that the webpage re-renders.
   */
  onKeyPress(event: KeyboardEvent): void | Promise<void> {
    // If the user has just started typing, start the timer.
    if (this.startTime === null) this.startTime = Date.now();

    // Some keys need to be translated to match the stored content.
    let inputKey = event.key;
    switch (inputKey) {
      case "Enter":
        inputKey = "\n";
        break;
    }

    // Get the current letter from the linked list.
    const currentLetter = this.contentLinkedList.getCurrentLetter();
    if (currentLetter === null) {
      this.setState({
        practiceCodeSnippet: this.contentLinkedList.generateLetterElements(),
      });
      return;
    }

    // Record the time they took to type the key.
    if (this.timeSinceLastKey === null) this.timeSinceLastKey = Date.now();
    const msToType = Date.now() - this.timeSinceLastKey;
    this.timeSinceLastKey = Date.now();
    currentLetter.setMsToType(msToType);

    // Update the current letter's state.
    if (inputKey === currentLetter.getRawLetter())
      currentLetter.setState("CORRECT");
    else currentLetter.setState("INCORRECT");

    // Move to the next letter in the linked list that isn't ignored.
    let nextLetter = currentLetter.next;
    while (nextLetter?.getState() === "IGNORE") nextLetter = nextLetter?.next;

    // If the next letter is null, the user has finished the lesson.
    if (nextLetter === null) return this.onLessonFinish();

    // Update the next letter's state to be the current letter.
    nextLetter.setState("CURRENT");
    this.setState({
      practiceCodeSnippet: this.contentLinkedList.generateLetterElements(),
    });
  }

  /**
   * Add the keypress event listener when the component is mounted.
   */
  componentDidMount(): void {
    // The onKeyPress function needs to be scopped to the LessonPage class so that the 'this' keyword refers to the LessonPage class.
    this.onKeyPress = this.onKeyPress.bind(this);
    window.addEventListener("keypress", this.onKeyPress);
  }

  /**
   * Remove the keypress event listener when the user leaves the page.
   */
  componentWillUnmount(): void {
    window.removeEventListener("keypress", this.onKeyPress);
  }

  /**
   * Renders the lesson page.
   */
  render(): JSX.Element {
    const title = this.getPageTitle();
    const currentKey = this.contentLinkedList
      .getCurrentLetter()
      ?.getLetterOnKeyboard();
    const shiftKey = this.contentLinkedList.getCurrentLetter()?.isShifted()
      ? "lshift"
      : undefined;

    const keyboardLayout = addColorsToKeyboardLayout(
      this.props.keyboardLayout,
      [currentKey, shiftKey]
    );

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div>
          <h2 className="font-bold text-2xl text-center mt-2">{title}</h2>
          <div className="flex justify-center mt-10">
            <pre className="text-4xl font-bold font-mono leading-normal">
              {this.state.practiceCodeSnippet}
            </pre>
          </div>
          <div className="flex justify-center mt-10">
            <Keyboard layout={keyboardLayout} />
          </div>
        </div>
      </>
    );
  }
}

// Server side
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // Check the user is logged in
  const user = await getServerSession(req);
  if (!user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  // Fetch the lesson content and then check if the URL is valid
  const courseName = params?.courseName as string;
  const lessonName = params?.lessonName as string;
  const lesson = await Database.getLesson(courseName, lessonName);
  if (!lesson)
    return {
      notFound: true,
    };

  const keyboardLayout = await getBlankKeyboard();

  return {
    props: {
      user,
      lesson,
      keyboardLayout,
    },
  };
};

export default withRouter(LessonPage);
