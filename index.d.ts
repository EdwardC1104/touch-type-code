interface Course {
  name: string;
  description: string;
  image: string;
}

interface UserData {
  name: string;
  username: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
}

interface User extends UserData {
  id: number;
}

interface UserSession {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface LessonData {
  name: string;
  description: string;
  background: string;
  courseName: string;
  content: string;
}
interface Lesson extends LessonData {
  id: number;

  // Data stored in the user_lesson table
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  dateStarted?: string;
  wpm?: number;
  accuracy?: number;
}

interface Character {
  symbol: string;
  keyboardRow: number;
  keyboardColumn: number;
  keyWidthMultipler?: number;
  usesSpecialEnterShape: boolean;
  keyTextPosition: "top" | "bottom" | null;
  shift: "left" | "right" | null;
  finger: string | null;
}

interface Key {
  topCharacter: string;
  bottomCharacter: string;
  widthMultipler?: number;
  specialEnter?: boolean;
  color?: string;
}
