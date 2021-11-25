import MyImage from "../../component/MyImage";
import styles from "../../styles/account.module.scss";
import React, { useState, useEffect } from "react";
import MyLink from "../../component/MyLink";
import { useRequire } from "../../shared/CustomHooks";
import Popup from "../../component/popup";
import Expend from "../../component/popup/Expend";
import NormalInput from "../../component/Inputs/NormalInput";
import Button from "../../component/Button";
import {
  useAuthcontext,
  useUser,
  useMyWindow,
} from "../../Contexts/GlobalContext";

function Account() {
  // useRequire("login");
  const User = useUser();
  const myWindow = useMyWindow();

  useEffect(() => {
    document.getElementById("__next").scroll(0, 0);
  }, []);

  return (
    <div className="big-container">
      <div className={styles.header}>
        <div>
          {(User.data?.pr_picture && (
            <MyImage
              isVisible={true}
              ASPECT_RATIO={100}
              no_optimization={true}
              imageLink={
                "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=393&q=80"
              }
            />
          )) || (
            <div className={styles.imageReplacement}>
              <span>
                {User.data?.lastName?.slice(0, 1)}
                {User.data?.firstName?.slice(0, 1)}
              </span>
            </div>
          )}
        </div>
        <div>
          <p>
            {User.data?.firstName} {User.data?.lastName}--{" "}
            <span className="c-at">@{User.data?.username}</span>
          </p>
          <p className="c-th-5">{User.data?.role}</p>
        </div>
      </div>

      <div className={styles.body}>
        <MyLink href={"/cart"}>
            <div className={styles.optionWrapper}>
              <p>
                Open My Cart <img src="svg/bagIcon.svg"></img>
              </p>
            </div>
        </MyLink>
        <div
          className={styles.optionWrapper}
          onClick={() => myWindow.setFocusOn("no_availabe_user_upgrade")}
        >
          <Popup duration={5000} type={"aga"} name={"no_availabe_user_upgrade"}>
            <div className={styles.message}>
              <h3>!!! Not Yet available</h3>
              <p>
                Options not currently available, contact administarter for more
                informations
              </p>
              <MyLink href="/contact?focus=become a seller">
                to contact page
              </MyLink>
            </div>
          </Popup>
          <p>
            Become a seller <img src="/svg/dolar.svg" alt="dolar svg" />{" "}
          </p>
        </div>
        <div
          className={styles.optionWrapper}
          onClick={() => myWindow.setHashLocation("#profile")}
        >
          <Expend
            visible={myWindow.hashLocation == "#profile"}
            top_prop={75}
            closePopup={() => window.history.go(-1)}
          >
            <ProfileEdit />
          </Expend>
          <p>
            Edit Profile <img src="/svg/edit_pencil.svg" alt="profile icon" />
          </p>
        </div>
        <div
          className={styles.optionWrapper}
          onClick={() => myWindow.setFocusOn("no_availabe_setting")}
        >
          <Popup duration={5000} type={"aga"} name={"no_availabe_setting"}>
            <div className={styles.message}>
              <h3>!!! Not Yet available</h3>
              <p>
                Options not currently available, contact administarter for more
                informations
              </p>
              <MyLink href="/contact?focus=become a seller">
                to contact page
              </MyLink>
            </div>
          </Popup>
          <p>
            Setting <img src="/svg/setting.svg" alt="setting wheel" />{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Account;

const ProfileEdit = () => {
  const User = useUser();
  const auth = useAuthcontext();
  const myWindow = useMyWindow();
  const [inputValue, setInputValue] = useState({});
  const [myState, setMyState] = useState("init");
  
  const handleSave = async () => {
    setMyState("loading");
    let response;
    response = await auth.axios
      .put("/api/user/userData", inputValue)
      .catch((err) => (response = err.response));
    if (response.status === 200) {
      setMyState("success");
    } else {
      setMyState("failure");
    }
    setTimeout(() => {
      window.history.go(-1)
    }, 300);
  };

  return (
    <form className={styles.editProfile}>
      <h3>edit profile</h3>
      <NormalInput
        name="username"
        required={true}
        inputValue={inputValue}
        setInputValue={setInputValue}
        defaultValue={User.data?.username}
      />
      <NormalInput
        label="First Name"
        name="firstName"
        required={true}
        inputValue={inputValue}
        setInputValue={setInputValue}
        defaultValue={User.data?.firstName}
      />
      <NormalInput
        label="Last Name"
        name="lastName"
        required={true}
        inputValue={inputValue}
        setInputValue={setInputValue}
        defaultValue={User.data?.lastName}
      />
      <NormalInput
        label="Phone Number"
        name="phoneNumber"
        required={true}
        inputValue={inputValue}
        setInputValue={setInputValue}
        defaultValue={User.data?.contact?.phoneNumber}
      />
      <NormalInput
        name="email"
        required={true}
        inputValue={inputValue}
        setInputValue={setInputValue}
        defaultValue={User.data?.contact?.email}
      />
      <Button
        label={"retour"}
        type="type1"
        onClick={() => window.history.go(-1)}
      />
      <Button label={"sauvegarder"} onClick={handleSave} />
    </form>
  );
};
