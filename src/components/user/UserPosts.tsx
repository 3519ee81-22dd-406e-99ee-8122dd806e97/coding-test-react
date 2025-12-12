import styles from './UserProfile.module.css';
import { type Post } from './UserProfile';

const UserPosts = (
    props: {posts: Post[]}
) => {

    const posts  = props.posts

    return(
        <main className={styles.postsGrid}>
        {posts.map(post => (
          <div key={post.id} className={styles.postItem}>
            <img src={post.imageUrl} alt={post.caption} className={styles.postImage} />
          </div>
        ))}
      </main>
    )
}

export default UserPosts