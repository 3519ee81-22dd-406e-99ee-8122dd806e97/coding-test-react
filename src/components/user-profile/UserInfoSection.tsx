import type { User } from "../../types/type";
import styles from "../UserProfile.module.css";

interface UserInfoSectionProps {
  user: User;
}

export default function UserInfoSection({ user }: UserInfoSectionProps) {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
    </section>
  );
}
