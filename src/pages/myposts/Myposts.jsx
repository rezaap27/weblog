import React, { useEffect, useState } from "react";
import styles from "./myposts.module.css";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/userSlice";
import { posts } from "../../redux/features/postSlice";
import Post from "../../components/post/Post";
export default function Myposts() {
  const postsData = useSelector(posts);
  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    setAllPosts(postsData);
  }, [postsData]);
  const currentUserData = useSelector(currentUser);

  return (
    <div className={styles.posts}>
      {allPosts &&
        allPosts.map((item) => {
          if (item.author === currentUserData.username) {
            return (
              <Post
                id={item.id}
                img={item.img}
                tittle={item.tittle}
                text={item.text}
                author={item.author}
                cat={item.cat.categories}
                publicationDate={item.publicationDate}
              />
            );
          }
        })}
    </div>
  );
}
