import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import img from "../../assist/images/about.jpg";
import FaceI from "../../assist/icons/facebook.png";
import instaI from "../../assist/icons/instagram.png";
import linkI from "../../assist/icons/linkdin.png";
import tweetI from "../../assist/icons/tweeter.png";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>ABOUT ME</span>
        <img src={img} alt="not found" />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>CATEGORIES</span>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>
            <Link className="link" to="/categories" state={{ cat: "life" }}>
              Life
            </Link>
          </li>
          <li className={styles.sidebarListItem}>
            <Link className="link" to="/categories" state={{ cat: "music" }}>
              Music
            </Link>
          </li>
          <li className={styles.sidebarListItem}>
            <Link className="link" to="/categories" state={{ cat: "sport" }}>
              Sport
            </Link>
          </li>
          <li className={styles.sidebarListItem}>
            <Link className="link" to="/categories" state={{ cat: "style" }}>
              Style
            </Link>
          </li>
          <li className={styles.sidebarListItem}>
            <Link className="link" to="/categories" state={{ cat: "tech" }}>
              Tech
            </Link>
          </li>
          <li className={styles.sidebarListItem}>
            <Link
              className="link"
              to="/categories"
              state={{ category: "cinema" }}
            >
              Cinema
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>FOLLOW US</span>
        <div className={styles.sidebarSocial}>
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
      </div>
    </div>
  );
}
