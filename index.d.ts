interface Course {
  name: string;
  description: string;
  image: string;
}

interface Lesson {
  uid: string;

  name: number;
  description: string;
  background: string;
  content: string;
}

interface LessonResult {
  uid: string;

  accuracy: number;
  dateStarted: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  wpm: number;
  lesson: any;
}

interface Character {
  uid: string;
  finger: string | null;
  isHidden: boolean;
  keyTextPosition: "top" | "bottom" | null;
  keyWidthMultipler?: number;
  keyboardColumn: number;
  keyboardRow: number;
  shift: "left" | "right" | null;
  symbol: string;
  usesSpecialEnterShape: boolean;
}

interface CharacterResult {
  uid: string;

  averageTimeToType: number;
  characterRef: any;
  timesCorrect: number;
  timesIncorrect: number;
  symbol: string;
  dateStarted: string;
}

interface Key {
  topCharacter: string;
  bottomCharacter: string;
  widthMultipler?: number;
  specialEnter?: boolean;
  color?: string;
}

interface LessonWithResult extends Partial<LessonResult>, Lesson {}
interface ResultWithLesson extends LessonResult, Partial<Lesson> {}
