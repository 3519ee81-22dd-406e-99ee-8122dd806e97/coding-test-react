import React from "react";
import styles from "./UserProfile.module.css";

interface StatItemProps {
  value: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className={styles.statItem}>
    <span className={styles.statValue}>{value}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

export default StatItem;
