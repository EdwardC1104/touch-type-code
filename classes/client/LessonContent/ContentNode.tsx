import { ListNode } from "classes/client/LinkedList";
import fetchCharacter from "data/fetchCharacter";
import type { LetterState } from "./LetterState";

/**
 * A node in the content linked list.
 * The data is a single letter and its state.
 */

export type ContentNodeData = {
  letter: string;
  state: LetterState;
  msToType: number;
  shift?: string;
  fingerURL?: {
    left: string;
    right: string;
  };
};

export default class ContentNode extends ListNode<
  ContentNodeData,
  ContentNode
> {
  constructor(letter: string, state: LetterState) {
    super({ letter, state, msToType: 0 });
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
   * Sets the time it took to type the letter.
   */
  public setMsToType(msToType: number): void {
    this.data.msToType = msToType;
  }

  public getMsToType(): number {
    return this.data.msToType;
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

  public getLetterOnKeyboard(shouldChangeCase: boolean = true): string {
    let letterOnKeyboard = this.data.letter;
    if (shouldChangeCase) letterOnKeyboard = letterOnKeyboard.toUpperCase();
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

  /**
   * Returns the URL of the hand diagram for the left and right hand.
   * This data is fetched from the server.
   */
  public async getHandDiagramUrls() {
    if (typeof this.data.fingerURL === "undefined")
      await this.setExtraLetterData();

    return this.data.fingerURL;
  }

  /**
   * Returns either "left" or "right" or undefined depending on which shift key is needed.
   * This data is fetched from the server.
   */
  public async getShiftKey() {
    if (typeof this.data.shift === "undefined") await this.setExtraLetterData();

    return this.data.shift;
  }

  /**
   * Fetches the extra data about the letter from the server and sets it to the data object.
   */
  async setExtraLetterData() {
    let left = "L";
    let right = "R";
    let shiftKeyName = "no shift";

    const character = await fetchCharacter(this.getLetterOnKeyboard(false));

    if (character) {
      const { finger, shift } = character;

      if (shift === "left") left = "L5";
      if (shift === "right") right = "R5";
      if (finger && finger.startsWith("L")) left = finger;
      if (finger && finger.startsWith("R")) right = finger;

      if (shift === "left") shiftKeyName = "lshift";
      if (shift === "right") shiftKeyName = "rshift";
    }

    this.data.fingerURL = {
      left: `/hands/${left}.png`,
      right: `/hands/${right}.png`,
    };
    this.data.shift = shiftKeyName;
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
