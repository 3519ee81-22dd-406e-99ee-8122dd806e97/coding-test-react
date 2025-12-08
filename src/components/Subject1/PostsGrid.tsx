import type { Post } from './profile.type';
import styles from '../UserProfile.module.css';

interface Props {
  posts: Post[];
}

const PostsGrid = ({ posts }: Props) => {
  return (
    <main className={styles.postsGrid}>
      {posts.map((post) => (
        <PostBox {...post} />
      ))}
    </main>
  );
};

export default PostsGrid;

const PostBox = (post: Post) => {
  return (
    <div key={post.id} className={styles.postItem}>
      <img
        src={post.imageUrl}
        alt={post.caption}
        className={styles.postImage}
      />
    </div>
  );
};
