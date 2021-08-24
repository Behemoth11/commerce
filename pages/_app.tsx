import "../styles/globals.css";
import Layout from "../component/Layout";
import GlobalContextProvider from "../Contexts/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </Layout>
  );
}

export default MyApp;
