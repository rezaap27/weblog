import Post from "../post/Post";
import styles from "./categories.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { posts, updateData } from "../../redux/features/postSlice";
import { fetchWrapper } from "../../fetchWrapper";

export default function Categories() {
  const [allPosts, setAllPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [category, setCat] = useState(location.state.cat);
  const postsData = useSelector(posts);

  useEffect(() => {
    setCat(location.state.cat);
  }, [location]);

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
    <div className={styles.categories}>
      <div
        className={styles.err}
        style={!error ? { display: "none" } : { display: "flex" }}
      >
        {error}
      </div>
      {allPosts ? (
        allPosts.map((SinglePost) => {
          if (SinglePost.cat.categories.includes(category)) {
            return (
              <>
                <Post
                  id={SinglePost.id}
                  img={SinglePost.img}
                  tittle={SinglePost.tittle}
                  text={SinglePost.text}
                  author={SinglePost.author}
                  cat={SinglePost.cat.categories}
                  publicationDate={SinglePost.publicationDate}
                />
              </>
            );
          }
        })
      ) : (
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
      )}
    </div>
  );
}

/*
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPosts, posts } from "../../redux/features/postSlice";
import Styles from "./categories.module.css";
import Post from "../post/Post";
import { fetchWrapper } from "../../fetchWrapper";

export default function Categories() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [category, setCat] = useState(location.state.cat);
  const postsData = useSelector(posts);
  const [allPosts, setAllPosts] = useState();
  useEffect(() => {
    setCat(location.state.cat);
  }, [location]);
  useEffect(async () => {
    if (!postsData) {
      const response = await fetchWrapper.get("http://localhost:8000/PostList")
      await setAllPosts(postsData.allPosts);
    } else {
      setAllPosts(postsData.allPosts);
    }
  }, []);
  return (
    <div className={Styles.categories}>
      {allPosts ? (
        allPosts.map((SinglePost) => {
          if (SinglePost.cat.categories.includes(category)) {
            return (
              <>
                <Post
                  id={SinglePost.id}
                  img={SinglePost.img}
                  tittle={SinglePost.tittle}
                  text={SinglePost.text}
                  author={SinglePost.author}
                  cat={SinglePost.cat.categories}
                  publicationDate={SinglePost.publicationDate}
                />
              </>
            );
          }
        })
      ) : (
        <div className={Styles.loading}>
          <p>loading</p>
          <div className={Styles.d}></div>
          <div className={Styles.d}></div>
          <div className={Styles.d}></div>
        </div>
      )}
    </div>
  );
}
/*{
  allPosts ? (
    allPosts.map((SinglePost) => {
      if (SinglePost.cat.categories.includes(category)) {
        return (
          <>
            <Post
              id={SinglePost.id}
              img={SinglePost.img}
              tittle={SinglePost.tittle}
              text={SinglePost.text}
              author={SinglePost.author}
              cat={SinglePost.cat.categories}
              publicationDate={SinglePost.publicationDate}
            />
          </>
        );
      }
    })
  ) : (
    <div className={Styles.loading}>
      <p>loading</p>
      <div className={Styles.d}></div>
      <div className={Styles.d}></div>
      <div className={Styles.d}></div>
    </div>
  );
}*/
