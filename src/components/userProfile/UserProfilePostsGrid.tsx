import type { Post } from "./UserProfile";
import styles from "./UserProfile.module.css";
interface UserProfilePostsGridProps {
    posts: Post[];
}
const UserProfilePostsGrid = ({ posts }: UserProfilePostsGridProps) => {
    return (
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
    );
};

export default UserProfilePostsGrid;
