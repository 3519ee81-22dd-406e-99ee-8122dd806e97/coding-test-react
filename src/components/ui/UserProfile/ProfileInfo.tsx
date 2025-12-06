import type { UserProfileProps } from '../../UserProfile';
import styles from './ProfileInfo.module.css';

export const ProfileInfo: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{user?.name}</h1>
      <p className={styles.bio}>{user?.bio}</p>
    </section>
  );
};
