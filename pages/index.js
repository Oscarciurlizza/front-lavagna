import { useEffect, useState } from "react";
import { getLastProductsApi } from "../api/product";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import ListProducts from "../components/ListProducts";
import Navbar from "../components/Navbar";
import ProductDetail from "../components/ProductDetail";
import Reviews from "../components/Reviews/Reviews";
import Services from "../components/Services";
import { BASE_PATH } from "../utils/constants";

export default function Home({ categories, drinks, happy }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(0, 12);
      setProducts(response.data || []);
    })();
  }, []);

  return (
    <Layout title="Lavagna - Home">
      <Navbar categories={categories} />
      <Banner />
      <Services />
      {!products && <span className="loader"></span>}
      {drinks === null ? (
        <h2>ho hay juegos</h2>
      ) : (
        <ListProducts
          title="Choose"
          subtitle="Your Alcohol"
          products={drinks}
        />
      )}
      {happy === null ? (
        <h2>ho hay juegos</h2>
      ) : (
        <ListProducts title="New" subtitle="Happy Hour" products={happy} />
      )}
      <Reviews />
      <ProductDetail />
    </Layout>
  );
}

export async function getServerSideProps() {
  const resCategory = await fetch(`${BASE_PATH}/api/categories?populate=*`);

  const resDrinks = await fetch(
    `${BASE_PATH}/api/products?populate=*&filters[category][url][$eq]=drinks-and-alcohol`
  );
  const resHappy = await fetch(
    `${BASE_PATH}/api/products?populate=*&filters[category][url][$eq]=happy-hour-1`
  );
  const dataCategory = await resCategory.json();
  const dataDrinks = await resDrinks.json();
  const dataHappy = await resHappy.json();

  return {
    props: {
      categories: dataCategory.data,
      drinks: dataDrinks.data,
      happy: dataHappy.data,
    },
  };
}
