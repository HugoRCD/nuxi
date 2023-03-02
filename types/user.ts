export interface User {
  id: number;
  username: string;
  bio: string;
  password: string;
  email: string;
  avatar: string;
  cover: string;
  role: number;
  isVerified: boolean;
  isValidated: boolean;
  authToken: string;
}

export interface createUserInput {
  username: string;
  password: string;
  email: string;
  role?: number;
}

export interface updateUserInput {
  username?: string;
  bio?: string;
  password?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  role?: number;
  isVerified?: boolean;
}
