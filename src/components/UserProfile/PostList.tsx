import type { Post } from "../UserProfile";
import styles from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
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

export default PostList;
