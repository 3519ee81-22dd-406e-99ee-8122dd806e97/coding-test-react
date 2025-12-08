export interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
}
