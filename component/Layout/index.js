import NavBar from "./NavBar";
import Footer from "./Footer";

function index({ children }) {
  return (
    <>
      <NavBar />
      <div className="flex center-children" style={{position: 'relative'}}>{children}</div>
      <Footer />
    </>
  );
}

export default index;
