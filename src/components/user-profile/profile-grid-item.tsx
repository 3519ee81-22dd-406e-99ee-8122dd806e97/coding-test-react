import type { Post } from "../../types/types";
import styles from "../UserProfile.module.css";

export const ProfileGridItem = ({ caption, id, imageUrl }: Post) => {
  return (
    <div key={id} className={styles.postItem}>
      <img src={imageUrl} alt={caption} className={styles.postImage} />
    </div>
  );
};
