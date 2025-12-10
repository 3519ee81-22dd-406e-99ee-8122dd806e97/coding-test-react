// import React from 'react'
import styles from "../UserProfile.module.css";
interface UserProps {
  user: {
    name: string;
    bio: string;
  };
}

export const UserInfo = ({ user }: UserProps) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
    </section>
  );
};
