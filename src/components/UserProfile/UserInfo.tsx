import type { User } from "../UserProfile";
import styles from "./UserInfo.module.css";

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
    </section>
  );
};

export default UserInfo;
