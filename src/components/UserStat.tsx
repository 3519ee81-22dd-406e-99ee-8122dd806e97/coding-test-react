import React from "react";
import styles from "./UserProfile.module.css";

interface UserStatProps {
  stats: number;
  statName: string;
}

const UserStat: React.FC<UserStatProps> = ({ stats, statName }) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{stats}</span>
      <span className={styles.statLabel}>{statName}</span>
    </div>
  );
};

export default UserStat;
