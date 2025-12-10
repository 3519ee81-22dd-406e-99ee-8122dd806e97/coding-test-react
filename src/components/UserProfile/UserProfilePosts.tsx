
import type {  Post } from './UserProfile';
import styles from './UserProfile.module.css';

interface UserProfilePostsProps {
  posts: Post[]
}

 const UserProfilePosts: React.FC<UserProfilePostsProps>  = ({posts}) => {
  return (
        <main className={styles.postsGrid}>
        {posts.map(post => (
          <div key={post.id} className={styles.postItem}>
            <img src={post.imageUrl} alt={post.caption} className={styles.postImage} />
          </div>
        ))}
      </main>
  );
};

export default UserProfilePosts