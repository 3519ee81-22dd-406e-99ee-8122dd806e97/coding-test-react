import styles from "./ContentStatusDisplay.module.css";

interface Props {
  title: string;
  counts: number;
}

export default function ContentStatusDisplay({ title, counts }: Props) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{counts}</span>
      <span className={styles.statLabel}>{title}</span>
    </div>
  );
}
