import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(null);

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //   initialize cart
  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      setCart(JSON.parse(cart));
    }
  }, []);

  //   add pizza to cart
  const addToCart = (pizza) => {
    if (cart.filter((tempPizza) => tempPizza.id === pizza.id).length > 0)
      return;

    const newCart = [...cart, pizza];

    localStorage.setItem("cart", JSON.stringify(newCart));

    setCart(newCart);
  };

  //   remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((pizza) => pizza.id !== id);

    localStorage.setItem("cart", JSON.stringify(newCart));

    setCart(newCart);
  };

  return (
    <Context.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};

export default AppProvider;
