import { Link, useNavigate } from "react-router-dom";
import styles from "./topbar.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { user, logout } from "../../redux/features/userSlice";
import { currentUser } from "../../redux/features/userSlice";
import FaceI from "../../assist/icons/facebook.png";
import instaI from "../../assist/icons/instagram.png";
import linkI from "../../assist/icons/linkdin.png";
import tweetI from "../../assist/icons/tweeter.png";
import { Divide as Hamburger } from "hamburger-react";
import { fetchWrapper } from "../../fetchWrapper";
export default function Topbar() {
  let prfdata = useSelector(currentUser);
  const active = useSelector(user);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 850) {
        setOpen(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetchWrapper.get("http://localhost:8000/PostList");
    const posts = await res.json();
    const seachedID = new Set([]);
    posts.map((post) => {
      if (post.tittle === searchInput) {
        seachedID.add(post.id);
      }
    });
    setLoading(false);
    setSearchInput("");
    setSearchBar(false);
    navigate("/search", { state: seachedID });
  };
  return (
    <div className={styles.top}>
      <div className={styles.hMenu}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>

      <div className={styles.topLeft}>
        <img
          id={styles.facebook}
          className={styles.topIcon}
          src={FaceI}
          alt=""
        />
        <img
          id={styles.instagram}
          className={styles.topIcon}
          src={instaI}
          alt=""
        />
        <img
          id={styles.linkdin}
          className={styles.topIcon}
          src={linkI}
          alt=""
        />
        <img
          id={styles.twitter}
          className={styles.topIcon}
          src={tweetI}
          alt=""
        />
      </div>
      <div className={styles.topCenter}>
        <ul
          className={
            isOpen
              ? `${styles.topList} ${styles.open}`
              : `${styles.topList} ${styles.close}`
          }
        >
          <li onClick={() => setOpen(false)} className={styles.topListItem}>
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li onClick={() => setOpen(false)} className={styles.topListItem}>
            <Link className="link" to="myposts">
              MY POSTS
            </Link>
          </li>
          <li onClick={() => setOpen(false)} className={styles.topListItem}>
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li
            onClick={() => setOpen(false)}
            className={styles.topListItem}
            id={styles.topListItemLogin}
          >
            <Link className="link" to="/login">
              LOGIN
            </Link>
          </li>
          <li
            onClick={() => setOpen(false)}
            className={styles.topListItem}
            id={styles.topListItemRegister}
          >
            <Link className="link" to="/register">
              REGISTER
            </Link>
          </li>
          {active && (
            <li
              onClick={() => {
                dispatch(logout());
                setOpen(false);
              }}
              className={styles.topListItem}
            >
              LOGOUT
            </li>
          )}
          <li className={styles.topListItem}>
            <form className={styles.searchBarHamburger}>
              <input
                className={styles.searchInputHamburger}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput}
                type="search"
                required={true}
              />
              <button
                onClick={async(e) => {
                  e.preventDefault();
                   await handleSubmit();
                  setSearchInput("");
                  setOpen(false);
                }}
                className={styles.searchSubHamburger}
                type="submit"
              >
                <div
                  className={loading ? styles.loadingOn : styles.loadingOff}
                ></div>
                <i
                  style={loading ? { display: "none" } : {}}
                  class="fa-solid fa-magnifying-glass"
                ></i>
              </button>
            </form>
          </li>
          <li id={styles.social} className={styles.topListItem}>
            <img
              onClick={() => setOpen(false)}
              id={styles.facebook}
              className={styles.topIcon}
              src={FaceI}
              alt=""
            />
            <img
              onClick={() => setOpen(false)}
              id={styles.instagram}
              className={styles.topIcon}
              src={instaI}
              alt=""
            />
            <img
              onClick={() => setOpen(false)}
              id={styles.linkdin}
              className={styles.topIcon}
              src={linkI}
              alt=""
            />
            <img
              onClick={() => setOpen(false)}
              id={styles.twitter}
              className={styles.topIcon}
              src={tweetI}
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className={styles.topRight}>
        <div className={styles.username}>{prfdata.username}</div>
        {active ? (
          <Link className="link" to="/settings">
            <img className={styles.topImg} src={prfdata.prf} alt="" />
          </Link>
        ) : (
          <ul id={styles.signIn} className={styles.topList}>
            <li className={styles.topListItem}>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className={styles.topListItem}>
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <div className={styles.searchBar}>
          <input
            className={styles.checkB}
            type="checkbox"
            id="ch-b"
            style={{ display: "none" }}
            checked={searchBar}
            onChange={() => {
              setSearchBar(!searchBar);
            }}
          />
          <label htmlFor="ch-b">
            <div className={styles.topSearchIcon}>
              <div className={styles.topSearchIcon2}></div>
            </div>
          </label>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={styles.searchSub}
            type="submit"
          >
            <div
              className={loading ? styles.loadingOn : styles.loadingOff}
            ></div>
            <i
              style={loading ? { display: "none" } : {}}
              class="fa-solid fa-magnifying-glass"
            ></i>
          </button>
          <input
            className={styles.searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            type="search"
            required={true}
          />
        </div>
      </div>
    </div>
  );
}
/*        <div className={styles.searchBar}>
          <input
            className={styles.checkB}
            type="checkbox"
            id="ch-b"
            style={{ display: "none" }}
          />
          <label htmlFor="ch-b">
            <div className={styles.topSearchIcon}>
              <div className={styles.topSearchIcon2}></div>
            </div>
          </label>
          <button type="submit"></button>
          <input className={styles.searchInput} onChange={(e)=>{
            setSearchInput(e.target.value)
          }} value={searchInput} type="search" />
        </div> */
