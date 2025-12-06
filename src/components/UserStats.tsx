import StatItem from "./StatItem";
import styles from "./UserStats.module.css";

interface UserStatsProps {
  posts: number;
  followers: number;
  following: number;
}

function UserStats({ posts, followers, following }: UserStatsProps) {
  return (
    <section className={styles.statsSection}>
      <StatItem statValue={posts} statLabel="포스트" />
      <StatItem statValue={followers} statLabel="팔로워" />
      <StatItem statValue={following} statLabel="팔로잉" />
    </section>
  );
}

export default UserStats;
