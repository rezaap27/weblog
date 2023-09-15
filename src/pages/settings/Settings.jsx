import styles from "./settings.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import gIcon from "../../assist/icons/Gear.png";
import {
  currentUser,
  updateAccount,
  logout,
} from "../../redux/features/userSlice";
import { fetchWrapper } from "../../fetchWrapper";
import * as Yup from "yup";
import { useNavigate } from "react-router";
export default function Settings() {
  const dispatch = useDispatch();
  const [Alert, setAlert] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [userInfo, setUserInfo] = useState(useSelector(currentUser));
  const [fetchErr, setFetchErr] = useState(true);
  const [loading, setLoading] = useState(false);

  const vOptions = Yup.object().shape({
    newUsername: Yup.string().when("userCheck", {
      is: true,
      then: () =>
        Yup.string()
          .required("new password is required")
          .min(4, "at least 4ch"),
      otherwise: () => Yup.string(),
    }),
    newpassword: Yup.string().when("passCheck", {
      is: true,
      then: () =>
        Yup.string()
          .required("password is required")
          .matches(/^(?=.*\s)/, "Password must not contain Whitespaces")
          .matches(
            /^(?=.*[A-Z]).*$/,
            "Password must have at least one Uppercase Character"
          )
          .matches(
            /^(?=.*[a-z])/,
            "Password must have at least one Lowercase Character"
          )
          .matches(/^(?=.*[0-9])/, "Password must contain at least one Digit")
          .matches(/^.{10,16}$/, "Password must be 10-16 Characters Long")
          .matches(
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/,
            "Password must contain at least one Special Symbol"
          ),
      otherwise: () => Yup.string(),
    }),
    confirmNewPassword: Yup.string().when("passCheck", {
      is: true,
      then: () =>
        Yup.string()
          .required("confirm password is required")
          .oneOf([Yup.ref("newpassword")], "Passwords must match"),
      otherwise: () => Yup.string(),
    }),
    userCheck: Yup.bool(),
    passCheck: Yup.bool(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vOptions) });
  const navigate = useNavigate();
  async function changePost() {
    setFetchErr(false);
    setLoading(true);
    const response = await fetchWrapper.put(
      `http://localhost:8000/UsersList/${userInfo.id}`,
      userInfo
    );
    if (!response.ok) {
      setFetchErr(true);
      setLoading(false);
    } else {
      dispatch(updateAccount(userInfo));
      setLoading(false);
      console.log(await response.json());
      navigate("/");
    }
  }
  async function deleteUser() {
    setFetchErr(false);
    setLoading(true);
    const response = await fetchWrapper.delete(
      `http://localhost:8000/UsersList/${userInfo.id}`,
      userInfo
    );
    if (!response.ok) {
      setFetchErr(true);
      setLoading(false);
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }

  function onSubmit() {
    changePost();
    return false;
  }

  function onErrors(data) {
    console.log(data);
  }

  return (
    <div className={styles.settings}>
      <div className={styles.settingsWrapper}>
        <div className={styles.settingsTitle}>
          <span className={styles.settingsTitleUpdate}>
            Update Your Account
          </span>
          <div className={styles.fetchErr}>
            {fetchErr ? "something went wrong, please try again later !!!" : ""}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onErrors)}
          className={styles.settingsForm}
        >
          <button
            disabled={loading ? true : false}
            style={loading ? { padding: "3px", backgroundColor: "gray" } : {}}
            type="button"
            className={styles.settingsTitleDelete}
            onClick={() => {
              setAlert(true);
            }}
          >
            {loading ? "" : "Delete Account"}
            <div
              className={loading ? styles.loadingOn : styles.loadingOff}
            ></div>
          </button>
          <label>Profile Picture</label>
          <div className={styles.settingsPP}>
            <img src={userInfo.prf} alt="" />
            <label htmlFor="fileInput">
              <i id={styles.settingsPPIcon} class="fa-solid fa-image"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className={styles.settingsPPInput}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  prf: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
          </div>
          <div className={styles.changeBox}>
            <div className={styles.CheckTittle}>
              Change username
              <label htmlFor="uc">
                <img
                  className={
                    userCheck
                      ? `${styles.checkIcon} ${styles.after}`
                      : styles.checkIcon
                  }
                  src={gIcon}
                  alt=""
                />
              </label>
            </div>
            <input
              id="uc"
              type="checkbox"
              className={styles.userCheck}
              style={{ display: "none" }}
              {...register("userCheck", {
                onChange: (e) => {
                  if (e.target.checked) {
                    setUserCheck(true);
                  } else {
                    setUserCheck(false);
                  }
                },
              })}
            />
            <div
              id={styles.userDisplay}
              className={
                userCheck ? styles.userCheckTrue : styles.userCheckFalse
              }
            >
              <label className={styles.label}>New Username</label>
              <input
                className={styles.settingsInput}
                type="text"
                placeholder="Enter your new username...."
                name="username"
                {...register("newUsername", {
                  onBlur: (e) => {
                    setUserInfo({ ...userInfo, username: e.target.value });
                  },
                })}
              />
              <div className={styles.err}>{errors.newUsername?.message}</div>
            </div>
            <div className={styles.CheckTittle}>
              Change password
              <label htmlFor="pc">
                <img
                  className={
                    passCheck
                      ? `${styles.checkIcon} ${styles.after}`
                      : styles.checkIcon
                  }
                  src={gIcon}
                  alt=""
                />
              </label>
            </div>
            <input
              className={styles.passCheck}
              id="pc"
              type="checkbox"
              style={{ display: "none" }}
              {...register("passCheck", {
                onChange: (e) => {
                  if (e.target.checked) {
                    setPassCheck(true);
                  } else {
                    setPassCheck(false);
                  }
                },
              })}
            />
            <div
              id={styles.passDisplay}
              className={
                passCheck ? styles.passCheckTrue : styles.passCheckFalse
              }
            >
              <label className={styles.label}>New Password</label>
              <input
                className={styles.settingsInput}
                type="text"
                placeholder="Enter your new password...."
                name="newpassword"
                {...register("newpassword", {
                  onBlur: (e) => {
                    setUserInfo({ ...userInfo, password: e.target.value });
                  },
                })}
              />
              <div className={styles.err}>{errors.newpassword?.message}</div>
              <label className={styles.label}>Repeat New Password</label>
              <input
                className={styles.settingsInput}
                type="text"
                placeholder="Re-Enter your new password...."
                name="confirmNewPassword"
                {...register("confirmNewPassword")}
              />
              <div className={styles.err}>
                {errors.confirmNewPassword?.message}
              </div>
            </div>
          </div>
          <button
            disabled={loading ? true : false}
            style={loading ? { padding: "3px", backgroundColor: "gray" } : {}}
            className={styles.settingsSubmitButton}
            type="submit"
          >
            {loading ? "" : "Submit changes"}
            <div
              className={loading ? styles.loadingOn : styles.loadingOff}
            ></div>
          </button>
        </form>
      </div>
      <div className={Alert ? styles.active : styles.unactive}>
        <div className={styles.alert}>
          <p className={styles.alertLabel}>are you sure ?</p>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                deleteUser();
              }}
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
      <Sidebar />
    </div>
  );
}
