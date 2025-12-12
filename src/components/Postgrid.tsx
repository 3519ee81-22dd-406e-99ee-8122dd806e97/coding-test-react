import React from "react";
import styles from "./UserProfile.module.css";
import Post from "./Post";

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

interface PostGridProps {
  posts : Post[]
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => (
  <main className={styles.postsGrid}>
    {posts.map((post) => (
      <Post key={post.id} imageUrl={post.imageUrl} caption={post.imageUrl} />
    ))}
  </main>
);

export default PostGrid;
