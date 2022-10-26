import doesKeyNeedShift from "lib/doesKeyNeedShift";
import { LetterState } from "./LetterState";

/**
 * A node in the content linked list.
 * The data is a single letter and its state.
 */
export default class ContentNode {
  /**
   *  Pointer to the next node in the linked list.
   */
  public next: ContentNode | null;

  /**
   * The data should only be read and modified by methods.
   */
  private data: {
    letter: string;
    state: LetterState;
  };

  constructor(letter: string, state: LetterState) {
    this.next = null;
    this.data = {
      letter,
      state,
    };
  }

  /**
   * Get the letter's state.
   */
  public getState(): string {
    return this.data.state;
  }

  /**
   * Modifies the letter's state.
   */
  public setState(value: LetterState): void {
    this.data.state = value;
  }

  /**
   * Gets the letter as set when the class was instantiated.
   */
  public getRawLetter(): string {
    return this.data.letter;
  }

  /**
   * How the letter appears is dependent on its state.
   * Eg. green if correct, red if incorrect.
   */
  public getCustomTextStyle(): React.CSSProperties {
    let color = "white";
    let backgroundColor = "transparent";
    switch (this.data.state) {
      case "CORRECT":
        color = "rgb(34 197 94)";
        break;
      case "INCORRECT":
        color = "rgb(239 68 68)";
        backgroundColor = "rgb(127 29 29 / 0.3)";
        break;
      case "CURRENT":
        backgroundColor = "rgb(30 58 138 / 0.5)";
        break;
    }
    return {
      borderRadius: "0.25rem",
      transition: "all 0.1s ease-in-out",
      color,
      backgroundColor,
    };
  }

  /**
   * Returns the letter as it should appear on the screen.
   */
  public getLetterToDisplay(): string {
    let letterToDisplay = this.data.letter;
    switch (this.data.letter) {
      case "\t":
        letterToDisplay = "  ";
        break;
      case "\n":
        letterToDisplay = " \n";
        break;
    }
    return letterToDisplay;
  }

  public getLetterOnKeyboard(): string {
    let letterOnKeyboard = this.data.letter.toUpperCase();
    switch (this.data.letter) {
      case "\t":
        letterOnKeyboard = "tab";
        break;
      case "\n":
        letterOnKeyboard = "enter";
        break;
      case " ":
        letterOnKeyboard = "space";
        break;
    }
    return letterOnKeyboard;
  }

  public isShifted(): boolean {
    return doesKeyNeedShift(this.data.letter);
  }

  /**
   * Generates the JSX element for the letter with the correct styling.
   */
  public generateLetterElement(key: number): JSX.Element {
    return (
      <span key={key} style={this.getCustomTextStyle()}>
        {this.getLetterToDisplay()}
      </span>
    );
  }
}
