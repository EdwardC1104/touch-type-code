"use client";

import Keyboard from "components/Keyboard";
import useWPM from "hooks/lesson/useWPM";
import { useEffect } from "react";

interface Props {
  keyboardLayout: Key[][];
  lessonData: Lesson;
}

const TypingLesson = ({ keyboardLayout, lessonData }: Props) => {
  const { startMeasuringWPM, getWPM } = useWPM();

  useEffect(() => {
    startMeasuringWPM();
  }, []);

  return (
    <div>
      {/* <div className="flex justify-center mt-10">
        <pre className="text-4xl font-bold font-mono leading-normal">
          {this.state.practiceCodeSnippet}
        </pre>
      </div> */}
      <div className="flex justify-center mt-10 gap-8">
        {/* <picture>
          <source srcSet={this.state.leftHandDiagramUrl} type="image/png" />
          <img
            src={this.state.leftHandDiagramUrl}
            width={107}
            height={207}
            alt="diagram of left hand"
          />
        </picture> */}
        <Keyboard layout={keyboardLayout} />
        {/* <picture>
          <source srcSet={this.state.rightHandDiagramUrl} type="image/png" />
          <img
            src={this.state.rightHandDiagramUrl}
            width={107}
            height={207}
            alt="diagram of right hand"
          />
        </picture> */}
      </div>
    </div>
  );
};

export default TypingLesson;
