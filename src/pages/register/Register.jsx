import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { useEffect, useState } from "react";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { fetchWrapper } from "../../fetchWrapper";
export default function Register() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const refUser = useRef(null);
  const refEmail = useRef(null);
  const refPass = useRef(null);
  const refPassR = useRef(null);
  const [users, setUsers] = useState(null);
  const [fetchErr, setFetchErr] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    prf: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
  });

  useEffect(async () => {
    setLoading(true);
    setFetchErr(false);
    const res = await fetchWrapper.get("http://localhost:8000/usersList");
    if (!res.ok) {
      setLoading(false);
      setFetchErr(true);
    } else {
      setUsers(res.json());
      setLoading(false);
    }
  }, []);

  const validOptions = Yup.object().shape({
    username: Yup.string()
      .required("username is required")
      .min(4)
      .test(
        "userCheck",
        "This username has already been used",
        function (value) {
          let check = "";
          users.map((user) => {
            if (user.username === value) {
              check = user.username;
            }
          });
          if (value === check) {
            return false;
          } else {
            return true;
          }
        }
      ),
    email: Yup.string()
      .required("email is required")
      .matches(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "Please enter a valid email"
      )
      .email("Please enter a valid email")
      .test("emailCheck", "This Email has already been used", function (value) {
        let check = "";
        users.map((user) => {
          if (user.email === value) {
            check = user.email;
          }
        });
        if (value === check) {
          return false;
        } else {
          return true;
        }
      }),
    password: Yup.string()
      .required("Password is required")
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
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validOptions) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const [errorData, setErrorData] = useState(false);

  async function post() {
    setFetchErr(false);
    setLoading(true);
    const response = await fetchWrapper.post(
      "http://localhost:8000/UsersList",
      userInfo
    );
    if (!response.ok) {
      setFetchErr(true);
      setLoading(false);
    } else {
      const response2 = await fetchWrapper.get(
        "http://localhost:8000/UsersList"
      );
      if (!response2.ok) {
        setFetchErr(true);
        setLoading(false);
      } else {
        const data = await response2.json();
        data.map((user) => {
          if (user.username === userInfo.username) {
            dispatch(login(user));
            setLoading(false);
            setFetchErr(false);
          }
        });
      }
    }
  }

  async function onSubmit() {
    await post();
  }
  async function onErrors(data) {
    const err = await data;
    if (err) {
      setErrorData(true);
      console.log(err);
      handleSub(data);
    } else {
      setErrorData(false);
    }
  }
  function handleSub(data) {
    if (!data.username) {
      refUser.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.username) {
      refUser.current.className = `${styles.check} ${styles.invalid}`;
    }
    if (!data.email) {
      refEmail.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.email) {
      refEmail.current.className = `${styles.check} ${styles.invalid}`;
    }

    if (!data.password) {
      refPass.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.password) {
      refPass.current.className = `${styles.check} ${styles.invalid}`;
    }

    if (!data.confirmPassword) {
      refPassR.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.confirmPassword) {
      refPassR.current.className = `${styles.check} ${styles.invalid}`;
    }
  }
  function handleInput({ ref, name }) {
    if (errorData) {
      if (name && name.type === "required") {
        ref.current.className = styles.check;
      } else if (name) {
        ref.current.className = `${styles.check} ${styles.invalid}`;
      } else if (!name) {
        ref.current.className = `${styles.check} ${styles.valid}`;
      }
    }
  }
  return (
    <div className={styles.register}>
      <div
        className={styles.fetchErr}
        style={!fetchErr ? { display: "none" } : {}}
      >
        {fetchErr ? "something went wrong, please try again later" : ""}
      </div>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit(onSubmit, onErrors)}
      >
        <span className={styles.registerTitle}>Register</span>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              id="user"
              required
              className={styles.registerInput}
              type="text"
              {...register("username", {
                onBlur: (e) => {
                  handleInput({
                    ref: refUser,
                    name: errors.username,
                  });
                  setUserInfo({ ...userInfo, username: e.target.value });
                },
              })}
            />
            <label htmlFor="user" className={styles.label}>
              Username
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-user-tie`}></i>
            <div className={styles.check} ref={refUser}></div>
          </div>

          <div className={styles.err}>{errors.username?.message}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              className={styles.registerInput}
              id="email"
              type="text"
              required
              {...register("email", {
                onBlur: (e) => {
                  handleInput({
                    ref: refEmail,
                    name: errors.email,
                  });
                  setUserInfo({ ...userInfo, email: e.target.value });
                },
              })}
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-envelope`}></i>
            <div className={styles.check} ref={refEmail}></div>
          </div>

          <div className={styles.err}>{errors.email?.message}</div>
        </div>

        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              name="password"
              id="pass"
              type={show ? "text" : "password"}
              required
              {...register("password", {
                onBlur: (e) => {
                  handleInput({
                    ref: refPass,
                    name: errors.password,
                  });
                  setUserInfo({ ...userInfo, password: e.target.value });
                },
              })}
              className={styles.registerInput}
            />
            <label htmlFor="pass" className={styles.label}>
              Password
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-key`}></i>
            <i
              onClick={() => {
                if (!show) {
                  setShow(true);
                } else {
                  setShow(false);
                }
              }}
              className={
                !show
                  ? `${styles.peek} fa-solid fa-eye`
                  : `${styles.peek} fa-solid fa-eye-slash`
              }
            ></i>
            <div className={styles.check} ref={refPass}></div>
          </div>

          <div className={styles.err}>{errors.password?.message}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              name="confirmPassword"
              type={show2 ? "text" : "password"}
              id="Rpass"
              required
              {...register("confirmPassword", {
                onBlur: () => {
                  handleInput({
                    ref: refPassR,
                    name: errors.confirmPassword,
                  });
                },
              })}
              className={styles.registerInput}
            />
            <label htmlFor="Rpass" className={styles.label}>
              Confirm Password
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-key`}></i>
            <i
              onClick={() => {
                if (!show2) {
                  setShow2(true);
                } else {
                  setShow2(false);
                }
              }}
              className={
                !show2
                  ? `${styles.peek} fa-solid fa-eye`
                  : `${styles.peek} fa-solid fa-eye-slash`
              }
            ></i>
            <div className={styles.check} ref={refPassR}></div>
          </div>

          <div className={styles.err}>{errors.confirmPassword?.message}</div>
        </div>
        <div className={styles.ButtonRow}>
          <button
            className={styles.registerButton}
            disabled={loading ? true : false}
            type="submit"
          >
            {loading ? "" : "Register"}
            <div
              className={loading ? styles.loadingOn : styles.loadingOff}
            ></div>
          </button>
          <button
            disabled={loading ? true : false}
            type="button"
            onClick={() => {
              reset();
              setErrorData(false);
              refUser.current.className = styles.check;
              refEmail.current.className = styles.check;
              refPass.current.className = styles.check;
              refPassR.current.className = styles.check;
            }}
            className={styles.reset}
          >
            <i
              id={styles.resetIcon}
              className="fa-solid fa-arrow-rotate-left"
            ></i>
          </button>
        </div>
      </form>

      <button className={styles.registerLoginButton}>
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}

