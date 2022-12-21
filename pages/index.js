import { useEffect, useState } from "react";
import { getLastProductsApi } from "../api/product";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import ListProducts from "../components/ListProducts";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews/Reviews";
import Services from "../components/Services";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import { BASE_PATH } from "../utils/constants";

export default function Home({ categories, drinks, happy, productOverview }) {
  return (
    <Layout title="Lavagna - Home" >
      <Banner />
      <Services />
      {!drinks && <span className="loader"></span>}
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
      <SingleProduct product={productOverview} />

    </Layout>
  );
}

export async function getServerSideProps() {
  const resCategory = await fetch(`${BASE_PATH}/api/categories?populate=*`);
  const resDrinks = await fetch(
    `${BASE_PATH}/api/products?populate=*&filters[category][url][$eq]=drinks-and-alcohol&pagination[start]=0&pagination[limit]=12`
  );
  const resHappy = await fetch(
    `${BASE_PATH}/api/products?populate=*&filters[category][url][$eq]=happy-hour-1`
  );
  const resSingleProduct = await fetch(`${BASE_PATH}/api/products?populate=*&filters[title][$eq]=Buffalo Trace Bourbon Cream Liqueur`)
  const dataCategory = await resCategory.json();
  const dataDrinks = await resDrinks.json();
  const dataHappy = await resHappy.json();
  const dataSingleProduct = await resSingleProduct.json();

  return {
    props: {
      categories: dataCategory.data,
      drinks: dataDrinks.data,
      happy: dataHappy.data,
      productOverview: dataSingleProduct.data[0],
    },
  };
}
