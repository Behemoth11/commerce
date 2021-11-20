import axios from "axios";
import styles from "./style.module.css";
import Input from "../../Inputs/NormalInput";
import React, { useEffect, useRef, useState } from "react";
import { validatePassword, validateUsername } from "./validator";
import { useTransition, animated, config } from "react-spring";
import TPLogin from "./TPLogin";
import Loading from "../../LoadingController/loading";
import {
  useUser,
  useAuthcontext,
  useMyWindow,
} from "../../../Contexts/GlobalContext";
import { add_captchat_token } from "../../../shared/shared_functions";

const Register = ({
  inputValue,
  setInputValue,
  setHeight,
  active,
  setActive,
}) => {
  const [error, setError] = useState({});
  const [editState, setEditState] = useState("register");

  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();

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

    await add_captchat_token(data)
    const registerResponse = await axios
      .post("/api/auth/register", data)
      .catch((err) => setError({ username: [err.response.data.message] }));

    if (registerResponse && registerResponse.data.userData) {
      const { token, userData, expiresAt } = registerResponse.data;
      User.setUserData(userData);
      auth.setToken({ value: token, expiresAt });

      setEditState("success");
      window.history.go(-1);
    } else setEditState("failure");
  };

  const transition = useTransition(active, {
    enter: { x: "0%" },
    leave: { x: "100%" },
    from: { x: "100%" },
    // config: config.stiff,
  });

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
        >
          <div className={styles._formContainer}>
            <h3> Creer a compte gratuit !</h3>
            <form className={styles.registerForm}>
              <div className={styles.two}>
                <Input
                  error={error}
                  required={true}
                  label={"prenom"}
                  name="First Name"
                  inputValue={inputValue}
                  allowCapitalCase={true}
                  setInputValue={setInputValue}
                  defaultValue={inputValue["First Name"]}
                />
                <Input
                  error={error}
                  required={true}
                  label="non de famille"
                  name="Last Name"
                  inputValue={inputValue}
                  allowCapitalCase={true}
                  setInputValue={setInputValue}
                  defaultValue={inputValue["Last Name"]}
                />
              </div>
              <Input
                error={error}
                name="username"
                label="nom d'utilisateur"
                required={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={inputValue["username"]}
              />

              <Input
                error={error}
                type="password"
                name="password"
                required={true}
                label="mot de passe"
                allowCapitalCase={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={inputValue["password"]}
              />
              <div className={styles.terms}>
                <p>
                  En creant un compte vous accepter
                  <span>condition d'utilisations</span> et politique de
                  confidentialité
                </p>
              </div>
            </form>
            <button className={styles.validate} onClick={handleSubmit}>
              <span>Creer mon compte</span>
              <Loading width={editState == "loading" ? "4em" : "0"} />
            </button>
            <div className={styles.else} onClick={() => setActive("login")}>
              <p>Vous avez deja un compte</p>
              <span>conectez vous a votre compte</span>
            </div>
            <TPLogin setEditState={setEditState} />
          </div>
        </animated.div>
      )
  );
};

export default Register;
