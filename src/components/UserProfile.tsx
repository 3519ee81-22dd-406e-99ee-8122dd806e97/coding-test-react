import React from 'react';
import styles from './UserProfile.module.css';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserStats from './UserStats';
import PostsGrid from './PostsGrid';
import type { UserProfileProps } from './types';

/**
 * ## UI 문제 1: 컴포넌트 리팩토링
 *
 * 이 컴포넌트는 사용자 프로필 페이지를 렌더링합니다.
 * 
 * 리팩토링 완료:
 * - ProfileHeader: 프로필 헤더 (아바타, 사용자명, 편집 버튼)를 담당하는 컴포넌트
 * - UserInfo: 사용자 기본 정보 (이름, 바이오)를 표시하는 컴포넌트
 * - UserStats: 사용자 통계 (게시물, 팔로워, 팔로잉)를 표시하는 컴포넌트
 * - PostsGrid: 게시물 그리드를 표시하는 컴포넌트
 * 
 * 각 컴포넌트는 독립적으로 재사용 가능하며, 필요한 props만 전달받아 사용합니다.
 */
const UserProfile: React.FC<UserProfileProps> = ({ user, stats, posts }) => {
  return (
    <div className={styles.profileContainer}>
      <ProfileHeader 
        avatarUrl={user.avatarUrl}
        username={user.username}
        name={user.name}
      />
      <UserInfo 
        name={user.name}
        bio={user.bio}
      />
      <UserStats 
        posts={stats.posts}
        followers={stats.followers}
        following={stats.following}
      />
      <PostsGrid posts={posts} />
    </div>
  );
};

export default UserProfile;
