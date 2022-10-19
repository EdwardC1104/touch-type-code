/**
 * There are a few possible states that a letter can be in.
 */
export type LetterState =
  | "CURRENT"
  | "LATER"
  | "CORRECT"
  | "INCORRECT"
  | "IGNORE";
