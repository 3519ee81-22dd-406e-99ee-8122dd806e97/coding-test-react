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

const UserInfo: React.FC<UserProps> = (props) => {
  return (
    <>
      {/* 2. 사용자 정보 */}
      <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{props.name}</h1>
        <p className={styles.bio}>{props.bio}</p>
      </section>
    </>
  );
};

export default UserInfo;
