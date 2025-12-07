import styles from "./PostCard.module.css";

interface Props {
  post: {
    id: number;
    imageUrl: string;
    caption: string;
  };
}

export default function PostCard({ post }: Props) {
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
