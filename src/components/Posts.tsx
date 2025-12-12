import React from 'react';
import styles from './UserProfile.module.css';

// --- 데이터 타입 정의 ---
interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

const Posts: React.FC<Post> = (props) => {
  return(
    <>
      {/* 4. 게시물 그리드 */}
      <div key={props.id} className={styles.postItem}>
        <img src={props.imageUrl} alt={props.caption} className={styles.postImage} />
      </div>
    </>
  );
};

export default Posts;
