import React, { useEffect, useState } from "react";
import styles from "./searchRes.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router";
import { fetchWrapper } from "../../fetchWrapper";
import { posts } from "../../redux/features/postSlice";
import { useSelector } from "react-redux";
import Post from "../../components/post/Post";

export default function SearchRes() {
  const location = useLocation();
  const ids = location.state;
  const idsArr = Array.from(ids);
  useEffect(() => {}, [idsArr]);
  const [allPosts, setAllPosts] = useState(useSelector(posts));
  useEffect(() => {
    const getData = async () => {
      if (!allPosts) {
        const res = await fetchWrapper.get("http://localhost:8000/PostList");
        setAllPosts(await res.json());
      }
    };
    getData();
  }, []);
  return (
    <div className={styles.searchRes}>
      <div className={styles.blur}>
        <div className={styles.posts}>
          {allPosts.map((post) => {
            if (idsArr.includes(post.id)) {
              return (
                <Post
                  id={post.id}
                  img={post.img}
                  tittle={post.tittle}
                  text={post.text}
                  author={post.author}
                  cat={post.cat.categories}
                  publicationDate={post.publicationDate}
                />
              );
            }
          })}
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
/*<div className={styles.posts}>
  {allPosts.map((post) => {
    if (idsArr.includes(post.id)) {
      return (
        <Post
          id={post.id}
          img={post.img}
          tittle={post.tittle}
          text={post.text}
          author={post.author}
          cat={post.cat.categories}
          publicationDate={post.publicationDate}
        />
      );
    }
  })}
</div>;*/
