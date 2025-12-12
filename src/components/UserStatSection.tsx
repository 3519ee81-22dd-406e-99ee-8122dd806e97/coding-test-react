import React from "react";
import styles from "./UserProfile.module.css";
import StatItem from "./StatItem";

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface UserStatSectionProps {
  stats : UserStats;
}

const UserStatSection: React.FC<UserStatSectionProps> = ({ stats }) => (
      <section className={styles.statsSection}>
        <StatItem value={stats.posts} label="게시물"/>
        <StatItem value={stats.posts} label="팔로워"/>
        <StatItem value={stats.posts} label="팔로잉"/>
      </section>
);

export default UserStatSection;
