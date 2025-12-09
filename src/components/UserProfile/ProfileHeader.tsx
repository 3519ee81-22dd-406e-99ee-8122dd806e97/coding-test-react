import styles from "../UserProfile.module.css";

/** 프로필 공용 헤더와 사용자 소개를 관리하는 컴포넌트 */
const ProfileHeader = ({ user }) => {
  return (
    <>
      <header className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className={styles.avatar} />
        </div>
        <div className={styles.userInfoContainer}>
          <h2 className={styles.username}>{user.username}</h2>
          <button className={styles.editProfileButton}>프로필 편집</button>
        </div>
      </header>
      <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
      </section>
    </>
  );
};

export default ProfileHeader;
