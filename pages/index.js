import { useEffect, useState } from "react";
import { getLastProductsApi } from "../api/product";
import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Layout from "../components/Layout";
import ListProducts from "../components/ListProducts";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import SideNavbar from "../components/SideNavbar";

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(0, 4);
      setProducts(response.data || []);
    })();
  }, []);

  return (
    <Layout title="Lavagna - Home">
      <div className="sm:flex gap-10">
        <section className="">
          <SideNavbar />
        </section>
        <section className="w-full mt-10">
          <Navbar />
          <div className="h-96 sm:grid grid-cols-8 gap-10">
            <section className="bg-sky-100 col-span-5"></section>
            <section className="flex flex-col gap-5 col-span-3">
              <div className="h-full bg-blue-100"></div>
              <div className="h-full bg-gray-200"></div>
            </section>
          </div>
        </section>
      </div>
      <Services />
      {!products && <span className="loader"></span>}
      {products === null ? (
        <h2>ho hay juegos</h2>
      ) : (
        <ListProducts products={products} />
      )}
      <Banner />
      <Collections />
    </Layout>
  );
}
