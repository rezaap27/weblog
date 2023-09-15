import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/features/userSlice";
import { fetchWrapper } from "../../fetchWrapper";

export default function Login() {
  const dispatch = useDispatch();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setError(false);
    setFetchErr(false);
    setLoading(true);
    const response = await fetchWrapper.get("http://localhost:8000/usersList");
    if (!response.ok) {
      setFetchErr(true);
      setLoading(false);
    } else {
      const users = await response.json();
      users.map((user) => {
        if (
          user.username === inputUsername &&
          user.password === inputPassword
        ) {
          dispatch(login(user));
        } else {
          setError(true);
        }
      });
      setLoading(false);
      setFetchErr(false);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.fetchErr}>
        {fetchErr ? "something went wrong , please try again later" : ""}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
        className={styles.loginForm}
        disabled={loading ? true : false}
      >
        <span className={styles.loginTitle}>Login</span>
        <div className={styles.input}>
          <input
            id="username"
            className={styles.loginInput}
            required
            type="text"
            onChange={(e) => {
              setInputUsername(e.target.value);
            }}
          />
          <div className={styles.check}></div>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
        </div>
        <div className={styles.input}>
          <input
            id="password"
            className={styles.loginInput}
            required
            type="password"
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
          />
          <div className={styles.check}></div>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div
            className={
              error ? `${styles.error} ${styles.activeError} ` : styles.error
            }
          >
            username or password is incorrect
          </div>
        </div>
        <button
          disabled={loading ? true : false}
          className={styles.loginButton}
        >
          {loading ? "" : "Login"}
          <div className={loading ? styles.loadingOn : styles.loadingOff}></div>
        </button>
      </form>
      <button type="submit" className={styles.loginRegisterButton}>
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
/*(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            try {
              users.map((user) => {
                if (
                  user.username === inputUsername &&
                  user.password === inputPassword
                ) {
                  dispatch(login(inputUsername));
                  setError(false);
                  setLoading(false);
                } else {
                  setError(true);
                  setLoading(false);
                }
              });
            } catch {
              throw new Error("network error");
            }
          }, 1300);
        } */
