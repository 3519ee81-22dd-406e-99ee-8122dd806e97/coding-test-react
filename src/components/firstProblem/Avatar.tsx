import styles from "./Avatar.module.css";

interface props {
  avatarUrl: string;
  name: string;
}

export default function Avatar({ avatarUrl, name }: props) {
  return (
    <div className={styles.avatarContainer}>
      <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
    </div>
  );
}
