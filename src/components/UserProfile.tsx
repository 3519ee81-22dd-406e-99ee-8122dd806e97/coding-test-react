import React from "react";
import styles from "./UserProfile.module.css";
import UserStat from "./UserStat";

// --- 데이터 타입 정의 ---
interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

interface UserProfileProps {
  user: User;
  stats: UserStats;
  posts: Post[];
}

/**
 * ## UI 문제 1: 컴포넌트 리팩토링
 *
 * 이 컴포넌트는 사용자 프로필 페이지를 렌더링합니다.
 * 현재는 하나의 컴포넌트에 모든 UI가 들어가 있어 재사용성과 가독성이 떨어집니다.
 *
 * ### 요구사항:
 * 1. 이 파일을 의미 있는 단위의 여러 작은, 재사용 가능한 컴포넌트로 분리하세요.
 *    - 컴포넌트의 이름과 구조는 자유롭게 결정하되, 왜 그렇게 분리했는지 논리적으로 설명할 수 있어야 합니다.
 * 2. 분리된 컴포넌트들은 `props`를 통해 필요한 데이터만 전달받아야 합니다.
 * 3. 최종적으로 `UserProfile` 은 분리된 컴포넌트들을 조합하여 동일한 UI를 렌더링해야 합니다.
 * 4. CSS 모듈을 사용하여 스타일을 관리하세요.
 *
 */
/* 해설: 공통적으로 겹치는 부분만 모듈화하였습니다. 헤더나 사용자 정보, 게시물 그리드의 경우 1번씩만 이용되기 때문에, 따로 분리해주지는 않았습니다. 
    UserStat의 경우 동일한 코드가 3번 작성 되기 때문에 해당 코드만 UserStat.tsx로 분리해주었습니다. 
 */
const UserProfile: React.FC<UserProfileProps> = ({ user, stats, posts }) => {
  return (
    <div className={styles.profileContainer}>
      {/* 1. 프로필 헤더 */}
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
          <button className={styles.editProfileButton}>프로필 편집</button>
        </div>
      </header>

      {/* 2. 사용자 정보 */}
      <section className={styles.userInfoSection}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.bio}>{user.bio}</p>
      </section>

      {/* 3. 사용자 통계 */}
      <section className={styles.statsSection}>
        <UserStat stats={stats.posts} statName="게시물"></UserStat>
        <UserStat stats={stats.followers} statName="팔로워"></UserStat>
        <UserStat stats={stats.following} statName="팔로잉"></UserStat>
      </section>

      {/* 4. 게시물 그리드 */}
      <main className={styles.postsGrid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            <img
              src={post.imageUrl}
              alt={post.caption}
              className={styles.postImage}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default UserProfile;
