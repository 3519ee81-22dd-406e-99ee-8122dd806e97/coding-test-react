import type { Post } from "../../types/type";
import styles from "../UserProfile.module.css";

interface UserPostsSectionProps {
  posts: Post[];
}

export default function UserPostsSection({ posts }: UserPostsSectionProps) {
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
}
