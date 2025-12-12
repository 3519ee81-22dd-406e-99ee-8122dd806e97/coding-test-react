import React from 'react';
import styles from './UserProfile.module.css';


interface ProfileHeaderProps {
    avatarUrl : string;
    username : string;
    name : string;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarUrl, username, name }) => 
    (
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


export default ProfileHeader;

