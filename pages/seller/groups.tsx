import { Any } from "@react-spring/types";
import PropTypes from "prop-types";
import React, { useContext, useMemo, useRef } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import Button from "../../component/Button";
import CartProduct from "../../component/CartProduct";
import GroupCard, { Mock } from "../../component/GroupCard";
import NormalInput from "../../component/Inputs/NormalInput";
import TextArea from "../../component/Inputs/TextArea";
import LoadingCircle from "../../component/LoadingController/LoadingCircle";
import PopupExpendPreset from "../../component/popup/Expend/preset";
import {
  useAuthcontext,
  useMyWindow,
  useUser,
} from "../../Contexts/GlobalContext";
import { getDate, getGroups } from "../../shared/shared_functions";
import styles from "../../styles/groups.module.scss";
import Expend from "../../component/popup/Expend";
import WorkState from "../../component/LoadingController/workState/WorkState";
import { useRequire } from "../../shared/CustomHooks";
import Header from "../../component/Text/Header";
import DropDownFilter from "../../component/DropDownFilter";
import Box from "../../component/Inputs/CheckBoxes/box";
import Select, { MyOption } from "../../component/Inputs/Select";
import DynamicHeight from "../../component/Effect/DynamicHeight";
import Array from "../../component/Inputs/Array";

const useRefresher = () => {
  const [refresh, setRefresh] = useState(true);
  const act = () => {
    setRefresh((p) => !p);
  };

  return [refresh, act];
};

type group = {
  _id: string;
  post_name: string;
  message: string;
  grouping: any[];
  published: { kdshop: boolean; fb: boolean };
};

