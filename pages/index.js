import { useEffect, useState } from "react";
import { getLastProductsApi } from "../api/product";
import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Layout from "../components/Layout";
import ListProducts from "../components/ListProducts";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Slider from "../components/Slider";

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(0, 12);
      setProducts(response.data || []);
    })();
  }, []);

  return (
    <Layout title="Lavagna - Home">
      <Navbar />
      <Banner />
      <Services />
      {!products && <span className="loader"></span>}
      {products === null ? (
        <h2>ho hay juegos</h2>
      ) : (
        <ListProducts products={products} />
      )}
      <Reviews />
    </Layout>
  );
}
