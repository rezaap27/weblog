import { Link } from "react-router-dom";
import styles from "./post.module.css";
import { useEffect, useState } from "react";

export default function Post(props) {
  let timeDiff = new Date().getTime() - props.publicationDate;
  let TimeInSeconds = Math.round(timeDiff / 1000);
  let TimeInMinutes = Math.round(timeDiff / (1000 * 60));
  let TimeInHours = Math.round(timeDiff / (1000 * 60 * 60));
  let TimeInDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
  let [passedTime, setPassedTime] = useState(() => {
    if (TimeInDays > 0) {
      return TimeInDays + " day ago";
    } else if (TimeInHours > 0) {
      return TimeInHours + " hour ago";
    } else if (TimeInMinutes > 0) {
      return TimeInMinutes + " minute ago";
    } else {
      return TimeInSeconds + " secound ago";
    }
  });
  const postData = {
    tittle: props.tittle,
    id: props.id,
    text: props.text,
    img: props.img,
    author: props.author,
    cat: props.cat,
    passedTime: passedTime,
    publicationDate: props.publicationDate,
  };
  return (
    <div className={styles.post}>
      <img
        className={styles.postImg}
        src={props.img}
        style={!props.img ? { display: "none" } : {}}
        alt=""
      />
      <div className={styles.postInfo}>
        <div
          style={props.cat.length < 1 ? { display: "none" } : {}}
          className={styles.postCats}
        >
          {postData &&
            postData.cat.map((category) => {
              return (
                <Link
                  to="/categories"
                  state={{ cat: category }}
                  className={styles.postCat}
                >
                  {category}
                </Link>
              );
            })}
        </div>
        <div className={styles.postKey}>{props.id}</div>

        <span className={styles.postTitle}>
          <Link
            id={styles.tittle}
            className="link"
            to="/single"
            state={{ postData }}
          >
            {props.tittle}
          </Link>
        </span>
        <span className={styles.postDate}>{passedTime}</span>
      </div>
      <p
        style={!props.img ? { maxHeight: "180px", WebkitLineClamp: "6" } : {}}
        className={styles.postDesc}
      >
        {" "}
        {props.text}
      </p>
    </div>
  );
}
/*      <img className={styles.postImg} src={props.img} alt="" />
      <div className={styles.postInfo}>
        <div className={styles.postCats}>
          {postData && postData.cat.map((category) => {
            return (
              <Link
                to={{ pathname: "/categories", state: { cat: category } }}
                className={styles.postCat}
              >
                {category}
              </Link>
            );
          })}
          <div className={styles.postKey}>{props.id}</div>
        </div>

        <span className={styles.postTitle}>
          <Link
            to={{ pathname: "/single", state: { postData } }}
            className="link"
          >
            {props.tittle}
          </Link>
        </span>
        <span className={styles.postDate}>{passedTime}</span>
      </div>
      <p className={styles.postDesc}> {props.text}</p> */
