import "../styles/globals.scss";
import Script from "next/script";
import Layout from "../component/Layout";
import { useState, useEffect } from "react";
import GlobalContextProvider from "../Contexts/GlobalContext";
import Router from "next/router";

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
