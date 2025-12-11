import styles from './UserProfile.module.css'

interface User {
  name: string;
  bio: string;
}

const UserInfo = (user : User) => {
  return (
    <>
      <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
      </section>
    </>
  )
}

export default UserInfo