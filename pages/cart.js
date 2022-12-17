import React, { useState } from "react";
import CartDetails from "../components/CartDetails/CartDetails";
import Shipping from "../components/CartDetails/Shipping";
import Layout from "../components/Layout";

export default function cart() {
  const [address, setAddress] = useState(null);
  console.log(address);

  return (
    <Layout title="Ecommerce - cart">
      <CartDetails />
      <Shipping setAddress={setAddress} />
    </Layout>
  );
}
