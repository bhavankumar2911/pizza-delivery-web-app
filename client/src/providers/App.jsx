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

  // quantity updation
  const updateQuantity = (id, updation) => {
    if (updation == "increase") {
      const newCart = [
        ...cart.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return { ...item };
        }),
      ];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const previousQuantity = cart.filter((item) => item.id == id)[0][
        "quantity"
      ];
      if (previousQuantity == 1) {
        return removeFromCart(id);
      } else {
        const newCart = [
          ...cart.map((item) => {
            if (item.id == id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return { ...item };
          }),
        ];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }
  };

  return (
    <Context.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};

export default AppProvider;
