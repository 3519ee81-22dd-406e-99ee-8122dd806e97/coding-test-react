import styles from "../UserProfile.module.css";

interface PostProps {
  posts: Post[];
}
interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

export const PostGrid = ({ posts }: PostProps) => {
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
