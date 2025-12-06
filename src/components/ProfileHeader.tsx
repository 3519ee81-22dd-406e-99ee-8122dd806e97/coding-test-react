import styles from "./ProfileHeader.module.css";

interface ProfileHeaderProps {
  avatarUrl: string;
  name: string;
  username: string;
}

function ProfileHeader({ avatarUrl, name, username }: ProfileHeaderProps) {
  return (
    <header className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      </div>
      <div className={styles.userInfoContainer}>
        <h2 className={styles.username}>{username}</h2>
        <button className={styles.editProfileButton}>프로필 편집</button>
      </div>
    </header>
  );
}

export default ProfileHeader;
