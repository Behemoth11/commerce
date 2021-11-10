import axios from "axios";
import { useRouter } from "next/router";
import MyImage from "../../component/MyImage";
import styles from "../../styles/account.module.css";
import React, { useState, useEffect } from "react";
import Input from "../../component/Inputs/NormalInput";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import Link from "next/link";
import { useRequire } from "../../shared/CustomHooks";
import Popup from "../../component/popup";
import Expend from "../../component/popup/Expend";
import NormalInput from "../../component/Inputs/NormalInput";
import Button from "../../component/Button";

function Login() {
  const { User, auth } = useGlobalContext();
  // useRequire("login");

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);

  useEffect(() => {
    document.getElementById("__next").scroll(0, 0);
  }, []);

  const handleSave = async () => {
    await auth.axios.put("/api/user/userData", inputValue);
  }
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
        <Link href={"/cart"}>
          <a>
            <div className={styles.optionWrapper}>
              <p>
                Open My Cart <img src="svg/bagIcon.svg"></img>
              </p>
            </div>
          </a>
        </Link>
        <div
          className={styles.optionWrapper}
          onClick={() => setPopupIsOpen(true)}
        >
          <Popup
            isVisible={popupIsOpen}
            closePopup={() => setPopupIsOpen(false)}
            duration={5000}
            type={"aga"}
            name={"no_availabe"}
          >
            <div className={styles.message}>
              <h3>!!! Not Yet available</h3>
              <p>
                Options not currently available, contact administarter for more
                informations
              </p>
              <Link href="/contact?focus=become a seller">
                <a>to contact page</a>
              </Link>
            </div>
          </Popup>
          <p>
            Become a seller <img src="/svg/dolar.svg" alt="dolar svg" />{" "}
          </p>
        </div>
        <div
          className={styles.optionWrapper}
          onClick={() => setEditProfileIsOpen((prev) => !prev)}
        >
          <Expend visible={editProfileIsOpen} top_prop={"75"} closePopup={() => setEditProfileIsOpen(false)}>
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
                name="firstName"
                required={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={User.data?.firstName}
              />
              <NormalInput
                name="lastName"
                required={true}
                inputValue={inputValue}
                setInputValue={setInputValue}
                defaultValue={User.data?.lastName}
              />
              <Button label={"Cancel"} type="type1" onClick={() => setEditProfileIsOpen(false)}/>
              <Button label={"Save"} onClick={handleSave}/>
            </form>
          </Expend>
          <p>
            Edit Profile <img src="/svg/edit_pencil.svg" alt="profile icon" />
          </p>
        </div>
        <div className={styles.optionWrapper}>
          <p>
            Setting <img src="/svg/setting.svg" alt="setting wheel" />{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
