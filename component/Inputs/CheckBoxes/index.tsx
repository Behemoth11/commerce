// @ts-ignore
import styles from "./style.module.scss";
// import inputStyles from "../style.module.scss";
import { memo, useEffect, useRef } from "react";
import Box from "./box";

interface InputProps {
  name: string;
  label?: string;
  choices: { name: string; label: string }[];
  inputValue: object;
  default_checked?: Object;
  setInputValue: React.Dispatch<React.SetStateAction<{}>>;
}

const CheckboxInput: React.FC<InputProps> = ({
  name,
  label,
  choices,
  inputValue,
  setInputValue,
  default_checked,
}) => {
  useEffect(() => {
    setInputValue((prevState) => ({
      ...prevState,
      [name]: default_checked || {},
    }));
  }, []);

  const handleChange = (label) => {
    setInputValue((prevState) => {
      // console.log(prevState);
      let myState = prevState[name] || {};
      myState = { ...myState };
      const oldValue = myState[label] || false;

      myState[label] = !oldValue;

      return { ...prevState, [name]: myState };
    });
  };

  return (
    <div className={`${styles.inputContainer}`}>
      <h2>{label || name}</h2>
      <form>
        {choices.map((choice) => (
          <Box
            id={choice.name + name}
            name={choice.name}
            label={choice.label}
            checked={
              (inputValue[name] && inputValue[name][choice.name]) || false
            }
            onChange={() => handleChange(choice.name)}
          />
        ))}
      </form>
    </div>
  );
};
export default memo(CheckboxInput);
