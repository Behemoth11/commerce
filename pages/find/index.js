import { useRouter } from "next/router";
import { useEffect } from 'react';
import ProductList from "../../component/ProductList-type2"
import ProductList1 from "../../component/ProductList-type1"

function index() {
  const router = useRouter();

  return <div className="big-container">
    <ProductList />
    <ProductList1/>
  </div>;
}

export default index;
