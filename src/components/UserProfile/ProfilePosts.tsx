import styles from "../UserProfile.module.css";

/** 프로파일 내 게시물 컴포넌트 */
const ProfilePosts = ({ posts }) => {
  return (
    <main className={styles.postsGrid}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <img src={post.imageUrl} alt={post.caption} className={styles.postImage} />
        </div>
      ))}
    </main>
  );
};

export default ProfilePosts;
