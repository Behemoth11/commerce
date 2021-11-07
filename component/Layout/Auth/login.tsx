import axios from "axios";
import styles from "./style.module.css";
import Input from "../../Inputs/NormalInput";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import { validatePassword, validateUsername } from "./validator";
import { animated, useTransition, config } from "react-spring";
import TPLogin from "./TPLogin";
import Loading from "../../LoadingController/loading";

const Login = ({ inputValue, setInputValue, setHeight }) => {
  const [error, setError] = useState({});
  const [editState, setEditState] = useState("login");
  const { User, auth, myWindow } = useGlobalContext();

  const handleSubmit = async () => {
    const data = {
      username: inputValue["user name"],
      password: inputValue["password"],
    };
    const error_password = validatePassword(data.password);
    const error_username = validateUsername(data.username);

    if (error_password || error_username) {
      setError({ password: error_password, username: error_username });
    }
    setEditState("loading");

    const loginResponse = await axios
      .post("/api/auth/login", data)
      .catch((err) => {
        setError({ global: "wrong User name or password" });
      });

    if (loginResponse && loginResponse.data.userData) {
      const { token, userData, expiresAt } = loginResponse.data;
      User.setUserData(userData);
      auth.setToken({ value: token, expiresAt });

      setEditState("success");
      myWindow.setIsShown("closed");
      myWindow.overlay.close()
    } else setEditState("failure");
  };

  const transition = useTransition(myWindow.isShown == "login", {
    enter: { x: "0%" },
    leave: { x: "100%" },
    from: { x: "100%" },
    // config: config.stiff,
  });

  const myRef = useRef();

  useEffect(() => {
    if (myWindow.isShown == "login") {
      //@ts-ignore
      setHeight(myRef.current.clientHeight);
    }
  }, [myWindow.isShown, error, myWindow.size]);

  return transition(
    (style, condition) =>
      condition && (
        <animated.div
          style={style}
          className={styles.formContainer}
          ref={myRef}
        >
          <div className={styles._formContainer}>
            <h3> Login KdShop</h3>
            <form className={styles.loginForm}>
              <Input
                name="user name"
                required={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={inputValue["user name"]}
              />
              <Input
                type="password"
                name="password"
                required={true}
                allowCapitalCase={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={inputValue["password"]}
              />
            </form>
            {
              //@ts-ignore
              error.global && (
                //@ts-ignore
                <div className={styles.error}>*{error.global}</div>
              )
            }
            <button className={styles.validate} onClick={handleSubmit}>
             <span>Login</span>
              <Loading width={editState == "loading" ? "4em" : "0"} />
            </button>

            <div
              className={styles.else}
              onClick={() => myWindow.setIsShown("register")}
            >
              <p>Don't yet have an Accout?</p>
              <span>create an account.</span>
            </div>

            <TPLogin setEditState={setEditState} />
          </div>
        </animated.div>
      )
  );
};

export default Login;
