import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";



function index({ children }) {
  return (
    <>
      <NavBar />
      <Auth/>
      <div className="flex center-children" style={{ position: "relative" }}>
        <div className="big-container">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default index;
