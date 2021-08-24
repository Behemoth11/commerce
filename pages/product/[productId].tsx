import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/product.module.css";
import ProductSlideShow from "../../component/ProductSlideShow";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import Explore_SectionTitle from "../../component/Explore_SectionTitle";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";


const Product:React.FC = () => {
  const {
    query: { productId },
  } = useRouter();

  const { activeProductData } = useGlobalContext();

  return (
    <div className="big-container">
      <main className={`${styles.productPage}`}>
        <div>
          <div className="images-section">
            <ProductSlideShow
              imageUrls={[
                "/images/image1.jpg",
                "/images/image2.jpg",
                "/images/image3.jpg",
                "/images/image4.jpg",
                "/images/image5.jpg",
              ]}
            />
          </div>
        </div>

        <div className="product-info">
          <ProductInformation />
        </div>
        <div className="more-product">
          <MoreProduct />
        </div>
      </main>
    </div>
  );
}

export default Product;

interface productInformation{

}

const ProductInformation:React.FC<productInformation> = () => {
  
  return (
  <div>These are the product information</div>
)
}
interface moreProduct{

}

const MoreProduct:React.FC<moreProduct> = () => {
  
  return (
  <div>
    these are more product only for you pleasure
  </div>
)
}
