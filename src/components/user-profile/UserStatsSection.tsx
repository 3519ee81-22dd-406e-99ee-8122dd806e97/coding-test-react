import type { UserStats } from "../../types/type";
import styles from "../UserProfile.module.css";

interface UserStatsSectionProps {
  stats: UserStats;
}

export default function UserStatsSection({ stats }: UserStatsSectionProps) {
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
}
