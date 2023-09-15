import Post from "../post/Post";
import styles from "./posts.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { posts, updateData } from "../../redux/features/postSlice";
import { fetchWrapper } from "../../fetchWrapper";

export default function Posts() {
  const [allPosts, setAllPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const postsData = useSelector(posts);
  async function getData() {
    setLoading(true);
    const response = await fetchWrapper.get("http://localhost:8000/PostList");
    if (!response.ok) {
      dispatch(updateData(null));
      setError(response.statusText);
      setLoading(false);
    } else {
      dispatch(updateData(await response.json()));
      setLoading(false);
      setError(null);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setAllPosts(postsData);
  }, [postsData]);

  return (
    <div className={styles.posts}>
      <div
        className={styles.err}
        style={!error ? { display: "none" } : { display: "flex" }}
      >
        {error}
      </div>
      {allPosts &&
        !error &&
        allPosts.map((post) => {
          return (
            <>
              <Post
                id={post.id}
                img={post.img}
                tittle={post.tittle}
                text={post.text}
                author={post.author}
                cat={post.cat.categories}
                publicationDate={post.publicationDate}
              />
            </>
          );
        })}
      <div
        className={styles.refreshPage}
        style={!loading ? { display: "none" } : { display: "flex" }}
      >
        <div className={styles.loading}>
          <p>loading</p>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}
/*
    <div className={styles.posts}>
      {postsStatus === "succeeded" && allPosts ? (
        allPosts.map((post) => {
          return (
            <>
              <Post
                id={post.id}
                img={post.img}
                tittle={post.tittle}
                text={post.text}
                author={post.author}
                cat={post.cat.categories}
                publicationDate={post.publicationDate}
              />
            </>
          );
        })
      ) : postsStatus === "loading" ? (
        <div className={styles.loading}>
          <p>loading</p>
          <div className={styles.d}></div>
          <div className={styles.d}></div>
          <div className={styles.d}></div>
        </div>
      ) : (
        postsStatus === "failed" && (
          <div className={styles.fail}>
            <p>network error</p>
          </div>
        )
      )}
    </div>
*/
