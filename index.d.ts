interface Course {
  name: string;
  description: string;
  image: string;
}

// interface UserData {
//   name: string;
//   username: string;
//   email: string;
//   passwordSalt: string;
//   passwordHash: string;
// }

// interface User extends UserData {
//   id: number;
// }

// interface UserSession {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }

// interface LessonData {

//   name: number;
//   description: string;
//   background: string;
//   // courseName: string;
//   content: string;
// }
interface Lesson {
  uid: string;

  name: number;
  description: string;
  background: string;
  content: string;

  // Data stored in the user_lesson table
  // rating?: 0 | 1 | 2 | 3 | 4 | 5;
  // dateStarted?: string;
  // wpm?: number;
  // accuracy?: number;
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

interface Key {
  topCharacter: string;
  bottomCharacter: string;
  widthMultipler?: number;
  specialEnter?: boolean;
  color?: string;
}
