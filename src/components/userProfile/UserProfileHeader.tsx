import type { User } from "./UserProfile";
import styles from "./UserProfile.module.css";

interface UserProfileHeaderProps {
    user: User;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
    return (
        <>

            <header className={styles.profileHeader}>
                <div className={styles.avatarContainer}>
                    <img
                        src={user.avatarUrl}
                        alt={`${user.name}'s avatar`}
                        className={styles.avatar}
                    />
                </div>
                <div className={styles.userInfoContainer}>
                    <h2 className={styles.username}>{user.username}</h2>
                    <button className={styles.editProfileButton}>
                        프로필 편집
                    </button>
                </div>
            </header>

            {/* 2. 사용자 정보 */}
            <section className={styles.userInfoSection}>
                <h1 className={styles.name}>{user.name}</h1>
                <p className={styles.bio}>{user.bio}</p>
            </section>
        </>
    );
};

export default UserProfileHeader;
