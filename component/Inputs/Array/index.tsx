// @ts-ignore
import styles from "./style.module.scss";
import inputStyles from "../style.module.scss";
import React, { memo, useEffect, useRef, useState } from "react";
import { clamp } from "../../../shared/shared_functions";

interface InputProps {
  name: string;
  label?: string;
  required: boolean;
  inputValue: object;
  submitCount?: number;
  proposition?: object;
  type?: "text" | "number" | "date";
  inputProps?: { [key: string]: any };
  setInputValue: React.Dispatch<React.SetStateAction<{}>>;
}

const InputArray: React.FC<InputProps> = ({
  type,
  name,
  label,
  required,
  inputProps,
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
      let previous_value = prevState[name] || [];
      if (type === "number") {
        data = clamp(data, inputProps.min, inputProps.max).toString();
      }
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
          onChange={(e) => {
            // if (type === "nfumber")
            //   setPersonalState(
            //     clamp(e.target.value, inputProps.min, inputProps.max).toString()
            //   );
            // else {
            setPersonalState(e.target.value.toLowerCase());
            // }
          }}
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
          {...inputProps}
        />
        <label htmlFor={name}>
          {label || name} {!required && "(optional)"}
        </label>
        {myProposition?.length > 0 ||
          (!proposition && (
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
