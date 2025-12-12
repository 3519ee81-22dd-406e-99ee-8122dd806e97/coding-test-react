import styles from './UserProfile.module.css';
import { type User } from './UserProfile';

const UserInfoCard = ( props: {user: User}) => {

    const { name,bio} = props.user

    return(
        <section className={styles.userInfoSection}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.bio}>{bio}</p>
        </section>
    )
}

export default UserInfoCard