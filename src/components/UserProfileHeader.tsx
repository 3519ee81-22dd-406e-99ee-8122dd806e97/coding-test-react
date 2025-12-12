import React from 'react';
import styles from './UserProfile.module.css';

// --- 데이터 타입 정의 ---
interface UserProps {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

const UserProfileHeader: React.FC<UserProps> = (props) => {
  return (
    <>
      {/* 1. 프로필 헤더 */}
      <header className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <img src={props.avatarUrl} alt={`${props.name}'s avatar`} className={styles.avatar} />
        </div>
        <div className={styles.userInfoContainer}>
          <h2 className={styles.username}>{props.username}</h2>
          <button className={styles.editProfileButton}>프로필 편집</button>
        </div>
      </header>
    </>
  );
};

export default UserProfileHeader;
