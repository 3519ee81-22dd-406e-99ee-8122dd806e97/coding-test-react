
import type { User } from './UserProfile';
import styles from './UserProfile.module.css';

interface UserProfileInfoProps {
  user: User
}

 const UserProfileInfo: React.FC<UserProfileInfoProps>  = ({user}) => {
  return (
  <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
      </section>
  );
};

export default UserProfileInfo