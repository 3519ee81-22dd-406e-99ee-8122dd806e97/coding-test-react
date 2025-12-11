import React from 'react';
import styles from './PostsGrid.module.css';
import type { Post } from './types';

interface PostsGridProps {
  posts: Post[];
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
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

export default PostsGrid;

