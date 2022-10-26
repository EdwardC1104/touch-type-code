import ContentNode from "./ContentNode";
import { LetterState } from "./LetterState";

export default class LessonContent {
  /**
   * The first node in the linked list.
   */
  public head: ContentNode | null;

  constructor(text: string) {
    this.head = null;

    // I tidied the initialisation of the linked list into a separate method.
    this.setContent(text);
  }

  /**
   * Adds a new node to the end of the linked list.
   */
  public addNode(letter: string, state: LetterState) {
    const newNode = new ContentNode(letter, state);

    // If the linked list is empty, make the new node the head.
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    // Otherwise, find the last node in the linked list and add the new node after that.
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }

  /**
   * Initialises the linked list with the given text.
   */
  private setContent(text: string) {
    // Empty the linked list.
    this.head = null;

    // Split the text into an array of letters.
    const letters = text.split("");

    // Add each letter to the linked list.
    letters.forEach((letter, index) => {
      // The first letter should be the current letter and tab characters should be ignored.
      let state: LetterState = "LATER";
      if (index === 0) state = "CURRENT";
      if (letter === "\t") state = "IGNORE";

      this.addNode(letter, state);
    });
  }

  /**
   * Returns the number of letters in the linked list that are not ignored.
   */
  public getTypableLength(): number {
    let length = 0;

    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.getState() !== "IGNORE") length += 1;
      currentNode = currentNode.next;
    }

    return length;
  }

  public getIncorrectLetters(): ContentNode[] {
    const incorrectLetters: ContentNode[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.getState() === "INCORRECT")
        incorrectLetters.push(currentNode);
      currentNode = currentNode.next;
    }

    return incorrectLetters;
  }

  public getIncorrectLettersForKeyboard(): string[] {
    return this.getIncorrectLetters().map((node) => node.getLetterOnKeyboard());
  }

  public getNumberIncorrect(): number {
    return this.getIncorrectLetters().length;
  }

  public getCorrectLetters(): ContentNode[] {
    const correctLetters: ContentNode[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.getState() === "CORRECT")
        correctLetters.push(currentNode);
      currentNode = currentNode.next;
    }

    return correctLetters;
  }

  public getCorrectLettersForKeyboard(): string[] {
    return this.getCorrectLetters().map((node) => node.getLetterOnKeyboard());
  }

  public getNumberCorrect(): number {
    return this.getCorrectLetters().length;
  }

  /**
   * Returns the number of letters that have been typed so far.
   */
  public getNumberTypedSoFar(): number {
    let count = 0;

    let currentNode = this.head;
    while (currentNode !== null) {
      if (
        currentNode.getState() === "CORRECT" ||
        currentNode.getState() === "INCORRECT"
      )
        count += 1;
      currentNode = currentNode.next;
    }

    return count;
  }

  /**
   * Finds the letter that has the state "CURRENT" and returns it.
   */
  public getCurrentLetter(): ContentNode | null {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.getState() === "CURRENT") return currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }

  /**
   * Generates an array of JSX elements that can be rendered in the page.
   */
  public generateLetterElements() {
    const contentElements = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      const key: number = contentElements.length;
      contentElements.push(currentNode.generateLetterElement(key));

      currentNode = currentNode.next;
    }

    return contentElements;
  }
}
