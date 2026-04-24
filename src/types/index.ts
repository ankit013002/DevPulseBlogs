import { Binary, ObjectId } from "mongodb";

export interface ImageData {
  data: Binary;
  filename: string;
  mimeType: string;
  size: number;
}

export interface UserDocument {
  _id: ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: ImageData | null;
  followers: string[];
  following: string[];
  likedArticles: string[];
  bio?: string;
}

export interface ArticleDocument {
  _id: ObjectId;
  userId: string;
  title: string;
  link: string;
  author: string;
  date: string;
  tags: string[];
  coverImage: ImageData | null;
  description: string;
  content: string;
  updatedAt?: string;
}

export interface SerializedUser {
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string | null;
}

export interface SerializedArticle {
  userId?: string;
  title: string;
  link: string;
  author: string;
  date: string;
  tags: string[];
  coverImage: string | null;
  description: string;
  content?: string;
  updatedAt?: string;
  user: SerializedUser;
}

export interface ArticleFormData {
  link?: string;
  title: string;
  author: string;
  tags: string[];
  coverImage: string | null;
  description: string;
  content: string;
}

export interface JwtPayload {
  userId: string;
  exp: number;
}

export interface LoginState {
  error?: string;
  success?: string | boolean;
}

export interface RegisterErrors {
  username?: string;
  password?: string;
  email?: string;
}

export interface RegisterState {
  error?: RegisterErrors;
  success?: boolean;
}

export interface ArticleFormState {
  error?: string;
}
