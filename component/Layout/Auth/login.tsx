import axios from "axios";
import TPLogin from "./TPLogin";
import styles from "./style.module.css";
import Input from "../../Inputs/NormalInput";
import Loading from "../../LoadingController/loading";
import React, { useEffect, useRef, useState } from "react";
import { animated, useTransition, config } from "react-spring";
import { validatePassword, validateUsername } from "./validator";
import {
  useUser,
  useAuthcontext,
  useMyWindow,
} from "../../../Contexts/GlobalContext";
import { add_captchat_token } from "../../../shared/shared_functions";
import CaptChat from "../../CaptChat";

const Login = ({ inputValue, setInputValue, setHeight , active, setActive}) => {
  const [error, setError] = useState({});
  const [editState, setEditState] = useState("login");
  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();

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

    await add_captchat_token(data);
    
    const loginResponse = await axios
      .post("/api/auth/login", data)
      .catch((err) => {
        setError({ global: err.response.data.message });
      });

    if (loginResponse && loginResponse.data.userData) {
      const { token, userData, expiresAt } = loginResponse.data;
      User.setUserData(userData);
      auth.setToken({ value: token, expiresAt });

      setEditState("success");
      window.history.go(-1)
    } else setEditState("failure");
  };

  const transition = useTransition(active, {
    enter: { x: "0%" },
    leave: { x: "100%" },
    from: { x: "100%" },
    // config: config.stiff,
  });

  // console.log(myWindow.isFocused, "what is showing on the window")

  const myRef = useRef();

  useEffect(() => {
    if (active) {
      //@ts-ignore
      setHeight(myRef.current.clientHeight);
    }
  }, [active, error, myWindow.size]);

  return transition(
    (style, condition) =>
      condition && (
        <animated.div
          style={style}
          className={styles.formContainer}
          ref={myRef}
          id="#login"
        >
          <div className={styles._formContainer}>
            <h3> Se connecter a KdShop</h3>
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
              <CaptChat/>
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
              onClick={() => setActive("register")}
            >
              <p>Vous n'avez pas encore de compte?</p>
              <span>creer un compte graduit.</span>
            </div>

            <TPLogin setEditState={setEditState} />
          </div>
        </animated.div>
      )
  );
};

export default Login;
