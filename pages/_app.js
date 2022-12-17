import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { getToken, removeToken, setToken } from "../api/token";
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import CartContext from "../context/CartContex";
import { addProductCart, agregarCarrito, getProductsCart } from "../api/cart";
import { toastError, toastSuccess } from "../utils/toast";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  const carritoLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : [];
  const [carrito, setCarrito] = useState(carritoLS);
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    //Comprobación manual de usuarios.

    setReloadUser(false);
  }, [reloadUser]);

  const handleLogin = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const handleLogout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };
  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
    } else {
      toastError("primero inicia sesion");
    }
  };
  const authData = useMemo(
    () => ({
      auth,
      login: handleLogin,
      logout: handleLogout,
      setReloadUser,
    }),
    [auth]
  );
  const agregarCarrito = (guitarra) => {
    // Comprobar si la guitarra ya esta en el carrito...
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Iterar para actualizar la cantidad
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      // Se asigna al array
      setCarrito([...carritoActualizado]);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      // En caso de que el articulo no exista, es nuevo y se agrega
      setCarrito([...carrito, guitarra]);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  };

  const eliminarProducto = (id) => {
    const carritoActualizado = carrito.filter((producto) => producto.id != id);
    setCarrito(carritoActualizado);
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.quantity = parseInt(guitarra.quantity);
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const cartData = useMemo(
    () => ({
      carrito: carrito,
      agregarCarrito: agregarCarrito,
      eliminarProducto: eliminarProducto,
      actualizarCantidad: actualizarCantidad,
    }),
    [carrito]
  );

  if (auth === undefined) return null;
  return (
    <>
      <AuthContext.Provider value={authData}>
        <CartContext.Provider value={cartData}>
          <Component {...pageProps} carrito />
          <Toaster />
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;