/*
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allUsers, registerForm } from "../../redux/features/userSlice";
import { useState } from "react";
import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PRF from "../../assist/images/prf.png";
import * as Yup from "yup";
export default function Register() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const refUser = useRef(null);
  const refEmail = useRef(null);
  const refPass = useRef(null);
  const refPassR = useRef(null);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const users = useSelector(allUsers);

  const validOptions = Yup.object().shape({
    username: Yup.string()
      .required("username is required")
      .min(4)
      .test(
        "userCheck",
        "This username has already been used",
        function (value) {
          let check = "";
          users.map((user) => {
            if (user.username === value) {
              check = user.username;
            }
          });
          if (value === check) {
            return false;
          } else {
            return true;
          }
        }
      ),
    email: Yup.string()
      .required("email is required")
      .matches(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "Please enter a valid email"
      )
      .email("Please enter a valid email")
      .test("emailCheck", "This Email has already been used", function (value) {
        let check = "";
        users.map((user) => {
          if (user.email === value) {
            check = user.email;
          }
        });
        if (value === check) {
          return false;
        } else {
          return true;
        }
      }),
    password: Yup.string()
      .required("Password is required")
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
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validOptions) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const [errorData, setErrorData] = useState(false);

  function onSubmit(data, e) {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    setTimeout(() => {
      dispatch(registerForm(userInfo));
    }, 2000);
    e.preventDefault();

    return false;
  }
  async function onErrors(data) {
    const err = await data;
    if (err) {
      setErrorData(true);
      console.log(err);
      handleSub(data);
    } else {
      setErrorData(false);
    }
  }
  function handleSub(data) {
    if (!data.username) {
      refUser.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.username) {
      refUser.current.className = `${styles.check} ${styles.invalid}`;
    }
    if (!data.email) {
      refEmail.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.email) {
      refEmail.current.className = `${styles.check} ${styles.invalid}`;
    }

    if (!data.password) {
      refPass.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.password) {
      refPass.current.className = `${styles.check} ${styles.invalid}`;
    }

    if (!data.confirmPassword) {
      refPassR.current.className = `${styles.check} ${styles.valid}`;
    } else if (data.confirmPassword) {
      refPassR.current.className = `${styles.check} ${styles.invalid}`;
    }
  }
  function handleInput1() {
    if (errorData) {
      if (!errors.username) {
        refUser.current.className = `${styles.check} ${styles.valid}`;
      } else if (errors.username) {
        refUser.current.className = `${styles.check} ${styles.invalid}`;
      }
    } else {
      refUser.current.className = styles.check;
    }
  }
  function handleInput2() {
    if (errorData) {
      if (!errors.email) {
        refEmail.current.className = `${styles.check} ${styles.valid}`;
      } else if (errors.email) {
        refEmail.current.className = `${styles.check} ${styles.invalid}`;
      }
    } else {
      refEmail.current.className = styles.check;
    }
  }
  function handleInput3() {
    if (errorData) {
      if (!errors.password) {
        refPass.current.className = `${styles.check} ${styles.valid}`;
      } else if (errors.password) {
        refPass.current.className = `${styles.check} ${styles.invalid}`;
      }
    } else {
      refPass.current.className = styles.check;
    }
  }
  function handleInput4() {
    if (errorData) {
      if (errors.confirmPassword) {
        refPassR.current.className = `${styles.check} ${styles.invalid}`;
      } else if (!errors.confirmPassword) {
        refPassR.current.className = `${styles.check} ${styles.valid}`;
      }
    } else {
      refPassR.current.className = styles.check;
    }
  }

  return (
    <div className={styles.register}>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit(onSubmit, onErrors)}
      >
        <span className={styles.registerTitle}>Register</span>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              id="user"
              required
              className={styles.registerInput}
              type="text"
              {...register("username", {
                onBlur: (e) => {
                  handleInput1();
                  setUserInfo({ ...userInfo, username: e.target.value });
                },
              })}
            />
            <label htmlFor="user" className={styles.label}>
              Username
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-user-tie`}></i>
            <div className={styles.check} ref={refUser}></div>
          </div>

          <div className={styles.err}>{errors.username?.message}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              className={styles.registerInput}
              id="email"
              type="text"
              required
              {...register("email", {
                onBlur: (e) => {
                  handleInput2();
                  setUserInfo({ ...userInfo, email: e.target.value });
                },
              })}
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-envelope`}></i>
            <div className={styles.check} ref={refEmail}></div>
          </div>

          <div className={styles.err}>{errors.email?.message}</div>
        </div>

        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              name="password"
              id="pass"
              type={show ? "text" : "password"}
              required
              {...register("password", {
                onBlur: (e) => {
                  handleInput3();
                  setUserInfo({ ...userInfo, password: e.target.value });
                },
              })}
              className={styles.registerInput}
            />
            <label htmlFor="pass" className={styles.label}>
              Password
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-key`}></i>
            <i
              onClick={() => {
                if (!show) {
                  setShow(true);
                } else {
                  setShow(false);
                }
              }}
              className={
                !show
                  ? `${styles.peek} fa-solid fa-eye`
                  : `${styles.peek} fa-solid fa-eye-slash`
              }
            ></i>
            <div className={styles.check} ref={refPass}></div>
          </div>

          <div className={styles.err}>{errors.password?.message}</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              name="confirmPassword"
              type={show2 ? "text" : "password"}
              id="Rpass"
              required
              {...register("confirmPassword", {
                onBlur: () => {
                  handleInput4();
                },
              })}
              className={styles.registerInput}
            />
            <label htmlFor="Rpass" className={styles.label}>
              Confirm Password
            </label>
            <i className={`${styles.inputIcon} fa-solid fa-key`}></i>
            <i
              onClick={() => {
                if (!show2) {
                  setShow2(true);
                } else {
                  setShow2(false);
                }
              }}
              className={
                !show2
                  ? `${styles.peek} fa-solid fa-eye`
                  : `${styles.peek} fa-solid fa-eye-slash`
              }
            ></i>
            <div className={styles.check} ref={refPassR}></div>
          </div>

          <div className={styles.err}>{errors.confirmPassword?.message}</div>
        </div>
        <div className={styles.ButtonRow}>
          <button className={styles.registerButton} type="submit">
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className={styles.reset}
          >
            <i
              id={styles.resetIcon}
              className="fa-solid fa-arrow-rotate-left"
            ></i>
          </button>
        </div>
      </form>

      <button className={styles.registerLoginButton}>
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
*/
