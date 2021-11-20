import {
  getCategories,
  navBarSections,
} from "../component/Layout/NavBar/navBarSections";

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Errors from "../component/Inputs/Errors";
import styles from "../styles/upload.module.css";
import InputArray from "../component/Inputs/Array";
import Input from "../component/Inputs/NormalInput";
import TextArea from "../component/Inputs/TextArea";
import { checkForm, formatUrl } from "../shared/UtilityFunctions";
import ImageInput from "../component/Inputs/ImageInput";
import LoadingController from "../component/LoadingController";
import MultipleImageInput from "../component/Inputs/MultipleImageInput";
import { useAuthcontext, useMyWindow } from "../Contexts/GlobalContext";
import CaptChat from "../component/CaptChat";
import { add_captchat_token } from "../shared/shared_functions";
import Expend from "../component/popup/Expend";
import CheckBoxes from "../component/Inputs/CheckBoxes";
import Button from "../component/Button";
import PopupExpendPreset from "../component/popup/Expend/preset";
import Box from "../component/Inputs/CheckBoxes/box";

type edit = "upload" | "update" | "loading" | "success" | "error";

const uploadContext = createContext({
  submitCount: 0,
  proposition: {},
  editState: "upload",
  setInputValue: undefined,
});

export const useUploadContext = () => {
  return useContext(uploadContext);
};

const nonRequired = {
  tags: true,
  color: true,
  images: true,
  location: true,
  materials: true,
  representation: true,
}; // also change the requied field present on input component

