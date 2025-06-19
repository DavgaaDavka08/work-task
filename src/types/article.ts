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
