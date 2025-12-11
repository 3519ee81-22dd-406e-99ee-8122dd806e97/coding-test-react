import React from 'react';
import styles from './UserInfo.module.css';

interface UserInfoProps {
  name: string;
  bio: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, bio }) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.bio}>{bio}</p>
    </section>
  );
};

export default UserInfo;

