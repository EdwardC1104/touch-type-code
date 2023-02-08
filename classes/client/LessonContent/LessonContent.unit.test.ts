import LessonContent from "./LessonContent";

describe("LessonContent", () => {
  it("should be able to create a LessonContent class", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent).toBeDefined();
  });

  it("should be able to get the typable length of the lesson content", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getTypableLength()).toBe(9);
  });

  it("should be able to return a list of incorrectly typed characters", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getIncorrectLetters()).toEqual([]);
    lessonContent.getCurrentLetter()?.setState("INCORRECT");
    // @ts-ignore - This is a protected attribute, but we're testing it here.
    expect(lessonContent.getIncorrectLetters()).toEqual([lessonContent.head]);
  });

  it("should be able to return a list of correctly typed characters", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getCorrectLetters()).toEqual([]);
    lessonContent.getCurrentLetter()?.setState("CORRECT");
    // @ts-ignore - This is a protected attribute, but we're testing it here.
    expect(lessonContent.getCorrectLetters()).toEqual([lessonContent.head]);
  });

  it("should be able to return the number of incorrectly typed characters", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getNumberIncorrect()).toBe(0);
    lessonContent.getCurrentLetter()?.setState("INCORRECT");
    expect(lessonContent.getNumberIncorrect()).toBe(1);
  });

  it("should be able to return the number of correctly typed characters", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getNumberCorrect()).toBe(0);
    lessonContent.getCurrentLetter()?.setState("CORRECT");
    expect(lessonContent.getNumberCorrect()).toBe(1);
  });

  it("should be able to return a list of incorrectly typed characters as they appear on the keyboard", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getIncorrectLettersForKeyboard()).toEqual([]);
    lessonContent.getCurrentLetter()?.setState("INCORRECT");
    expect(lessonContent.getIncorrectLettersForKeyboard()).toEqual(["U"]);
  });

  it("should be able to return a list of correctly typed characters as they appear on the keyboard", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getCorrectLettersForKeyboard()).toEqual([]);
    lessonContent.getCurrentLetter()?.setState("CORRECT");
    expect(lessonContent.getCorrectLettersForKeyboard()).toEqual(["U"]);
  });

  it("should be able to get the number of characters that have been typed so far", () => {
    const lessonContent = new LessonContent("unit test");
    expect(lessonContent.getNumberTypedSoFar()).toBe(0);
    lessonContent.getCurrentLetter()?.setState("CORRECT");
    expect(lessonContent.getNumberTypedSoFar()).toBe(1);
  });

  it("should be able to get the current letter that the user is typing", () => {
    const lessonContent = new LessonContent("unit test");
    // @ts-ignore - This is a protected method, but we're testing it here.
    expect(lessonContent.getCurrentLetter()?.getData()).toEqual({
      letter: "u",
      msToType: 0,
      state: "CURRENT",
    });
  });

  it("should be able to list every key formatted for the results", () => {
    const lessonContent = new LessonContent("hi");

    lessonContent.getCurrentLetter()?.setState("CORRECT");

    expect(lessonContent.getKeysFormattedForResults()).toEqual([
      {
        symbol: "H",
        averageTimeToType: 0,
        timesCorrect: 1,
        timesIncorrect: 0,
      },
      {
        symbol: "I",
        averageTimeToType: 0,
        timesCorrect: 0,
        timesIncorrect: 0,
      },
    ]);
  });
});
