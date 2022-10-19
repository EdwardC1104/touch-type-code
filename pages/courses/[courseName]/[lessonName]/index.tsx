import LessonContent from "classes/LessonContent";
import Database from "database/Database";
import { getServerSession } from "lib/getServerSession";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { NextRouter, withRouter } from "next/router";
import { Component } from "react";

interface Props {
  user: User;
  lesson: Lesson;
  router: NextRouter;
}

interface State {
  practiceCodeSnippet: JSX.Element[];
}

class LessonPage extends Component<Props, State> {
  /**
   * Used to keep track of the user's wpm.
   */
  startTime: number | null = null;

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
   * Calculates the user's wpm and return null if the user hasn't typed anything yet.
   */
  calculateWPM(): number | null {
    if (this.startTime === null) return null;
    return null;
  }

  onLessonFinish(): void {
    const { router } = this.props;
    router.push(
      {
        pathname: "/results",
        query: {
          rating: 4,
          wpm: 27,
          accuracy: 0.89,
          heatmap: [],
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
  onKeyPress(event: KeyboardEvent): void {
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

    // Update the current letter's state.
    if (inputKey === currentLetter.getRawLetter())
      currentLetter.setState("CORRECT");
    else currentLetter.setState("INCORRECT");

    // Move to the next letter in the linked list that isn't ignored.
    let nextLetter = currentLetter.next;
    while (nextLetter?.getState() === "IGNORE") nextLetter = nextLetter?.next;

    // If the next letter is null, the user has finished the lesson.
    if (nextLetter === null) {
      return this.onLessonFinish();
    }

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

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div>
          <div className="flex justify-center mt-16">
            <pre className="text-4xl font-bold font-mono leading-normal">
              {this.state.practiceCodeSnippet}
            </pre>
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

  return {
    props: {
      user,
      lesson,
    },
  };
};

export default withRouter(LessonPage);
