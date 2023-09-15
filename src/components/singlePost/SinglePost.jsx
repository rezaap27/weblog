import { Link } from "react-router-dom";
import styles from "./singlePost.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { currentUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { updateData } from "../../redux/features/postSlice";
import { fetchWrapper } from "../../fetchWrapper";

export default function SinglePost(props) {
  const dispatch = useDispatch();
  const currentUserData = useSelector(currentUser);
  const postData = {
    tittle: props.tittle,
    id: props.id,
    text: props.text,
    img: props.img,
    author: props.author,
    cat: props.cat,
    publicationDate: props.publicationDate,
    passedTime: props.passedTime,
  };
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const manageData = async () => {
    const response = await fetchWrapper.delete(
      `http://localhost:8000/PostList/${props.id}`
    );
    if (!response.ok) {
      setErr(true);
    } else {
      const response2 = await fetchWrapper.get(
        "http://localhost:8000/PostList"
      );
      if (!response2.ok) {
        setErr(true);
      } else {
        dispatch(updateData(await response2.json()));
        setErr(false);
        navigate("/");
      }
    }
    setLoading(false);
  };
  const deletePost = () => {
    setErr(false);
    setLoading(true);
    manageData();
  };

  const [alert, setAlert] = useState(false);
  return (
    <div className={styles.singlePost}>
      <div className={styles.singlePostWrapper}>
        <div className={styles.image}>
          <img className={styles.singlePostImg} src={props.img} alt="" />
        </div>
        <div className={styles.singlePostData}>
          <div
            style={!err ? { display: "none" } : { display: "block" }}
            className={styles.err}
          >
            Something went wrong
          </div>
          <h1 className={styles.singlePostTitle}>
            {props.tittle}
            <div className={styles.singlePostEdit}>
              <Link to="/edit" state={{ postData }} className="link">
                {currentUserData.username === props.author && (
                  <i
                    className={`${styles.editIcon} ${styles.singlePostIcon} far fa-edit`}
                  ></i>
                )}
              </Link>
              {currentUserData.username === props.author && (
                <div
                  onClick={() => {
                    setAlert(true);
                  }}
                  className={`${loading && styles.loadingOn} ${
                    !loading && styles.deleteIcon
                  } ${!loading && styles.singlePostIcon}
                    ${!loading && "far fa-trash-alt"}
                    `}
                ></div>
              )}
            </div>
          </h1>
          <div className={styles.singlePostInfo}>
            <span>
              Author :
              <b className={styles.singlePostAuthor}>{props.author}</b>
            </span>
            <hr className={styles.dottedLine}></hr>
            <span>{postData.passedTime}</span>
          </div>
          <div className={styles.postsCat}>
            {postData.cat.map((item) => {
              return (
                <Link
                  to={{ pathname: "/categories", state: { cat: item } }}
                  className="link"
                >
                  <p className={styles.singleCat}>#{item}</p>
                </Link>
              );
            })}
          </div>
          <hr className={styles.dottedLine2}></hr>
          <div className={styles.singlePostDesc}>{props.text}</div>
        </div>
      </div>
      <div className={alert ? styles.active : styles.unactive}>
        <div className={styles.alert}>
          <p className={styles.alertLabel}>are you sure ?</p>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                deletePost();
                setAlert(false);
              }}
              disabled={loading ? true : false}
              className={`${styles.alertButtons} ${styles.yes}`}
            >
              Yes
            </button>

            <button
              onClick={() => {
                setAlert(false);
              }}
              className={`${styles.alertButtons} ${styles.no}`}
            >
              No!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
