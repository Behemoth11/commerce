import useSWR from "swr";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/find.module.css";
import React, { useState, useEffect } from "react";
import PageIndex from "../../component/pagination";
import ActiveFilter from "../../component/ActiveFilters";
import FilterOverlay from "../../component/FilterOverlay";
import ProductListGrid from "../../component/ProductList-grid";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import MoreProduct from "../../component/ProductList-flex/preset";
import FindContext, { useFindContext } from "../../Contexts/FindContext";
import Explore_SectionTitle from "../../component/Explore_SectionTitle";
import { getRelated } from "../../component/Layout/NavBar/navBarSections";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";
import FilterContainer from "../../component/FilterContainer";
import { fetchNavigation } from "../../shared/shared_functions";

const fetcher = (url) => fetch(url).then((res) => res.json());

const createUrl = (_categories, filters) => {
  if (!_categories) return;

  const categories = string_and_array_to_array(_categories).filter(
    (category) => category != "all"
  );
  const categoriesQuery = categories
    .map((category) => `categories=${category}`)
    .join("&");

  const filterQuery = Object.keys(filters)
    .map((filter) => {
      switch (filter) {
        case "price":
          return `price=${filters["price"][1] + "to" + filters.price[3]}`;
        default:
          return Object.keys(filters[filter])
            .map((choseFilter) => `${filter}=${choseFilter}`)
            .join("&");
      }
    })
    .join("&");

  return categoriesQuery + "&" + filterQuery;
};

function Find() {
  const {
    query: { categories },
  } = useRouter();
  const [displayType, setDisplayType] = useState<"single" | "double">(
    "double" || "single"
  );

  const { filters } = useGlobalContext();
  const [page, setPage] = useState<number>(1);
  const [areMoreProduct, setAreMoreProduct] = useState(false);
  const [products, setProducts] = useState(
    Array.from({ length: 10 }).map((e) => ({ price: 100 }))
  );

  const [relatedItems, setRelatedItems] = useState([
    { representation: "x" },
    { representation: "x" },
  ]);
  // console.log("the categories are ", categories)
  useEffect(() => {
    (async () => {
      if (!categories) return;

      await fetchNavigation(categories, setRelatedItems);
    })();
  }, [categories]);

  useEffect(() => {
    (async () => {
      if (!categories || !filters.value) return;

      const query = createUrl(categories, filters.value);
      // @ts-ignore
      const { data } = await axios

        .get(
          `/api/product?${query}&page=${page}&limit=20&field=_id&field=productName&field=price&field=description&field=pr_image_url`
        )
        .catch((err) => console.log(err));

      setProducts(data.products);
      setAreMoreProduct(data.more);
    })();
  }, [filters.value, categories, page]);

  useEffect(() => {
    document.getElementById("__next").scroll(0, 0);
  }, [categories, page]);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Discover goods in gabon</title>
      </Head>

      <div className="container">
        <Explore_SectionTitle categories={categories} />
      </div>

      <div className="sm">
        <FilterOverlay />
      </div>

      <ActiveFilter displayType={displayType} setDisplayType={setDisplayType} />

      <main className={styles.container}>
        <div className="big" style={{marginLeft: "var(--margin)"}}>
          <FilterContainer
            key="45"
            showApplyFilter={false}
            applyFilterSideEffect={() => console.log(4)}
            defaultOpened={["color"]}
            maxOpened={3}
          />
        </div>
        <div>
          <ProductListGrid
            displayType={displayType}
            aspect_ratio={undefined}
            items={products}
          />
        </div>
      </main>

      <div className="flex">
        <PageIndex activePage={page} setPage={setPage} totalPages={10} />
      </div>

      <MoreProduct title={"related"} items={relatedItems} />
    </div>
  );
}

const Wrapper = () => {
  return (
    <FindContext>
      <Find />
    </FindContext>
  );
};

export default Wrapper;
