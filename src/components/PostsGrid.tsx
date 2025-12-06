import styles from "./PostsGrid.module.css";
import Post from "./Post";

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

interface PostsGridPops {
  posts: Post[];
}

function PostsGrid({ posts }: PostsGridPops) {
  return (
    <main className={styles.postsGrid}>
      {posts.map(({ id, imageUrl, caption }) => (
        <Post id={id} imageUrl={imageUrl} caption={caption} />
      ))}
    </main>
  );
}

export default PostsGrid;
