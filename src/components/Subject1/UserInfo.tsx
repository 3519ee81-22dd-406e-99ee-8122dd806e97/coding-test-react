import styles from '../UserProfile.module.css';
import type { User } from './profile.type';

const UserInfo = (user: User) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
    </section>
  );
};

export default UserInfo;
