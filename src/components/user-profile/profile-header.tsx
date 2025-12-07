import type { User } from "../../types/types";
import styles from "../UserProfile.module.css";

export const ProfileHeader = ({ name, avatarUrl, username }: Partial<User>) => {
  return (
    <header className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.userInfoContainer}>
        <h2 className={styles.username}>{username}</h2>
        <button className={styles.editProfileButton}>프로필 편집</button>
      </div>
    </header>
  );
};
