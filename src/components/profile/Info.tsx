import type User from '../../types/UserType';
import styles from '../UserProfile.module.css';

export default function Info({ user }: { user: User }) {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
    </section>
  );
}
