import React from "react";
import styles from "./UserProfile.module.css";

import type { UserStats } from ".";

// --- 데이터 타입 정의 ---
interface UserProfileStatusProps {
  stats: UserStats;
}

const UserProfileStatus: React.FC<UserProfileStatusProps> = ({ stats }) => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{stats.posts}</span>
        <span className={styles.statLabel}>게시물</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{stats.followers}</span>
        <span className={styles.statLabel}>팔로워</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{stats.following}</span>
        <span className={styles.statLabel}>팔로잉</span>
      </div>
    </section>
  );
};

export default UserProfileStatus;
