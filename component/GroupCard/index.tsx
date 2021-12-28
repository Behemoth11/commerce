import Popup from "../popup";
import Button from "../Button";
import MyImage from "../MyImage";
import Alert from "../popup/Alert";
import styles from "./style.module.scss";
import { FC, ReactNode, useRef, useState } from "react";
import WorkState from "../LoadingController/workState/WorkState";
import { useAuthcontext, useMyWindow } from "../../Contexts/GlobalContext";
import MyLink from "../MyLink";

interface Props {
  _id: string;
  // index: number;
  title: string;
  message: string;
  pictures: string[];
  children?: ReactNode;
  removeGroup: (_id: string) => void;
  published: { fb: boolean; kdshop: boolean };
}

const GroupCard: FC<Props> = ({
  _id,
  title,
  children,
  published,
  message,
  pictures,
  removeGroup,
}) => {
  const myWindow = useMyWindow();
  const { axios } = useAuthcontext();

  const [state, setState] = useState("rest");
  const messageRef = useRef();

  const delete_group = async () => {
    myWindow.setFocusOn("none");
    myWindow.overlay.close();

    let response;

    setState("working");
    response = await axios
      .delete("/api/publish", { params: { post_id: _id } })
      .catch((err) => (response = err.response));

    messageRef.current = response?.data.message;
    removeGroup(_id);

    if (response.status === 200) {
      setState("success");
    } else {
      setState("failure");
    }
  };

  const id = `group_${_id}`;
  return (
    <div className={`${styles.b}`}>
      <h2>{title}</h2>
      <WorkState
        delay={1000 * 60 * 5}
        state={state}
        setState={setState}
        general={messageRef.current}
      ></WorkState>
      <div className={styles.b_ctn}>
        <p>{message}</p>
        <div className={styles.imageContainer}>
          {pictures.map((picture) => (
            <MyImage
              key={picture}
              isVisible={true}
              imageLink={picture}
              ASPECT_RATIO={100}
              loadingState={true}
            />
          ))}
          {children}
        </div>
      </div>
      <div className={styles.footer}>
        <Alert name={"delete_" + id} type={"top"} width={"80vw"}>
          <div className={styles.deletePopup}>
            <p>Are you sure you want to delete this item?</p>
            <br />
            <div>
              <button
                className={styles.cancel}
                onClick={() => {
                  myWindow.setFocusOn("none");
                  myWindow.overlay.close();
                }}
              >
                annuler
              </button>
              <button className={styles.dangerous} onClick={delete_group}>
                oui, effacer
              </button>
            </div>
          </div>
        </Alert>
        <div style={{ position: "relative" }}>
          <Popup duration={1000 * 60 * 10} type={undefined} name={id}>
            <div className={styles.pp_ctn} onClick={(e) => e.stopPropagation()}>
              {published.kdshop && (
                <MyLink href={`/groups/${_id}`}>
                  <Button type={"type"}>Voire Le Post</Button>
                </MyLink>
              )}
              <Button
                type={"type2"}
                onClick={() => {
                  myWindow.setFocusOn("delete_" + id);
                  myWindow.overlay.open(() => myWindow.setFocusOn("none"));
                }}
              >
                effacer le post
              </Button>
              <Button
                type={"type"}
                onClick={(e) => {
                  e.stopPropagation();
                  myWindow.setFocusOn(_id);
                  myWindow.setHashLocation("#edit_post", null, null, "tablet");
                }}
              >
                <img
                  style={{ height: "1em", marginRight: "var(--margin)" }}
                  src={"/svg/setting.svg"}
                  alt="setting icon"
                />
                Changer les parametres
              </Button>
            </div>
          </Popup>
          <button
            className={styles.btn}
            onClick={(e) => {
              myWindow.setFocusOn(id, e);
            }}
          >
            editer le poste
          </button>
        </div>
        <div>
          <button
            className={styles.btn}
            onClick={() =>
              myWindow.setHashLocation(`#${_id}`, null, null, "tablet")
            }
          >
            contenu du post
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;

export const Mock = () => {
  return (
    <div className={`${styles.b_mck}`}>
      <p>
        <span className="animated">There is the head</span>
      </p>
      <p>
        <span className="animated">
          We have to say some stuff wihile everything is loading
        </span>
      </p>
      <div className={styles.imageContainer}>
        <MyImage
          isVisible={true}
          imageLink={null}
          ASPECT_RATIO={100}
          loadingState={true}
        />
      </div>
    </div>
  );
};
