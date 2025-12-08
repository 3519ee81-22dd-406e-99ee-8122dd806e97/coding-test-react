import type { Post } from "../../types/Post";
import styles from "./PostGrid.module.css";

interface PostCardProps {
  post: Post;
}

interface PostGridProps {
  posts: Post[];
}

function PostCard({ post }: PostCardProps) {
  return (
    <div key={post.id} className={styles.postItem}>
      <img
        src={post.imageUrl}
        alt={post.caption}
        className={styles.postImage}
      />
    </div>
  );
}

function PostGrid({ posts }: PostGridProps) {
  return (
    <main className={styles.postsGrid}>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </main>
  );
}

export default PostGrid;
