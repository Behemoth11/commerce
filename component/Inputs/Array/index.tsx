// @ts-ignore
import styles from "./style.module.css";
import inputStyles from "../style.module.css";
import React, { memo, useEffect, useRef, useState } from "react";

interface InputProps {
  name: string;
  required: boolean;
  inputValue: object;
  proposition?: object;
  submitCount?: number;
  type?: "text" | "number" | "filte";
  setInputValue: React.Dispatch<React.SetStateAction<{}>>;
}

const InputArray: React.FC<InputProps> = ({
  type,
  name,
  required,
  inputValue,
  submitCount,
  proposition,
  setInputValue,
}) => {
  const [personalState, setPersonalState] = useState("");
  const inputRef = useRef();

  //stateInitialization in the parent state container
  useEffect(() => {
    setInputValue((prevState) => ({ ...prevState, [name]: [] }));
  }, []);

  /*********************utilities functions************************/
  const addData = (e, data) => {
    e.preventDefault();
    // @ts-ignore
    inputRef.current.focus();
    if (data.length <= 0) return;
    setPersonalState("");
    setInputValue((prevState) => {
      const previous_value = prevState[name] || []
      if (new RegExp(data, "i").test(previous_value)) return prevState;
      return {
        ...prevState,
        [name]: [...previous_value, data],
      };
    });
  };

  const rmData = (index) => {
    // @ts-ignore
    inputRef?.current?.focus();
    setInputValue((prevState) => ({
      ...prevState,
      [name]: [
        ...prevState[name].slice(0, index),
        ...prevState[name].slice(index + 1),
      ],
    }));
  };

  const myProposition =
    proposition &&
    proposition[name]?.filter(
      (proposition) =>
        new RegExp(personalState, "i").test(proposition) &&
        !inputValue[name]?.includes(proposition)
    );

  return (
    <>
      <div className={`${inputStyles.inputContainer}`}>
        <input
          value={personalState}
          name={inputValue[name]}
          id={name}
          onChange={(e) => setPersonalState(e.target.value.toLowerCase())}
          className={`flex-center ${
            personalState?.length && inputStyles.filled
          } ${
            required &&
            submitCount > 0 &&
            !inputValue[name]?.length &&
            inputStyles.failure
          }`}
          ref={inputRef}
          type={type || "text"}
          autoComplete="off"
        />
        <label htmlFor={name}>{name} {!required && "(optional)"}</label>
        {(myProposition?.length > 0|| !proposition && (
            <button
              className={inputStyles.addButtonArray}
              onClick={(e) => addData(e, personalState)}
            >
              add
            </button>
          )) || (
            <button
              className={inputStyles.createProposition}
              onClick={(e) => addData(e, personalState)}
            >
              create
            </button>
          )}
        {myProposition?.length > 0 && (
          <div className={inputStyles.proposition}>
            {myProposition.map((proposition) => (
              <p key={proposition} onClick={(e) => addData(e, proposition)}>
                {proposition}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={inputStyles.inputArrayChoices}>
        {inputValue[name]?.map((element, index) => (
          <p key={index} onClick={() => rmData(index)}>
            {element}
          </p>
        ))}
      </div>
    </>
  );
};

export default memo(InputArray);
