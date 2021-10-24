import "../styles/globals.css";
import Layout from "../component/Layout";
import GlobalContextProvider from "../Contexts/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp;
