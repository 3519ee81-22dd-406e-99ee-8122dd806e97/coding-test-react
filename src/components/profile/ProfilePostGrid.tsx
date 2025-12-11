import type React from 'react';
import styles from '../UserProfile.module.css'

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

interface ProfilePostGridProps {
  posts: Post[];
}

const ProfilePostGrid: React.FC<ProfilePostGridProps> = ({posts}) => {
    return (
    <main className={styles.postsGrid}>
        {posts.map(post => (
          <div key={post.id} className={styles.postItem}>
            <img src={post.imageUrl} alt={post.caption} className={styles.postImage} />
          </div>
        ))}
      </main>
    );
}

export default ProfilePostGrid;