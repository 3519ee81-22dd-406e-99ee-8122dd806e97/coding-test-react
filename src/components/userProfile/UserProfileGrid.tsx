import React from "react";
import styles from "./UserProfile.module.css";

import type { Post } from ".";

// --- 데이터 타입 정의 ---
interface UserProfileGridProps {
  posts: Post[];
}

const UserProfileGrid: React.FC<UserProfileGridProps> = ({ posts }) => {
  return (
    <main className={styles.postsGrid}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <img
            src={post.imageUrl}
            alt={post.caption}
            className={styles.postImage}
          />
        </div>
      ))}
    </main>
  );
};

export default UserProfileGrid;
