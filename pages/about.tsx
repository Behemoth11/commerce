import Header from "../component/Text/Header";
import styles from "../styles/about.module.scss";

const about = () => {
  return (
    <div
      className="big-container"
      style={{ padding: "0 var(--padding)", flexWrap: "wrap" }}
    >
      <h2>
          About us
      </h2>
      <p>
          Hello we are a little startup built to help business connect with customers. We do not host any business transaction and work for only allowing customer to find what they want.
      </p>
    </div>
  );
};

export default about;
