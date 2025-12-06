import styles from "./StatItem.module.css";

interface StatItemProps {
  statValue: number;
  statLabel: string;
}

function StatItem({ statValue, statLabel }: StatItemProps) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{statValue}</span>
      <span className={styles.statLabel}>{statLabel}</span>
    </div>
  );
}

export default StatItem;
