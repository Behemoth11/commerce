import axios from "axios";
import styles from "./style.module.scss";
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
import { create_error_message, Verifier } from "../../../shared/InputChek";
import Errors from "../../Inputs/Errors";
import DynamicHeight from "../../Effect/DynamicHeight";
import Cross from "../../svg/Correct/cross";

const Register = ({ setHeight, active, setActive }) => {
  const [error, setError] = useState({});
  const [editState, setEditState] = useState("register");

  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();
  const [inputValue, setInputValue] = useState({});

  const handleSubmit = async () => {
    const data = {
      username: inputValue["username"],
      password: inputValue["password"],
      lastName: inputValue["last_name"],
      firstName: inputValue["first_name"],
      re_password: inputValue["re_password"],
    };

    const verifier = new Verifier(undefined, [
      "username",
      "password",
      "lastName",
      "firstName",
      "re_password",
    ]);
    setError({});

    console.log(inputValue);

    const { validation, error, relevant_input } = verifier.validate(data);

    const formated_errors = create_error_message(error);

    if (inputValue["re_password"] !== inputValue["password"]){
      formated_errors.push("mot de passe et verification doive etre identique")
    }

    setError([...formated_errors]);

    if (formated_errors.length > 0 ) {
      return;
    }

    setEditState("loading");

    await add_captchat_token(data);
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

  useEffect(() => {
    setError([]);
    setInputValue({})
  }, [active]);

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
            {/* <DynamicHeight isVisible={active} show={true} dependency={[error]}> */}
              <Errors errMsg={error} />
            {/* </DynamicHeight> */}

            <form className={styles.registerForm} autoComplete="off">
              <div className={styles.two}>
                <Input
                  error={error}
                  required={true}
                  label={"prenom"}
                  name="first_name"
                  inputValue={inputValue}
                  allowCapitalCase={true}
                  setInputValue={setInputValue}
                  defaultValue={null}
                />
                <Input
                  error={error}
                  required={true}
                  label="non de famille"
                  name="last_name"
                  inputValue={inputValue}
                  allowCapitalCase={true}
                  setInputValue={setInputValue}
                  defaultValue={null}
                />
              </div>
              <Input
                error={error}
                name="username"
                label="nom d'utilisateur"
                required={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={null}
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
                defaultValue={null}
              />

              <Input
                error={error}
                type="password"
                name="re_password"
                required={true}
                label="verifier mot de passe"
                allowCapitalCase={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={null}
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
          <span className={styles.cross} onClick={() => myWindow.overlay.close()}>
          <Cross showing={true} stroke="black" />
        </span>
        </animated.div>
      )
  );
};

export default Register;
