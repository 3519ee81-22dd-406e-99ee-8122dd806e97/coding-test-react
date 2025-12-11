import React from "react";
import styles from "./UserProfile.module.css";
import Header from "./UserProfile/Header";
import UserInfo from "./UserProfile/UserInfo";
import Stats from "./UserProfile/Stats";

// --- 데이터 타입 정의 ---
export interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

export interface UserStats {
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
const UserProfile: React.FC<UserProfileProps> = ({ user, stats, posts }) => {
  return (
    <div className={styles.profileContainer}>
      <Header user={user} />

      {/* 2. 사용자 정보 */}
      <UserInfo user={user} />

      {/* 3. 사용자 통계 */}
      <Stats stats={stats} />

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
