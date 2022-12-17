import { createContext } from "react";

const CartContext = createContext({
  carrito: undefined,
  agregarCarrito: () => null,
  eliminarProducto: () => null,
  actualizarCantidad: () => null,
});

export default CartContext;