function Upload() {
  const { query } = useRouter();

  const auth = useAuthcontext();
  const myWindow = useMyWindow();
  const [editState, _setEditState] = useState<edit>("upload");
  const editRef = useRef<edit>("upload");

  const setEditState = (payload) => {
    if (payload == "update" || payload == "upload") {
      editRef.current = payload;
    }
    _setEditState(payload);
  };

  useEffect(() => {
    if (query._id) setEditState("update");
  }, [query._id]);

  useEffect(() => {
    document.getElementById("__next")?.scrollTo({ top: 0, behavior: "smooth" });
  }, [editRef.current]);

  useEffect(() => {
    const fetch = async (_id) => {
      const axiosResponse = await axios
        .get(
          `/api/product/withId/${query._id}?${[
            "productName",
            "color",
            "materials",
            "tags",
            "categories",
            "description",
            "price",
            "quatity",
            "location",
            "pr_image_url",
            "all_pr_image_url",
            "representation",
          ]
            .map((field) => `field=${field}`)
            .join("&")}`
        )
        .catch((err) => console.log(err));
      let productData;
      if (axiosResponse) {
        productData = axiosResponse?.data?.products[0];
      }
      if (productData) {
        setInputValue({
          ...productData,
          presentationImage: formatUrl(productData.pr_image_url),
          images: formatUrl(productData.all_pr_image_url),
        });
      }
    };

    if (editRef.current == "update") {
      fetch(query._id);
    }
  }, [editRef.current]);

  const [submitCount, setSubmitCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<{}>({});
  const [meta, setMeta] = useState<{}>({});
  const [defaultMeta, setDefaultMeta] = useState<{}>({
    upload_options: { upload: true },
  });
  const [errMsg, setErrMsg] = useState<string[]>([]);
  const handleChange = (value: any, name) => {
    setInputValue((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const [proposition, setProposition] = useState({
    color: ["blue", "green", "purple", "brown", "black", "white"],
    materials: ["inexpensive", "affordable", "good", "bad"],
    categories: getCategories(navBarSections, ["menu"]),
    tags: ["inexpensive", "affordable", "good", "bad"],
    representation: ["hot deals", "women", "men", "stuff"],
    nature: ["book"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitCount((prevState) => prevState + 1);
    document.getElementById("__next")?.scrollTo({ top: 0, behavior: "smooth" });
    const errors = [];

    checkForm(inputValue, nonRequired, errors);

    setErrMsg([...errors]);
    if (errors.length > 0) {
      setEditState(editRef.current);
      return;
    }

    let res;
    _setEditState("loading");

    await add_captchat_token(inputValue);

    if (editRef.current == "update") {
      res = await auth.axios
        .put(`/api/product/withId/${query._id}`, inputValue)
        .catch((err) => (res = err.response));
    } else if (editRef.current == "upload") {
      res = await auth.axios
        .post("/api/product", inputValue)
        .catch((err) => (res = err.response));
    }

    if (res) {
      if (res.status === 200) {
        setEditState("success");
        setSubmitCount(0);
        setErrMsg([]);
        setInputValue((prevState) => {
          return { ...prevState, productName: "" };
        });

        setTimeout(() => {
          setEditState("upload");
        }, 1000);
      } else {
        setEditState("failure");
        setErrMsg([res.data.message || res.data]);
      }
    } else setEditState("failure");
  };

  const handleOptionChange = (name, label) => {
    setMeta((prevState) => {
      let myState = prevState[name] || {};
      myState = { ...myState };
      const oldValue = myState[label] || false;

      myState[label] = !oldValue;

      return { ...prevState, [name]: myState };
    });
  };

  return (
    <form>
      <uploadContext.Provider
        value={{
          submitCount,
          setInputValue,
          proposition,
          editState: editRef.current,
        }}
      >
        <LoadingController
          customMessage={{
            success: "Operation successfully, completed",
            failure: "Something went wrong",
          }}
          no_scroll={true}
          state={editState}
          setState={setEditState}
        >
          <div className={`${styles.boss}`}>
            <div className={styles.editState}>
              {["upload", "update"].map((representedState) => (
                <p
                  key={representedState}
                  className={`${
                    editRef.current == representedState && styles.active
                  }`}
                  onClick={() => setEditState(representedState)}
                >
                  {representedState}
                </p>
              ))}
            </div>
            <Errors errMsg={errMsg} />
            <Input
              required={true}
              name={"productName"}
              inputValue={inputValue}
              submitCount={submitCount}
              proposition={proposition}
              setInputValue={setInputValue}
            />
            <ImageInput
              name="presentationImage"
              position={0}
              imageLink={
                inputValue["presentationImage"] &&
                inputValue["presentationImage"][0]
              }
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            {/* array should be inputed as string with a separator that can either be determined here or on the server */}
            {"categories".split("/").map((element) => (
              <InputArray
                key={element}
                name={element}
                required={true}
                inputValue={inputValue}
                submitCount={submitCount}
                proposition={proposition}
                setInputValue={setInputValue}
              />
            ))}
            <Input
              name={"price"}
              required={true}
              type={"number"}
              inputValue={inputValue}
              submitCount={submitCount}
              proposition={proposition}
              setInputValue={setInputValue}
            />
            <TextArea
              required={true}
              name={"description"}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            {"color/materials/tags".split("/").map((element) => (
              <InputArray
                key={element}
                name={element}
                required={false}
                inputValue={inputValue}
                submitCount={submitCount}
                proposition={proposition}
                setInputValue={setInputValue}
              />
            ))}
            <Input
              name="location"
              required={false}
              inputValue={inputValue}
              submitCount={submitCount}
              proposition={proposition}
              setInputValue={setInputValue}
            />
            <Input
              required={false}
              name="representation"
              inputValue={inputValue}
              submitCount={submitCount}
              proposition={proposition}
              setInputValue={setInputValue}
            />
            <MultipleImageInput
              name={"images"}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />

            <CaptChat />

            <div
              className="container flex center-children"
              style={{ position: "relative" }}
            >
              <PopupExpendPreset
                top_prop={20}
                width="90vw"
                visible={myWindow.hashLocation == "#single_post_preview"}
                closePopup={() => window.history.go(-1)}
                header={"Reviser l'apparence du post"}
                close={() => window.history.go(-1)}
                next={(e) => {
                  window.history.go(-2);
                  handleSubmit(e);
                }}
              >
                <div>
                  <TextArea
                    required={true}
                    inputValue={meta}
                    name={"faceboo_post"}
                    setInputValue={setMeta}
                  />
                  <ImageInput
                    name=""
                    position={0}
                    imageLink={
                      inputValue["presentationImage"] &&
                      inputValue["presentationImage"][0]
                    }
                    submitCount={undefined}
                    setInputValue={undefined}
                  />

                </div>
              </PopupExpendPreset>

              <PopupExpendPreset
                top_prop={50}
                width="80vw"
                visible={myWindow.hashLocation == "#upload_options"}
                closePopup={() => window.history.go(-1)}
                header={"Decider de vos customisations."}
                close={() => window.history.go(-1)}
                next={(e) => {
                  window.history.go(-1);
                  handleSubmit(e);
                }}
              >
                <Box
                  id={"option_upload_to_facebook"}
                  name={"upload"}
                  checked={
                    (meta["upload_options"] &&
                      meta["upload_options"]["upload"]) ||
                    false
                  }
                  label={"Ajouter cet article a votre page facebook"}
                  onChange={() =>
                    handleOptionChange("upload_options", "upload")
                  }
                />
                <div style={{ display: "inline-block" }}>
                  <Button
                    style={{ margin: 0 }}
                    label="editer le post"
                    onClick={() =>
                      myWindow.setHashLocation("#single_post_preview")
                    }
                  />
                </div>

                <Box
                  id={"add_to_facebook_poste"}
                  name={"post_with_group"}
                  checked={
                    (meta["upload_options"] &&
                      meta["upload_options"]["post_with_group"]) ||
                    false
                  }
                  label={"Grouper cet article pour un poste de groupe"}
                  onChange={() =>
                    handleOptionChange("upload_options", "post_with_group")
                  }
                />
              </PopupExpendPreset>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  myWindow.setHashLocation("#upload_options");
                }}
                className={styles.submit}
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </LoadingController>
      </uploadContext.Provider>
    </form>
  );
}

export default Upload;
