import styles from './UserProfile.module.css';
import { type UserStats } from './UserProfile';

const UserStatusCard = (
     props: {stats: UserStats}
    ) => {

    const { posts, followers, following} = props.stats

    return(
        <section className={styles.statsSection}>
            <div className={styles.statItem}>
            <span className={styles.statValue}>{posts}</span>
            <span className={styles.statLabel}>게시물</span>
            </div>
            <div className={styles.statItem}>
            <span className={styles.statValue}>{followers}</span>
            <span className={styles.statLabel}>팔로워</span>
            </div>
            <div className={styles.statItem}>
            <span className={styles.statValue}>{following}</span>
            <span className={styles.statLabel}>팔로잉</span>
            </div>
        </section>
    )
}

export default UserStatusCard