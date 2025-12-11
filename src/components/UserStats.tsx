import React from 'react';
import styles from './UserStats.module.css';

interface UserStatsProps {
  posts: number;
  followers: number;
  following: number;
}

const UserStats: React.FC<UserStatsProps> = ({ posts, followers, following }) => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{posts}</span>
        <span className={styles.statLabel}>게시물</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{followers}</span>
        <span className={styles.statLabel}>팔로워</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{following}</span>
        <span className={styles.statLabel}>팔로잉</span>
      </div>
    </section>
  );
};

export default UserStats;

