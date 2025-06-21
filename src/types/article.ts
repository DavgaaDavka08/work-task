export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
  ip: string;
};
export type RegisteredUser = {
  id: number;
  email: string;
  user_id: number;
  token: string;
  expires_at: string;
};
export type ArticleType = {
  _id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
