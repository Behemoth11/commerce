import LoadingController from "../component/LoadingController";
import { checkForm } from "../shared/UtilityFunctions";
import Input from "../component/Inputs/NormalInput";
import TextArea from "../component/Inputs/TextArea";
import React, { useState, useEffect } from "react";
import Errors from "../component/Inputs/Errors";
import axios from "axios";

function Feedback() {
  const [inputValue, setInputValue] = useState({
    focus: [],
    message: "",
  });

  const [inputState, setInputState] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [errors, setErrors] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = async () => {
    setErrors([])
    setSubmitCount((prevState) => prevState + 1);
    const errors = [];
    
    checkForm(inputValue, {}, errors);
    if (errors.length > 0) {
      return setErrors(errors);
    }
    
    setInputState("loading");

    const response = await axios.post(
      "/api/feedback",
      {
        focus: inputValue.focus,
        msg: inputValue.message,
      }
    );

    if (response) {
      const responseData = response.data?.error;
      //console.log(response)
      if (responseData.length == 0) {
        setInputState("success");
        setSubmitCount(0);
      }
      else {
        setInputState("failure");
      }
    } else setInputState("failure");
  };

  useEffect(() => {
    document.getElementById("__next").scroll(0,0)
  }, [inputState])

  return (
    <div className="big-container">
      <LoadingController
        state={inputState}
        setState={setInputState}
        pseudoStateDuration={1500}
        customMessage={{
          success: "Message received",
          failure: "Something went wrong.",
        }}
      >
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <h3
            style={{
              textAlign: "center",
              textDecoration: "underline",
              margin: "var(--larger-margin) 0",
            }}
          >
           Écrivez vos commentaires dans la case ci-dessous
          </h3>
          <div style={{ padding: "var(--padding)" }}>
            <Input
              name={"focus"}
              required={true}
              proposition={undefined}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
              />
            <TextArea
              name={"message"}
              required={true}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            <button className="button" onClick={handleSubmit}>
            Envoyer le commentaire
            </button>
          </div>
          <Errors errMsg={errors} />
        </div>
      </LoadingController>
    </div>
  );
}

export default Feedback;
