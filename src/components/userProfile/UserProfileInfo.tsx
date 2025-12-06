import React from "react";
import styles from "./UserProfile.module.css";

import type { User } from ".";

// --- 데이터 타입 정의 ---
interface UserProfileInfoProps {
  user: User;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ user }) => {
  return (
      <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
      </section>

  );
};

export default UserProfileInfo;
