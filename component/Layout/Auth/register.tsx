import axios from "axios";
import styles from "./style.module.css";
import Input from "../../Inputs/NormalInput";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../Contexts/GlobalContext";
import { validatePassword, validateUsername } from "./validator";
import { useTransition, animated, config } from "react-spring";
import TPLogin from "./TPLogin";

const Register = ({ inputValue, setInputValue, setHeight }) => {
  const [error, setError] = useState({});
  const [editState, setEditState] = useState("register");
  const { User, auth, myWindow } = useGlobalContext();

  const handleSubmit = async () => {
    const data = {
      username: inputValue["username"],
      password: inputValue["password"],
      lastName: inputValue["Last Name"],
      firstName: inputValue["First Name"],
    };
    setError({});
    const error_password = validatePassword(data.password);
    const error_username = validateUsername(data.username);

    if (error_password.length > 0 || error_username.length > 0) {
      return setError({ password: error_password, username: error_username });
    }
    setEditState("loading");

    const registerResponse = await axios
      .post("/api/auth/register", data)
      .catch((err) => setError({ username: [err.response.data.message] }));

    if (registerResponse && registerResponse.data.userData) {
      const { token, userData, expiresAt } = registerResponse.data;
      User.setUserData(userData);
      auth.setToken({ value: token, expiresAt });

      setEditState("success");
      myWindow.setIsShown("closed");
    } else setEditState("failure");
  };

  const transition = useTransition(myWindow.isShown == "register", {
    enter: { x: "0%" },
    leave: { x: "100%" },
    from: { x: "100%" },
    config: config.stiff,
  });

  const myRef = useRef();

  useEffect(() => {
    if (myWindow.isShown == "register") {
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
            <h3> Register your accout</h3>
            <form className={styles.registerForm}>
              <div className={styles.two}>
                <Input
                  error={error}
                  name="First Name"
                  required={true}
                  inputValue={inputValue}
                  allowCapitalCase={true}
                  setInputValue={setInputValue}
                />
                <Input
                  error={error}
                  name="Last Name"
                  required={true}
                  inputValue={inputValue}
                  allowCapitalCase={true}
                  setInputValue={setInputValue}
                />
              </div>
              <Input
                error={error}
                name="username"
                required={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />

              <Input
                error={error}
                type="password"
                name="password"
                required={true}
                allowCapitalCase={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
              <div className={styles.terms}>
                <p>
                  By registering, you agree with our{" "}
                  <span>The term of utilisations</span>
                </p>
              </div>
            </form>
            <button className={styles.validate} onClick={handleSubmit}>
              register
              <div
                className={`${styles.spinner} ${
                  editState == "loading" && styles.spin
                }`}
              ></div>
            </button>
            <div
              className={styles.else}
              onClick={() => myWindow.setIsShown("login")}
              >
              <p>Already have an accout?</p>
              <span>Login into you acout</span>
            </div>
              <TPLogin/>
          </div>
        </animated.div>
      )
  );
};

export default Register;
