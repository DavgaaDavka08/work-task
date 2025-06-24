export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
  ip: string;
  is_verified: boolean;
};
export type RegisteredUser = {
  id: number;
  email: string;
  user_id: number;
  token: string;
  expires_at: string;
};
export type ArticleType = {
  title: string;
  content: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
};
export type Comment = {
  id: number;
  article_id: number;
  user_id: number;
  author: string;
  email: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  newsTitle?: string;
  avatar?: string;
  created_at: string;
};
