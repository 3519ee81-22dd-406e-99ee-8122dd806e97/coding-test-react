import React from 'react';
import styles from '../UserProfile.module.css';

interface User {
  id: number;
  name: string;
  bio: string;
}

interface UserProfileProps {
  user: User;
}

export const ProfileInfo = ({user}: UserProfileProps) => {
  return (
    <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
    </section>
  )
}