const groups = ({}) => {
  useRequire("seller");
  const [groups, setGroups] = useState<undefined | null | [group]>(undefined);

  const [listener, refresh] = useRefresher();

  const auth = useAuthcontext();
  const User = useUser();
  const myWindow = useMyWindow();

  const [show_published, setShow_published] = useState(false);

  useEffect(() => {
    setGroups(undefined);

    if (User.data && User.data.username != "loading") {
      getGroups(
        auth,
        setGroups,
        ["post_name", "message", "grouping", "published"],
        [show_published]
      );
    }
  }, [User.data, listener, show_published]);

  const getLocationNumber = (hash) => {
    const number = hash.slice(1);
    let integer;
    // console.log("is " + int)
    if (isNaN(number) || number === "") return null;

    integer = parseInt(number);
    return integer;
  };

  const getActiveGroup = (hash) => {
    // const index = getLocationNumber(hash);
    if (!groups) return null;
    const group_id = hash.slice(1);

    // console.log(typeof index, "this is the type of index");
    // if (typeof index === "number" && groups) {
    for (const group of groups) {
      if (group._id === group_id) {
        return group;
      }
    }
    // }
    return null;
  };

  const [active, setActive] = useState(myWindow.hashLocation);

  const [inputValue, setInputValue] = useState({});

  const activeGroup = getActiveGroup(active);

  useEffect(() => {
    if (myWindow.hashLocation != "") {
      setActive(myWindow.hashLocation);
    } else {
      setTimeout(() => {
        setActive(myWindow.hashLocation);
      }, 200);
    }
  }, [myWindow.hashLocation]);

  const HEADERS = {
    "#create_post": "create a group",
  };

  const removeItem = async (product_id) => {
    const _id = myWindow.hashLocation.slice(1);
    const _ = (await import("lodash")).default;

    // console.log(_, "this is the value of low dash");

    let item_index;
    setGroups((prevState) => {
      const state_copy = _.cloneDeep(prevState);
      // console.log(state_copy);
      for (let i = 0; i < state_copy.length; i++) {
        if (state_copy[i]._id === _id) {
          const group = state_copy[i];
          group.grouping = group.grouping.filter(
            (item) => !(item._id === product_id)
          );
        }
      }
      return state_copy;
    });

    let response;

    response = auth.axios
      .put(`/api/publish`, null, {
        params: {
          action: "rm_fr_set",
          _id: product_id,
          "post_ids[]": _id,
        },
      })
      .catch((err) => (response = err.response));
  };

  const removeGroup = (_id) => {
    //@ts-ignore
    setGroups((prevState) => {
      const newState = prevState.filter((group) => group._id !== _id);
      return newState;
    });
  };

  const fb_publish_group = async () => {
    set_fb_state("working");
    let response;

    response = await auth.axios
      .put("/api/publish", null, {
        params: { _id: activeGroup._id, action: "fb_publish_group" },
      })
      .catch((err) => (response = err.response));

    fbRef.current = response.message;
    if (response.status === 200) {
      set_fb_state("success");
      //@ts-ignore
      refresh();
    } else {
      set_fb_state("failure");
    }
  };

  const [fb_state, set_fb_state] = useState("rest");
  const fbRef = useRef();

  const delete_group = () => {
    auth.axios.delete("/api/publish", { params: { post_id: activeGroup._id } });
  };

  const ActiveGroup = () => {
    return (
      activeGroup && (
        <>
          <h2>
            {activeGroup.post_name}{" "}
            <WorkState
              style={{ display: "inline-block" }}
              state={fb_state}
              setState={set_fb_state}
              general={fbRef.current}
              cb={{ success: () => myWindow.overlay.close() }}
            />
          </h2>
          <div className={styles.i_c}>
            {(activeGroup.grouping.length &&
              activeGroup.grouping.map((item) => (
                <CartProduct
                  product={item}
                  visible={true}
                  onClick={() => removeItem(item._id)}
                />
              ))) || <div className={styles.t_s}>Le group est vide</div>}
          </div>

          {activeGroup.grouping.length > 0 && (
            <Button
              type={activeGroup.published.fb ? "type3" : ""}
              onClick={() => fb_publish_group()}
            >
              Publier le post
            </Button>
          )}
        </>
      )
    );
  };

  return (
    <div
      className={`big-container ${styles.b}`}
      style={{ padding: "0 var(--padding)", flexWrap: "wrap" }}
    >
      <Groups refresh={refresh} groups={groups}>
        <Header level={2}>Voyer les groupes que vous havez configure</Header>
        <div onClick={(e) => e.stopPropagation()} className={styles.control}>
          <PopupExpendPreset
            type={"2"}
            top_prop={20}
            width="95vw"
            visible={(getActiveGroup(myWindow.hashLocation) && true) || false}
            closePopup={() => window.history.go(-1)}
            header={activeGroup && activeGroup.post_name}
            close={() => {
              myWindow.setHashLocation("none", -1);
            }}
            next={(e) => {
              myWindow.overlay.close();
              // handleSubmit(e);
            }}
            dependency={[groups, active, fb_state]}
            className={styles.phone}
          >
            <ActiveGroup />
          </PopupExpendPreset>

          <PopupExpendPreset
            type={"2"}
            top_prop={20}
            width="95vw"
            visible={(getActiveGroup(myWindow.hashLocation) && true) || false}
            closePopup={() => window.history.go(-1)}
            header={activeGroup && activeGroup.post_name}
            close={() => {
              myWindow.setHashLocation("none", -1);
            }}
            next={(e) => {
              myWindow.overlay.close();
              // handleSubmit(e);
            }}
            dependency={[groups, active, fb_state]}
            className={styles.phone}
          >
            <ActiveGroup />
          </PopupExpendPreset>

          <FormWithOverlay />

          <Button
            type="type1"
            // className={styles.phone}
            onClick={() =>
              myWindow.setHashLocation(`#create_post`, null, null, styles.phone)
            }
          >
            Create Post
          </Button>

          <Box
            id={"post_to_shwo"}
            name={"show_publised"}
            label={"montre post deja publiee"}
            checked={show_published}
            onChange={() => setShow_published((prevstate) => !prevstate)}
          />
        </div>

        {(groups && (
          <div className={styles.container}>
            <div>
              {groups?.map((group) => (
                <GroupCard
                  published={group.published}
                  key={group._id}
                  _id={group._id}
                  title={group.post_name}
                  message={group.message}
                  removeGroup={removeGroup}
                  pictures={group.grouping.map((item) => item.pr_image_url[0])}
                />
              ))}
            </div>

            <div style={{marginLeft: "2em"}}>
              <div className={styles.g_d}>
                <ActiveGroup />
                {["#create_post", "#edit_post"].includes(active) && (
                  <FormInputGroup />
                )}
              </div>
            </div>
          </div>
        )) ||
          (groups === undefined && (
            <div className={styles.loading}>
              <LoadingCircle
                visible={true}
                background={"var(--accent-color)"}
              />
            </div>
          )) ||
          (groups === null && <p>There is not item for you bbom</p>)}
      </Groups>
    </div>
  );
};

