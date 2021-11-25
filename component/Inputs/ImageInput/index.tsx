// @ts-ignore
import styles from "./style.module.scss";
import MyImage from "../../MyImage";
import { memo } from "react";
import inputStyles from "../style.module.scss";

const ImageInput = ({
  name,
  position,
  imageLink,
  submitCount,
  setInputValue,
}) => {
  const no_optimize = new RegExp("data:image").test(imageLink?.slice(0, 14));

  const formatedImageLink =
    (no_optimize && imageLink) || imageLink?.split("upload/")[1];

  const handleChange = (e, name, index: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setInputValue((prevInput) => {
          const Images = prevInput[name] || [""];
          Images[index] = reader.result;
          return { ...prevInput, [name]: Images };
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleLoad = (e) => {
    if (!no_optimize || ! setInputValue ) return;
    const canvas = document.createElement("canvas");
    const MAX_WIDTH = 500;

    const scaleSize = MAX_WIDTH / e.target.width;
    canvas.width = MAX_WIDTH;
    canvas.height = e.target.height * scaleSize;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

    const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
    setInputValue((prevInput) => {
      const Images = prevInput[name] || [""];

      if (srcEncoded.length < Images[position].length) {
        Images[position] = srcEncoded;
      }

      return { ...prevInput, [name]: Images };
    });
  };

  return (
    <div className={`${inputStyles.inputImageContainer}`}>
      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "2px",
        }}
      >
        <MyImage
          isVisible={true}
          ASPECT_RATIO={100}
          imageLink={formatedImageLink}
          no_optimization={no_optimize}
          onLoad={handleLoad}
        />
        <input
          type="file"
          name={name}
          id={name + position + "0"}
          className={`${
            submitCount > 0 &&
            !(imageLink && imageLink[0]?.length) &&
            inputStyles.failure
          }`}
          onChange={(e) => handleChange(e, name, position)}
          required
          accept="image/*"
        />
        {formatedImageLink?.length}
        {name.length && <label htmlFor={name + position + "0"}>{name}</label>}
      </div>
    </div>
  );
};

export default memo(ImageInput);
