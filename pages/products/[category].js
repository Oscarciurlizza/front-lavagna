import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getProductsCategoryApi } from "../../api/product";
import Layout from "../../components/Layout";
import ListProducts from "../../components/ListProducts";
import Products from "../../components/Products";

export default function Category() {
  const { query } = useRouter();

  const limitPerPage = 5;

  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      if (query.category) {
        const response = await getProductsCategoryApi(
          query.category,
          limitPerPage,
          0
        );
        setProducts(response.data || []);
      }
    })();
  }, [query]);

  return (
    <Layout title={query.category}>
      {!products && <span className="loader"></span>}
      {products === null ? (
        <h2>ho hay juegos</h2>
      ) : (
        <Products products={products} />
      )}
    </Layout>
  );
}
