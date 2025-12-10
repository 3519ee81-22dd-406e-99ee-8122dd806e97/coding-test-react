import type { ReactNode } from "react";
import styles from "./StateItem.module.css";
interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

const StateItem = ({
  stats,
  children,
  type,
}: {
  stats: UserStats;
  children: ReactNode;
  type: string;
}) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>
        {type === "post"
          ? stats.posts
          : type === "followers"
          ? stats.followers
          : stats.following}
      </span>
      <span className={styles.statLabel}>{children}</span>
    </div>
  );
};

export default StateItem;
