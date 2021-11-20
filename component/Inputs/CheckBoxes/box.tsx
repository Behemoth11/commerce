// @ts-ignore
import styles from "./style.module.css";


interface InputProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Box: React.FC<InputProps> = ({
  name,
  id,
  label,
  onChange,
  checked,
}) => {
  return (
    <div className={styles.c_b}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <span></span>
        {label || name}
      </label>
    </div>
  );
};
export default Box;
