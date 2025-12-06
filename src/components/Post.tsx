import styles from "./Post.module.css";

interface PostProps {
  id: number;
  imageUrl: string;
  caption: string;
}

function Post({ id, imageUrl, caption }: PostProps) {
  return (
    <div key={id} className={styles.postItem}>
      <img src={imageUrl} alt={caption} className={styles.postImage} />
    </div>
  );
}

export default Post;
