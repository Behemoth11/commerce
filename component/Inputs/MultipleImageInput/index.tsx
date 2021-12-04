import styles from "./style.module.scss";
import { memo } from "react";
import ImageInput from "../ImageInput";
import inputStyles from "../style.module.scss";


export interface Props {
  name?: string,
  label?: string,
  setInputValue: any,
  submitCount?:number,
  inputValue?: any,
}


const MultipleImageInput: React.FC<Props> = ({
  name,
  label,
  inputValue,
  submitCount,
  setInputValue,
}) => {
  const imageData = inputValue[name] || [];

  const loadMyPowerToAddMultipleFiles = (e) => {
    let cleared = false;
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setInputValue((prevInput) => {
            let Images = prevInput[name] || [];

            if (!cleared) {
              Images = Images.filter((field) => field.length > 0);
              cleared = true;
            }

            Images.push(reader.result);
            return { ...prevInput, [name]: Images };
          });
        }
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };

  const remove = (e, name, position) => {
    e.preventDefault();
    setInputValue((prevInput) => {
      const inputContent = prevInput[name];
      if (!inputContent || inputContent.length <= 0) return prevInput;
      return {
        ...prevInput,
        [name]: [
          ...inputContent.slice(0, position),
          ...inputContent.slice(position + 1),
        ],
      };
    });
  };

  return (
    <>
      <div className={inputStyles.imagesInput}>
        {imageData.map((Image, index) => (
          <div key={index} style={{ width: "49.5%", position: "relative" }}>
            <ImageInput
              name={name}
              position={index}
              imageLink={Image}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            <button
              className={inputStyles.rm}
              onClick={(e) => remove(e, name, index)}
            ></button>
          </div>
        ))}
      </div>
      <div className={inputStyles.superInput}>
        <input
          type="file"
          name={name}
          id={`${name}-multiple-input`}
          accept="image/*"
          multiple={true}
          onChange={(e) => loadMyPowerToAddMultipleFiles(e)}
          required
        />
        <label htmlFor={`${name}-multiple-input`}>{label || name}</label>
      </div>
    </>
  );
};

export default memo(MultipleImageInput);
