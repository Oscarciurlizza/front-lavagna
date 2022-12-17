import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getProductByUrlApi } from "../api/product";
import Layout from "../components/Layout/Layout";
import SingleProduct from "../components/SingleProduct/SingleProduct";

const Products = () => {
  const { query } = useRouter();
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProductByUrlApi(query.products);
      setSingleProduct(response);
    })();
  }, [query]);
  return (
    <Layout>
      {!singleProduct ? (
        <h1>no hay productos</h1>
      ) : (
        <SingleProduct singleProduct={singleProduct} />
      )}
    </Layout>
  );
};

export default Products;
