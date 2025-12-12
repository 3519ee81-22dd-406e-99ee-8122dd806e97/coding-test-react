import React from 'react';
import styles from './UserProfile.module.css';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

const UserStatistics: React.FC<UserStats> = (props) => {
  return (
    <>
      {/* 3. 사용자 통계 */}
      <section className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{props.posts}</span>
          <span className={styles.statLabel}>게시물</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{props.followers}</span>
          <span className={styles.statLabel}>팔로워</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{props.following}</span>
          <span className={styles.statLabel}>팔로잉</span>
        </div>
      </section>
    </>
  );
};

export default UserStatistics;
