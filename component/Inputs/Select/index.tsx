// @ts-ignore
import styles from "./style.module.scss";
import inputStyles from "../style.module.scss";
import { memo, useEffect, useRef, createContext, useContext } from "react";

interface InputProps {
  error?: {};
  min?: string;
  name: string;
  label?: string;
  required: boolean;
  inputValue: object;
  placeholder?: string;
  proposition?: object;
  submitCount?: number;
  defaultValue?: string;
  children: React.ReactNode;
  allowCapitalCase?: boolean;
  type?: "text" | "number" | "password" | "date";
  setInputValue: React.Dispatch<React.SetStateAction<{}>>;
}

const SelectContext = createContext({});

const InputSelect: React.FC<InputProps> = ({
  name,
  label,
  children,
  inputValue,
  defaultValue,
  setInputValue,
}) => {
  // const inputRef = useRef<HTMLInputElement>();

  const handleChange = (e) => {
    // console.log(e.target.value)
    console.log(inputValue)
    setInputValue(prevState => {
      return {...prevState, [name]: e.target.value}
    })
  }

  useEffect(() => {
    setInputValue(prevState => {
      return {...prevState, [name]: defaultValue ||""}
    })
  }, [])

  return (
    <div className={` ${inputStyles.inputContainer}`}>
      <select value={inputValue[name]} onChange={handleChange} className={`${inputValue[name] && inputStyles.filled} ${styles.input_ctn}`}>
        <SelectContext.Provider value={{}}>{children}</SelectContext.Provider>
      </select>
      <label>{label}</label>
    </div>
  );
};

interface OptionProps {}

export const MyOption = (props) => {
  const {} = useContext(SelectContext);
  return <option {...props}></option>;
};

export default InputSelect;
