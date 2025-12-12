import styles from './UserProfile.module.css';

interface UserStatsProps {
  stats:number;
  text:string;
}




const UserProfileStats = ({stats , text}:UserStatsProps) => {
  return(
    <div className={styles.statItem}>
      <span className={styles.statValue}>{stats}</span>
      <span className={styles.statLabel}>{text}</span>
    </div>

  )
}



export default UserProfileStats