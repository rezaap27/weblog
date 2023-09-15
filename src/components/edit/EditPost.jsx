import styles from "./editPost.module.css";
import { useLocation } from "react-router-dom";
import { updateData } from "../../redux/features/postSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BI from "../../assist/images/edit.jpg";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchWrapper } from "../../fetchWrapper";

export default function EditPost() {
  const location = useLocation();
  const Data = location.state.postData;
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    tittle: Data.tittle,
    id: Data.id,
    text: Data.text,
    img: Data.img,
    author: Data.author,
    cat: { categories: Data.cat },
    publicationDate: Data.publicationDate,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const editPost = async () => {
    setLoading(true);
    const response = await fetchWrapper.put(
      `http://localhost:8000/PostList/${postData.id}`,
      postData
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

  const validate = Yup.object().shape({
    newTittle: Yup.string()
      .required("The new title field must not be empty")
      .min(10, "Minimum 10 characters")
      .max(25, "Maximum 25 characters"),
    newText: Yup.string()
      .required("The new story field must not be empty")
      .min(10, "Minimum 50 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validate) });
  const onSubmit = () => {
    editPost();
  };
  return (
    <div className={styles.edit} style={{ backgroundImage: `url(${BI})` }}>
      <div className={styles.editImg}>
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
      <div className={styles.errBox}>
        <div
          style={
            !errors.newTittle
              ? { height: "0", fontSize: "0", padding: "0" }
              : {}
          }
          className={styles.err}
        >
          {errors.newTittle?.message}
        </div>
        <div
          style={
            !errors.newText ? { height: "0", fontSize: "0", padding: "0" } : {}
          }
          className={styles.err}
        >
          {errors.newText?.message}
        </div>
      </div>
      <div
        style={!err ? { display: "none" } : { display: "block" }}
        className={styles.fetchErr}
      >
        Something went wrong , please try again later
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
        <div className={styles.editFormGroup}>
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
            spellCheck={false}
            placeholder="Title"
            type="text"
            autoFocus={true}
            defaultValue={postData.tittle}
            {...register("newTittle", {
              onChange: (e) => {
                setPostData({ ...postData, tittle: e.target.value });
              },
            })}
          />
          <button
            disabled={loading ? true : false}
            className={styles.editSubmit}
            type="submit"
          >
            {loading ? "" : "Publish"}
            <div
              className={loading ? styles.loadingOn : styles.loadingOff}
            ></div>
          </button>
        </div>

        <div className={styles.editFormGroup}>
          <textarea
            spellCheck={false}
            placeholder="Tell your story..."
            type="text"
            defaultValue={postData.text}
            {...register("newText", {
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
