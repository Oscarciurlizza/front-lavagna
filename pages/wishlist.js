import React, { useEffect, useState } from "react";
import { getFavoriteApi } from "../api/favorite";
import WishList from "../components/Header/WishList";
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";

export default function wishlist() {
  const { auth, logout } = useAuth();
  const [favoritesProducts, setFavoritesProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      setFavoritesProducts(response);
    })();
  }, []);

  return (
    <Layout title="Ecommerce - wishlist">
      {!favoritesProducts ? (
        <h1>no hay productos</h1>
      ) : (
        <WishList favoritesProducts={favoritesProducts} />
      )}
    </Layout>
  );
}
