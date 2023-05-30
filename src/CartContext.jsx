import { createContext, useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const cart = [];

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState(() =>
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const clearCart = () => {
    setCartProducts([]);
    setCart([]);
  };

  useEffect(() => {
    // Fetch cart products from the database based on the product IDs in the cart
    const fetchCartProducts = async () => {
      if (cart.length === 0) {
        setCartProducts([]);
        return;
      }

      const productIds = cart.map((product) => product.id);
      const { data: products, error } = await supabase
        .from("kitchen")
        .select("*")
        .in("id", productIds);

      if (error) {
        console.error("Error fetching product details:", error);
        return;
      }

      const cartProductsWithQuantity = products.map((product) => {
        const cartProduct = cart.find((item) => item.id === product.id);
        return {
          ...product,
          quantity: cartProduct.quantity,
        };
      });

      setCartProducts(cartProductsWithQuantity);
    };

    fetchCartProducts();
  }, [cart]);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // product is not in cart
      setCart((prevCart) => [
        ...prevCart,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCart((prevCart) =>
      prevCart.filter((currentProduct) => currentProduct.id !== id)
    );
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    cart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
