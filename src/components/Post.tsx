import React from "react";
import styles from "./UserProfile.module.css";

interface PostProps {
  imageUrl: string;
  caption: string;
}

const Post: React.FC<PostProps> = ({ imageUrl, caption}) => (
     <div className={styles.postItem}>
        <img
          src={imageUrl}
          alt={caption}
          className={styles.postImage}
        />
      </div>
);

export default Post;
