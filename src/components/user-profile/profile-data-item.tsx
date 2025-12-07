import styles from "../UserProfile.module.css";

interface Props {
  name: string;
  value: number;
}

export const ProfileDataItem = ({ name, value }: Props) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{name}</span>
    </div>
  );
};
