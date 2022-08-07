interface CourseData {
  name: string;
  description: string;
  image: string;
}

interface Course extends CourseData {
  id: number;
}

interface UserData {
  name: string;
  username: string | null;
  email: string;
  passwordSalt: string | null;
  passwordHash: string | null;
  isSSO: boolean;
}

interface User extends UserData {
  id: number;
}
