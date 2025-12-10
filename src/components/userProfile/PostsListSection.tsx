import type { Post } from "../../types/types";
import styles from "./PostsListSection.module.css";

const PostsListSection = ({ posts }: { posts: Post[] }) => {
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

export default PostsListSection;
