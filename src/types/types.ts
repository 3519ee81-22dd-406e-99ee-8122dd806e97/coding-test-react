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

export interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface UserProfileProps {
  user: User;
  stats: UserStats;
  posts: Post[];
}