groups.propTypes = {};

export default groups;

const GroupContext = createContext({
  inputValue: {},
  setInputValue: (arg: {} | ((args: any) => void)) => console.log(4),
  createPost: () => console.log(4),
  updatePost: (_id: string) => console.log(4),
  state: "",
  setState: () => console.log(4),
  groups: [{ _id: "none" }],
});

const Groups = ({ children, refresh, groups }) => {
  const [inputValue, setInputValue] = useState<any>({});
  const [state, setState] = useState("rest");
  const auth = useAuthcontext();
  // const myWindow = useMyWindow();

  const createPost = async () => {
    setState("working");
    let response;
    response = await auth.axios
      .post(
        "/api/publish",
        {
          post_name: inputValue.post_name,
          message: inputValue.message,
          host: window.location.hostname,
        },
        {
          params: {
            ids: inputValue.item_ids || [],
            target: "group_post",
          },
        }
      )
      .catch((err) => (response = err.response));

    if (response.status === 200) {
      setState("success");
      refresh();
    } else {
      setState("failure");
    }
  };

  const updatePost = async (_id) => {
    setState("working");
    let response;
    response = await auth.axios
      .put(
        "/api/publish",
        {
          update: {
            post_name: inputValue.post_name,
            message: inputValue.message,
          },
        },
        {
          params: {
            post_ids: [_id],
            ids: inputValue.item_ids || [],
            action: "update_field",
          },
        }
      )
      .catch((err) => (response = err.response));

    if (response.status === 200) {
      setState("success");
      refresh();
    } else {
      setState("failure");
    }
  };

  return (
    <GroupContext.Provider
      value={{
        inputValue,
        setInputValue,
        createPost,
        updatePost,
        state,
        //@ts-ignore
        setState,
        groups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

const FormInputGroup = () => {
  const {
    inputValue,
    setInputValue,
    createPost,
    updatePost,
    state,
    setState,
    groups,
  } = useContext(GroupContext);
  const myWindow = useMyWindow();

  const getFocusItem = () => {
    let focusItem;
    console.log(groups);
    if (!groups) return null;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i]._id === myWindow.isFocused) {
        return groups[i];
      }
    }

    return null;
  };

  // const focusItem = useMemo(() => getFocusItem(), [myWindow.isFocused])

  useEffect(() => {
    const focusItem = getFocusItem();
    // console.log("the focus item", focusItem)
    // console.log(inputValue)
    if (focusItem) {
      setInputValue(focusItem);
    }
  }, [myWindow.isFocused]);

  const lct = myWindow.hashLocation;
  const post_type = inputValue["post_type"];

  const custom_frequency = ["weekly", "monthly"].includes(
    inputValue["frequency"]
  )
    ? "custom"
    : inputValue["frequency"];

  // console.log(inputValue);
  return (
    <form
      className={styles.cp_ctn}
      onSubmit={(e) => {
        e.preventDefault();
        if (lct === "#create_post") {
          createPost();
        } else {
          updatePost(inputValue["_id"]);
        }
      }}
    >
      <h2>
        {lct === "#create_post"
          ? "Creer un groupe de poste"
          : "mettre a jour le post"}
      </h2>
      <WorkState
        state={state}
        setState={setState}
        cb={{
          success: () => {
            if (["#create_post"].includes(myWindow.hashLocation))
              window.history.go(-1);
          },
        }}
      />
      <NormalInput
        required={true}
        name="post_name"
        label="Nom du groupe"
        inputValue={inputValue}
        setInputValue={setInputValue}
        // defaultValue={}
      />
      <TextArea
        required={true}
        name="message"
        label="message associer au poste"
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <Select
        required={true}
        name={"post_type"}
        inputValue={inputValue}
        label={"Type de poste"}
        defaultValue={"normal_post"}
        setInputValue={setInputValue}
      >
        <MyOption value="normal_post">Poste normal</MyOption>
        <MyOption value="scheduled_post">Poste programmé</MyOption>
        <MyOption value="repetitive_post">poste répétitif</MyOption>
      </Select>

      <DynamicHeight show={post_type === "scheduled_post"}>
        <div style={{ padding: "5px 0px" }}>
          <NormalInput
            required={true}
            name="post_date"
            label="poster automatiquement le"
            inputValue={inputValue}
            setInputValue={setInputValue}
            min={getDate()}
            type="date"
          />
        </div>
      </DynamicHeight>

      <DynamicHeight show={post_type === "repetitive_post"}>
        <div style={{ padding: "5px 0px" }}>
          <Select
            required={true}
            name={"frequency"}
            inputValue={inputValue}
            label={"Frequence du post"}
            defaultValue={"weekly"}
            setInputValue={setInputValue}
          >
            <MyOption value="weekly">Hebdomadaire</MyOption>
            <MyOption value="monthly">Mensuel</MyOption>
            <MyOption value="custom">
              {inputValue["custom_frequency"]
                ? `Tous les ${inputValue["custom_frequency"]} jours`
                : "Frequence customisee"}
            </MyOption>
          </Select>
        </div>
      </DynamicHeight>

      <DynamicHeight
        show={
          post_type === "repetitive_post" &&
          inputValue["frequency"] === "weekly"
        }
      >
        <div style={{ padding: "5px 0px" }}>
          <Array
            name={"selected_days"}
            label={"jour de post"}
            required={true}
            inputValue={inputValue}
            setInputValue={setInputValue}
            proposition={{
              selected_days: [
                "lundi",
                "mardi",
                "mercredi",
                "jeudi",
                "vendredi",
                "samedi",
                "dimanche",
              ],
            }}
          />
        </div>
      </DynamicHeight>

      <DynamicHeight
        show={
          post_type === "repetitive_post" &&
          inputValue["frequency"] === "monthly"
        }
      >
        <div style={{ padding: "5px 0px" }}>
          <Array
            name={"selected_monthly"}
            label={"jour de post"}
            type={"number"}
            required={true}
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputProps={{ min: 0, max: 31 }}
          />
        </div>
      </DynamicHeight>

      <DynamicHeight
        show={
          post_type === "repetitive_post" &&
          inputValue["frequency"] === "custom"
        }
      >
        <div style={{ padding: "5px 0px" }}>
          <NormalInput
            name={"custom_frequency"}
            label={"frequence de poste"}
            type={"number"}
            required={true}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <NormalInput
            required={true}
            name="next_date"
            label="Plannifier le prochain post pour le"
            inputValue={inputValue}
            setInputValue={setInputValue}
            min={getDate()}
            type="date"
          />
        </div>
      </DynamicHeight>

      <Button
        onClick={(e) => {
          e.preventDefault();
          if (lct === "#create_post") {
            createPost();
          } else {
            updatePost(inputValue["_id"]);
          }
        }}
      >
        {lct === "#create_post" ? "Créer" : "mettre à jour"}
      </Button>
    </form>
  );
};

const FormWithOverlay = () => {
  const { state } = useContext(GroupContext);
  const myWindow = useMyWindow();
  return (
    <PopupExpendPreset
      type={"2"}
      top_prop={20}
      width="95vw"
      visible={["#create_post", "#edit_post"].includes(myWindow.hashLocation)}
      closePopup={() => window.history.go(-1)}
      header={"Creer on nouveaux groupe de produits"}
      close={() => {
        myWindow.setHashLocation("none", -1);
      }}
      next={(e) => {
        e.preventDefault();
        // createPost();
        myWindow.overlay.close();
        // handleSubmit(e);
      }}
      dependency={[state]}
      className={styles.phone}
      labels={{ back: "retour", forward: "creer" }}
    >
      <FormInputGroup />
    </PopupExpendPreset>
  );
};
