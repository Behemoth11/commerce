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
import { useGlobalContext } from "../Contexts/GlobalContext";

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
  // productName: true,
  representation: true,
  related: true,
}; // also change the requied field present on input component

function Upload() {
  const { query } = useRouter();
  const { auth } = useGlobalContext();
  const [editState, _setEditState] = useState<edit>("upload");
  const editRef = useRef<edit>("upload");

  const setEditState = (payload) => {
    _setEditState(payload);
    if (payload != "update" && payload != "upload") return;
    editRef.current = payload;
  };

  useEffect(() => {
    if (query._id) setEditState("update");
  }, [query._id]);

  useEffect(() => {
    document.getElementById("__next")?.scroll(0, 0);
  }, [editRef.current]);

  useEffect(() => {
    const fetch = async (_id) => {
      const axiosResponse = await axios
        .get(`/api/product/withId/${query._id}`)
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
    document.getElementById("__next").scroll(0,0)
    const errors = [];

    checkForm(inputValue, nonRequired, errors);

    setErrMsg([...errors]);
    if (errors.length > 0) {
      setEditState(editRef.current);
      return;
    }

    let res;
    _setEditState("loading");

    if (editRef.current == "update") {
      res = await auth.axios
        .put(`/api/product/withId/${query._id}`, inputValue)
        .catch((err) => (res = err.response));
    } else if (editRef.current == "upload") {
      res = await auth.axios
        .post("/api/product", inputValue)
        .catch((err) => err.response);
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
        setErrMsg([res.data.message]);
      }
    } else setEditState("failure");
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

            <Input
              name="nature"
              required={false}
              inputValue={inputValue}
              submitCount={submitCount}
              proposition={proposition}
              setInputValue={setInputValue}
            />

            {/* array should be inputed as string with a separator that can either be determined here or on the server */}
            {"color/materials/tags/categories".split("/").map((element) => (
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

            <TextArea
              required={true}
              name={"description"}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            <MultipleImageInput
              name={"images"}
              inputValue={inputValue}
              submitCount={submitCount}
              setInputValue={setInputValue}
            />
            <div className="container flex center-children">
              <button onClick={handleSubmit} className={styles.submit}>
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
