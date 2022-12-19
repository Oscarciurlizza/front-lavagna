import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getProductByUrlApi } from "../api/product";
import Layout from "../components/Layout/Layout";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import { BASE_PATH } from "../utils/constants";

export default function Products({ product }) {

  console.log(product)
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
        <SingleProduct singleProduct={singleProduct} product={product} />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const resProduct = await fetch(`${BASE_PATH}/api/products?populate=*&filters[url][$eq]=${context.query.products}`)
  const dataProduct = await resProduct.json();

  return {
    props: {
      product: dataProduct.data[0],
    }
  }

}