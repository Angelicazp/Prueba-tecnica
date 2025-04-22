import React from "react";
import styles from "../styles/PostList.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id} className={styles.listItem}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.body}>{post.body}</p>
          <p className={styles.id}>ID: {post.id}</p>
          <p className={styles.id}>Id de Usuario: {post.userId}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
