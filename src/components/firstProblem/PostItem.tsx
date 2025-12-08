import styles from "./PostItem.module.css";

interface props {
  imageUrl: string;
  caption: string;
}

export default function PostItem({ imageUrl, caption }: props) {
  return (
    <div className={styles.postItem}>
      <img src={imageUrl} alt={caption} className={styles.postImage} />
    </div>
  );
}
