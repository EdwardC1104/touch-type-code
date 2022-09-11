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
