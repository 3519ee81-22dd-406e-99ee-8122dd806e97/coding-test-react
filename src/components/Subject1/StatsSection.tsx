import styles from '../UserProfile.module.css';
import type { UserStats } from './profile.type';

const StatsSection = (stats: UserStats) => {
  return (
    <section className={styles.statsSection}>
      <StatBox value={stats.posts} name="게시물" />
      <StatBox value={stats.followers} name="팔로워" />
      <StatBox value={stats.following} name="팔로잉" />
    </section>
  );
};

export default StatsSection;

const StatBox = ({ value, name }: { value: number; name: string }) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{name}</span>
    </div>
  );
};
