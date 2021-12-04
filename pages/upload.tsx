import {
  getCategories,
  ITEM_NATURE,
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
import styles from "../styles/upload.module.scss";
import InputArray from "../component/Inputs/Array";
import Input from "../component/Inputs/NormalInput";
import TextArea from "../component/Inputs/TextArea";
import { checkForm, formatUrl } from "../shared/UtilityFunctions";
import ImageInput from "../component/Inputs/ImageInput";
import LoadingController from "../component/LoadingController";
import MultipleImageInput from "../component/Inputs/MultipleImageInput";
import { useAuthcontext, useMyWindow } from "../Contexts/GlobalContext";
import CaptChat from "../component/CaptChat";
import {
  add_captchat_token,
  getGroups,
  getSelectionArray,
} from "../shared/shared_functions";
import Expend from "../component/popup/Expend";
import CheckBoxes from "../component/Inputs/CheckBoxes";
import Button from "../component/Button";
import PopupExpendPreset from "../component/popup/Expend/preset";
import Box from "../component/Inputs/CheckBoxes/box";
import Select from "../component/Select";
import Loading from "../component/LoadingController/loading";
import handle_refresh from "../_api/handlers/auth/refreshToken";
import LoadingCircle from "../component/LoadingController/LoadingCircle";
import SvgCorrect from "../component/svg/Correct/correct";
import Cross from "../component/svg/Correct/cross";

type edit = "upload" | "update" | "loading" | "success" | "error";

const ACTION = {
  SUBMIT: "soumission du produit",
  FB_UPLOAD: "Création du poste facebook",
  ADD_TO_GROUP: "Ajout du poste a groupe de poste",
};

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
            "quantity",
            "location",
            "pr_image_url",
            "all_pr_image_url",
            "representation",
            "nature",
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

  const [tasks, setTask] = useState<{ [task_name: string]: boolean | string }>(
    {}
  );

  const [errMsg, setErrMsg] = useState<string[]>([]);

  const [proposition, setProposition] = useState({
    color: ["bleu", "vert", "violet", "marron", "noire", "blanc", "jaune"],
    categories: getCategories(navBarSections, ["menu"]),
    tags: ["inexpensive", "affordable", "good", "bad"],
    representation: ["hot deals", "women", "men", "stuff"],
    nature: ITEM_NATURE,
  });

  const submitItem = async () => {
    const _inputValue = { ...inputValue };
    setSubmitCount((prevState) => prevState + 1);
    document.getElementById("__next")?.scrollTo({ top: 0, behavior: "smooth" });
    const errors = [];

    checkForm(_inputValue, nonRequired, errors);

    setErrMsg([...errors]);
    if (errors.length > 0) {
      setEditState(editRef.current);
      return;
    }

    let res;
    _setEditState("loading");

    await add_captchat_token(_inputValue);

    if (editRef.current == "update") {
      res = await auth.axios
        .put(`/api/product/withId/${query._id}`, _inputValue)
        .catch((err) => (res = err.response));
    } else if (editRef.current == "upload") {
      res = await auth.axios
        .post("/api/product", _inputValue)
        .catch((err) => (res = err.response));
    }

    if (res) {
      if (res.status === 200) {
        setEditState("success");
        setSubmitCount(0);
        setErrMsg([]);
        // setInputValue((prevState) => {
        //   return { ...prevState, productName: "" };
        // });
        return res.data._id;
      } else {
        setEditState("failure");
        setErrMsg([res.data.message || res.data]);
      }
    } else setEditState("failure");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateTask = (task_name: string, status: string | boolean) => {
      setTask((prevState) => {
        // console.log(task_name, "should now be ", status);
        return { ...prevState, [task_name]: status };
      });
    };

    taskRef.current = {};

    updateTask(ACTION.SUBMIT, "working");

    const _id = await submitItem();

    if (_id) {
      updateTask(ACTION.SUBMIT, "success");
    } else {
      updateTask(ACTION.SUBMIT, "failure");
    }

    console.log(tasks)
    console.log(taskRef)

    if (_id) {
      for (const task in tasks) {
        if (tasks[task] === true) {
          taskRef.current[task]?.action(_id, updateTask);
        }
      }
    }
  };
  const taskRef = useRef({});

  const handleOptionChange = (label) => {
    setTask((prevState) => {
      const oldValue = prevState[label] || false;

      return { ...prevState, [label]: !oldValue };
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
          {getSelectionArray(tasks).map((task) => (
            <div
              className={styles.task_ctn} //center-children
              style={{ width: "fit-content" }}
            >
              <p>
                <span className={styles.taskManagerIcon}>
                  <SvgCorrect
                    showing={tasks[task] === "success"}
                    className={styles.correct}
                  />
                  <LoadingCircle visible={tasks[task] === "working"} />
                  <Cross
                    showing={tasks[task] === "failure"}
                    className={styles.correct}
                  />
                </span>
                {task}
              </p>

              {taskRef.current[task]?.error && (
                <span className={styles.error}>
                  ( {taskRef.current[task]?.error} )
                </span>
              )}
            </div>
          ))}
          {/* <div
            className={styles.task_ctn} //
            style={{ width: "fit-content" }}
          >
            <p>
              <span className={styles.taskManagerIcon}>
                <SvgCorrect showing={true} className={styles.correct} />
                <LoadingCircle visible={false} />
                <Cross showing={false} className={styles.correct} />
              </span>
              {"very difficult task"}
            </p>

            <span className={styles.error}>
              "Something went very very wong I am sorry"
            </span>
          </div> */}
          <Errors errMsg={errMsg} />
          <Input
            required={true}
            name={"productName"}
            label={"Nom du produit"}
            inputValue={inputValue}
            submitCount={submitCount}
            proposition={proposition}
            setInputValue={setInputValue}
          />
          <ImageInput
            name="presentationImage"
            label={"Image principale"}
            position={0}
            imageLink={
              inputValue["presentationImage"] &&
              inputValue["presentationImage"][0]
            }
            submitCount={submitCount}
            setInputValue={setInputValue}
          />
          {/* array should be inputed as string with a separator that can either be determined here or on the server */}
          <Input
            required={true}
            name={"nature"}
            label="Nature"
            inputValue={inputValue}
            submitCount={submitCount}
            proposition={proposition}
            setInputValue={setInputValue}
          />
          <Input
            name={"price"}
            label={"Prix"}
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
            label="Description"
            inputValue={inputValue}
            submitCount={submitCount}
            setInputValue={setInputValue}
          />
          <Input
            type={"number"}
            required={false}
            name={"quantity"}
            inputValue={inputValue}
            submitCount={submitCount}
            proposition={proposition}
            label={"Quantité disponible"}
            setInputValue={setInputValue}
          />
        
          {[
            { label: "categories", element: "categories" },
            {
              label: "matériels",
              element: "materials",
            },
            {
              label: "couleurs",
              element: "color",
            },
            {
              label: "tags",
              element: "tags",
            },
          ].map(({ label, element }) => (
            <InputArray
              key={element}
              name={element}
              label={label}
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
            label="images supplémentaires +"
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
              top_prop={50}
              width="80vw"
              visible={myWindow.hashLocation == "#upload_options"}
              closePopup={() => window.history.go(-1)}
              header={"Decider de vos customisations."}
              close={() => myWindow.setHashLocation("none", -1)}
              next={(e) => {
                myWindow.overlay.close();
                handleSubmit(e);
              }}
              dependency={[tasks]}
            >
              <Box
                id={"option_upload_to_facebook"}
                name={"upload"}
                checked={tasks[ACTION.FB_UPLOAD] === true}
                label={"Ajouter cet article a votre page facebook"}
                onChange={() => handleOptionChange(ACTION.FB_UPLOAD)}
              />

              {tasks[ACTION.FB_UPLOAD] === true && (
                <div style={{ display: "inline-block" }}>
                  <Button
                    style={{ margin: 0 }}
                    label="editer le post"
                    onClick={() =>
                      myWindow.setHashLocation("#single_post_preview")
                    }
                  />
                </div>
              )}

              <Box
                id={"add_to_facebook_poste"}
                name={ACTION.ADD_TO_GROUP}
                checked={tasks[ACTION.ADD_TO_GROUP] === true}
                label={"Grouper cet article pour un poste de groupe"}
                onChange={() => handleOptionChange(ACTION.ADD_TO_GROUP)}
              />

              {tasks[ACTION.ADD_TO_GROUP] === true && (
                <div style={{ display: "inline-block" }}>
                  <Button
                    style={{ margin: 0 }}
                    label="choisir group ou ajouter"
                    onClick={() => myWindow.setHashLocation("#post_with_group")}
                  />
                </div>
              )}
            </PopupExpendPreset>

            <PostOnFacebook
              handleSubmit={handleSubmit}
              inputValue={inputValue}
              taskRef={taskRef}
            />

            <SelectGroup handleSubmit={handleSubmit} taskRef={taskRef} />

            <button
              onClick={(e) => {
                e.preventDefault();
                myWindow.setHashLocation("#upload_options");
              }}
              className={styles.submit}
            >
              <span>Envoyer</span>
            </button>
          </div>
        </div>
      </uploadContext.Provider>
    </form>
  );
}

export default Upload;

const SelectGroup = ({ handleSubmit, taskRef }) => {
  const auth = useAuthcontext();
  const myWindow = useMyWindow();

  const [selection, setSelection] = useState({});
  const [groups, setGroups] = useState(undefined);
  const visible = myWindow.hashLocation == "#post_with_group";
  useEffect(() => {
    if (!visible) return;
    getGroups(auth, setGroups);
  }, [visible]);

  const handleClick = (id) => {
    setSelection((prevState) => {
      const previous = { ...prevState };
      previous[id] = !prevState[id];
      return previous;
    });
  };

  const myAction = async (active_product_id, setTask) => {
    setTask(ACTION.ADD_TO_GROUP, "working");

    let response;
    response = await auth.axios
      .put(
        "/api/publish",
        { update: { grouping: active_product_id } },
        {
          params: {
            post_ids: getSelectionArray(selection),
            action: "add_to_set",
          },
          headers: {
            authorization: process.env.SELLER_TEST,
          },
        }
      )
      .catch((err) => (response = err.response));

    if (response.status === 200) {
      setTask(ACTION.ADD_TO_GROUP, "success");
    } else {
      taskRef.current[ACTION.ADD_TO_GROUP].error = response.data.message;
      setTask(ACTION.ADD_TO_GROUP, "failure");
    }

    return response.data;
  };

  useEffect(() => {
    if (taskRef.current[ACTION.ADD_TO_GROUP]) {
      taskRef.current[ACTION.ADD_TO_GROUP].action = myAction;
    } else {
      taskRef.current[ACTION.ADD_TO_GROUP] = { action: myAction };
    }
  }, [myAction]);

  return (
    <PopupExpendPreset
      top_prop={20}
      width="90vw"
      visible={myWindow.hashLocation == "#post_with_group"}
      closePopup={() => window.history.go(-1)}
      header={"Choississez le groupe auquel ajouter"}
      close={() => {
        myWindow.setHashLocation("none", -1);
      }}
      next={(e) => {
        myWindow.overlay.close();
        handleSubmit(e);
      }}
      dependency={[groups]}
    >
      <>
        {groups &&
          groups.map((group) => (
            <Select
              key={group._id}
              select_id={group._id}
              message={group.message}
              label={group.post_name}
              selected={selection[group._id]}
              onClick={() => handleClick(group._id)}
            />
          ))}
        <Loading
          width={groups === undefined ? "20%" : "0%"}
          style={{ margin: "auto" }}
          background={"var(--theme-color)"}
        />

        {groups == null && "You have create no group"}
      </>
    </PopupExpendPreset>
  );
};

const PostOnFacebook = ({ handleSubmit, inputValue, taskRef }) => {
  const auth = useAuthcontext();
  const myWindow = useMyWindow();
  const [myInput, setMyInput] = useState({});

  const myAction = async (_id, setTask) => {
    let response;

    setTask(ACTION.FB_UPLOAD, "working");

    response = await auth.axios
      .post(
        "/api/publish",
        {
          _id: _id,
          message: myInput["message"],
          nature: inputValue["nature"],
          host: window.location.hostname,
        },
        {
          headers: {
            authorization: process.env.SELLER_TEST,
          },
          params: {
            target: "single",
          },
        }
      )
      .catch((err) => (response = err.response));

    if (response.status === 200) {
      setTask(ACTION.FB_UPLOAD, "success");
    } else {
      taskRef.current[ACTION.FB_UPLOAD].error = response.data.message;
      setTask(ACTION.FB_UPLOAD, "failure");
    }

    return response.data;
  };

  useEffect(() => {
    if (taskRef.current[ACTION.ADD_TO_GROUP]) {
      taskRef.current[ACTION.FB_UPLOAD].action = myAction;
    } else {
      taskRef.current[ACTION.FB_UPLOAD] = { action: myAction };
    }
  }, [myAction]);

  return (
    <PopupExpendPreset
      top_prop={20}
      width="90vw"
      visible={myWindow.hashLocation == "#single_post_preview"}
      closePopup={() => window.history.go(-1)}
      header={"Reviser l'apparence du post"}
      close={() => myWindow.setHashLocation("none", -1)}
      next={(e) => {
        myWindow.overlay.close();
        handleSubmit(e);
      }}
    >
      <div>
        <TextArea
          required={true}
          name={"message"}
          inputValue={myInput}
          setInputValue={setMyInput}
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
  );
};
