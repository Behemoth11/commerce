// @ts-ignore
import styles from "./style.module.css";
import inputStyles from "../style.module.css";
import { memo, useEffect, useRef } from "react";

interface InputProps {
  error?: {};
  name: string;
  required: boolean;
  inputValue: object;
  proposition?: object;
  submitCount?: number;
  defaultValue?: string;
  allowCapitalCase?: boolean;
  type?: "text" | "number" | "password";
  setInputValue: React.Dispatch<React.SetStateAction<{}>>;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  error,
  required,
  inputValue,
  submitCount,
  proposition,
  defaultValue,
  setInputValue,
  allowCapitalCase,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    setInputValue((prevState) => ({ ...prevState, [name]: defaultValue || "" }));
  }, [defaultValue]);

  const handleChange = (_payload) => {
    const payload = (allowCapitalCase && _payload) || _payload.toLowerCase();

    setInputValue((prevState) => ({
      ...prevState,
      [name]: payload,
    }));
  };

  const myProposition =
    proposition &&
    proposition[name]?.filter((proposition) =>
      new RegExp(inputValue[name], "i").test(proposition)
    );

  return (
    <div>
      <div className={`${inputStyles.inputContainer}`}>
        <input
          value={inputValue[name] || ""}
          name={inputValue[name]}
          id={name}
          onChange={(e) => handleChange(e.target.value)}
          className={`flex-center ${
            `${inputValue[name]}`?.length && inputStyles.filled
          } ${
            required &&
            submitCount > 0 &&
            !`${inputValue[name]}`?.length &&
            inputStyles.failure
          }`}
          ref={inputRef}
          type={type || "text"}
          autoComplete="off"
        />
        <label htmlFor={name}>{name}</label>
        {myProposition?.length > 0 && (
          <div className={inputStyles.proposition}>
            {myProposition.map((proposition) => (
              <p
                key={proposition}
                onClick={(e) => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                  handleChange(proposition);
                }}
              >
                {proposition}
              </p>
            ))}
          </div>
        )}
      </div>
      {error &&
        error[name] &&
        error[name].map((err) => <div className={styles.error}>{err}</div>)}
      <div className={inputStyles.inputArrayChoices}></div>
    </div>
  );
};
export default memo(Input);
