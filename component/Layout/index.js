import NavBar from "./NavBar";
import Footer from "./Footer";

function index({ children }) {
  return (
    <>
      <NavBar />
      <div className="flex center-children" style={{ position: "relative" }}>
        {" "}
        <div className="big-container">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default index;
