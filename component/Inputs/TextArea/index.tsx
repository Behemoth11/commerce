// @ts-ignore
import styles from "./style.module.css";
import inputStyles from "../style.module.css";
import { memo, useEffect, useRef } from "react";

interface InputProps {
  name: string;
  required: boolean;
  inputValue: object;
  proposition?: object;
  submitCount?: number;
  setInputValue: React.Dispatch<React.SetStateAction<{}>>;
}

const TextArea: React.FC<InputProps> = ({
  name,
  required,
  inputValue,
  submitCount,
  setInputValue,
}) => {
  useEffect(() => {
    setInputValue((inputValue) => ({ ...inputValue, [name]: "" }));
  }, []);

  const handleTextAreachange = (data) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [name]: data,
      };
    });
  };

  return (
    <>
      <div className={`${inputStyles.inputContainer} ${inputStyles.textArea} `}>
        <textarea
          value={inputValue[name] || ""}
          name={inputValue[name]}
          id={name}
          onChange={(e) => handleTextAreachange(e.target.value)}
          className={`flex-center ${inputStyles.filled} ${
            required &&
            submitCount > 0 &&
            !inputValue[name]?.length &&
            inputStyles.failure
          }`}
        />
        <label htmlFor={name}>{name}</label>
      </div>
    </>
  );
};

export default memo(TextArea);
