import React from "react";
import styles from "./UserProfile.module.css";

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
const UserProfile: React.FC<UserProfileProps> = ({ user, stats, posts }) => {
  return (
    <div className={styles.profileContainer}>
      <ProfileHeader
        avatarUrl={user.avatarUrl}
        name={user.name}
        username={user.username}
      />
      <UserData name={user.name} bio={user.bio} />
      <UserStats stats={stats} />
      <PostsGrid posts={posts} />
    </div>
  );
};

export default UserProfile;

const ProfileHeader = ({
  avatarUrl,
  name,
  username,
}: {
  avatarUrl: string;
  name: string;
  username: string;
}) => {
  return (
    <header className={styles.profileHeader}>
      <Avatar avatarUrl={avatarUrl} name={name} />
      <EditProfile username={username} />
    </header>
  );
};

const Avatar = ({ avatarUrl, name }: { avatarUrl: string; name: string }) => {
  return (
    <div className={styles.avatarContainer}>
      <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
    </div>
  );
};

const EditProfile = ({ username }: { username: string }) => {
  return (
    <div className={styles.userInfoContainer}>
      <h2 className={styles.username}>{username}</h2>
      <button className={styles.editProfileButton}>프로필 편집</button>
    </div>
  );
};

const UserData = ({ name, bio }: { name: string; bio: string }) => {
  return (
    <section className={styles.userInfoSection}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.bio}>{bio}</p>
    </section>
  );
};

const UserStats = ({ stats }: { stats: UserStats }) => {
  return (
    <section className={styles.statsSection}>
      <StatItem postsNumber={stats.posts} postsLabel="게시물" />
      <StatItem postsNumber={stats.followers} postsLabel="팔로워" />
      <StatItem postsNumber={stats.following} postsLabel="팔로잉" />
    </section>
  );
};

const StatItem = ({
  postsNumber,
  postsLabel,
}: {
  postsNumber: number;
  postsLabel: string;
}) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{postsNumber}</span>
      <span className={styles.statLabel}>{postsLabel}</span>
    </div>
  );
};

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <main className={styles.postsGrid}>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </main>
  );
};

const Post = ({ post }: { post: Post }) => {
  return (
    <div key={post.id} className={styles.postItem}>
      <img
        src={post.imageUrl}
        alt={post.caption}
        className={styles.postImage}
      />
    </div>
  );
};
