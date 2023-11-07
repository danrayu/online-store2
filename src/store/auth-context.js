import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

const AuthContext = React.createContext({
  products: [],
  cartItems: [],
  stringFilter: "",
  tableN: 0,
  addToCart: () => {},
  addToCartAnim: () => {},
  getCartProducts: () => {},
  minusCart: () => {},
  cartTotalPrice: () => {},
  setProducts: () => {},
  clearCart: () => {},
  setStringFilter: () => {},
});


const getItemById = (id, list) => {
  for (let itemi in list) {
    if (list[itemi]["id"] === id) {
      return list[itemi];
    }
  }
};

const addToCartAnim = () => {};

const getIndexById = (id, list) => {
  for (let itemi in list) {
    if (list[itemi].id === id) {
      return itemi;
    }
  }
  return null;
};

export const AuthContextProvider = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableN, setTableN] = useState();
  useEffect(() => {
    const table = searchParams.get("table");
    if (table) {
      setTableN(table);
    }
    else {
      setTableN("0");
    }
  }, []);

  const [stringFilter, setStringFilter] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const minusCart = (id, all = false /* entirely delete item from cart */) => {
    const idInCart = getIndexById(id, cartItems);
    let temp = [...cartItems];
    if (idInCart === null) {
      return;
    }

    if (all || cartItems[idInCart].quantity === 1) {
      temp.splice(idInCart, 1);
    } else {
      temp[idInCart] = {
        id: id,
        quantity: temp[idInCart].quantity - 1,
      };
    }
    setCartItems([...temp]);
  };

  const newToCart = (id) => {
    setCartItems((oldItems) => {
      return [
        ...oldItems,
        {
          id: id,
          quantity: 1,
        },
      ];
    });
  };

  const addToCart = (id) => {
    const idInCart = getIndexById(id, cartItems);
    if (idInCart === null) {
      newToCart(id);
    } else {
      let temp = [...cartItems];
      temp[idInCart] = {
        id: id,
        quantity: temp[idInCart].quantity + 1,
      };
      setCartItems([...temp]);
    }
  };

  const getCartProducts = () => {
    let cartProducts = [];
    for (let itemI in cartItems) {
      let id = cartItems[itemI].id;
      cartProducts.push({
        id: id,
        quantity: cartItems[itemI].quantity,
        fields: getItemById(cartItems[itemI].id, products),
      });
    }
    return cartProducts;
  };

  const cartTotalPrice = () => {
    let price = 0.0;
    let cart = getCartProducts();
    for (let itemI in cart) {
      price += cart[itemI].quantity * cart[itemI].fields.price;
    }
    return price;
  };

  function clearCart() {
    setCartItems([]);
  }

  return (
    <AuthContext.Provider
      value={{
        products: products,
        stringFilter: stringFilter,
        tableN: tableN,
        setStringFilter: setStringFilter,
        setProducts: setProducts,
        cartItems: cartItems,
        addToCart: addToCart,
        addToCartAnim: addToCartAnim,
        getCartProducts: getCartProducts,
        minusCart: minusCart,
        cartTotalPrice: cartTotalPrice,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
