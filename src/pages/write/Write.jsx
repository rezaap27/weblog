import styles from "./write.module.css";
import { useNavigate } from "react-router-dom";
import { updateData } from "../../redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { currentUser } from "../../redux/features/userSlice";
import BI from "../../assist/images/write.jpg";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../../fetchWrapper";

export default function Write() {
  const dispatch = useDispatch();
  const [cats, setCats] = useState([]);
  const [inputValue, setInputVaue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const currentUserData = useSelector(currentUser);
  const [postData, setPostData] = useState({
    tittle: "",
    text: "",
    img: "https://images.theconversation.com/files/407039/original/file-20210617-15-2h4ak3.jpg?ixlib=rb-1.1.0&rect=0%2C10%2C3500%2C2321&q=45&auto=format&w=926&fit=clip",
    cat: { categories: [] },
    author: currentUserData.username,
    publicationDate: new Date().getTime(),
  });

  const validate = Yup.object().shape({
    tittle: Yup.string()
      .required("Tittle field must not be empty")
      .min(10, "Tittle minimum 10 characters")
      .max(25, "Tittle maximum 25 characters"),
    text: Yup.string()
      .required("Story field must not be empty")
      .min(50, "Story minimum 50 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validate) });
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    const response = await fetchWrapper.post(
      "http://localhost:8000/PostList",
      postData
    );
    if (!response.ok) {
      setFetchErr(true);
      setLoading(false);
    } else {
      const response2 = await fetchWrapper.get(
        "http://localhost:8000/PostList"
      );
      if (!response.ok) {
        setFetchErr(true);
        setLoading(false);
      } else {
        dispatch(updateData(await response2.json()));
        setFetchErr(false);
        setLoading(false);
        navigate("/");
      }
    }
  };
  const onSubmit = async () => {
    fetchData();
  };

  const Item = cats.map((item, index) => {
    return (
      <p
        onClick={() => {
          setCats((currentCat) => currentCat.filter((item, i) => i !== index));
        }}
        className={styles.singleCat}
      >
        #{item}
      </p>
    );
  });
  useEffect(() => {
    setPostData({ ...postData, cat: { categories: cats } });
  }, [cats]);

  return (
    <div className={styles.write} style={{ backgroundImage: `url(${BI})` }}>
      <div className={styles.writeImg}>
        <img src={postData.img} alt="There is no Preview to display" />
        <label htmlFor="fileInput">
          <i id={styles.addPhotoIcon} className="fas fa-plus"></i>
        </label>
        <i
          onClick={() => {
            setPostData({ ...postData, img: "" });
          }}
          className="far fa-trash-alt"
          id={styles.deletePhotoIcon}
        ></i>
      </div>
      <div
        style={fetchErr ? { display: "block" } : { display: "none" }}
        className={styles.fetchErr}
      >
        Something went wrong, please try again later
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.writeForm}>
        <div className={styles.Categoty}>
          <div className={styles.catDisplay}>{Item}</div>
          <div className={styles.addCategory}>
            <input
              value={inputValue}
              onChange={(e) => {
                setInputVaue(e.target.value);
              }}
              type="text"
              placeholder="categories...."
            ></input>
            <div
              onClick={() => {
                if (cats.length < 3 && inputValue !== "") {
                  setCats((el) => [...el, inputValue]);
                }
                setInputVaue("");
              }}
              className={styles.iconBox}
            >
              <i className={`${styles.addCatIcon} fa-solid fa-plus`}></i>
            </div>
          </div>
        </div>
        <div
          style={!errors.tittle ? { padding: "0" } : {}}
          className={styles.err}
        >
          {errors.tittle?.message}
        </div>
        <div
          style={!errors.text ? { padding: "0" } : {}}
          className={styles.err}
        >
          {errors.text?.message}
        </div>
        <div className={styles.writeFormGroup}>
          <input
            id="fileInput"
            onChange={(e) => {
              setPostData({
                ...postData,
                img: URL.createObjectURL(e.target.files[0]),
              });
            }}
            type="file"
            style={{ display: "none" }}
          />
          <input
            className={styles.writeInput}
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={postData.tittle}
            {...register("tittle", {
              onChange: (e) => {
                setPostData({ ...postData, tittle: e.target.value });
              },
            })}
          />
          <button
            disabled={loading ? true : false}
            className={styles.writeSubmit}
            type="submit"
          >
            {loading ? "" : "Publish"}
            <div
              className={loading ? styles.loadingOn : styles.loadingOff}
            ></div>
          </button>
        </div>
        <div className={styles.writeFormGroup}>
          <textarea
            className={`${styles.writeInput} ${styles.writeText}`}
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            value={postData.text}
            {...register("text", {
              onChange: (e) => {
                setPostData({ ...postData, text: e.target.value });
              },
            })}
          />
        </div>
      </form>
    </div>
  );
}
