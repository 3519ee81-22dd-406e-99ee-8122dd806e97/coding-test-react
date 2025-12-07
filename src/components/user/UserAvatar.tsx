import styles from "./UserAvatar.module.css";

interface Props {
  url: string;
  alt: string;
}

export default function UserAvatar({ url, alt }: Props) {
  return (
    <div className={styles.avatarContainer}>
      <img src={url} alt={`${alt}'s avatar`} className={styles.avatar} />
    </div>
  );
}
