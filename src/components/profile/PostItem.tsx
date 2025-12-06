import type Post from '../../types/PostType';
import styles from '../UserProfile.module.css';

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className={styles.postItem}>
      <img
        src={post.imageUrl}
        alt={post.caption}
        className={styles.postImage}
      />
    </div>
  );
}
