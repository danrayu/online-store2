import React from "react";
import ProductCartThumb from "./ProductCartThumb";

const CartView = (props) => {
  const context = props.context;

  let cart = props.cart;

  const displayCart = () => {
    return cart.map((item) => {
      return (
        <ProductCartThumb prod={item} context={context} key={item["id"]} />
      );
    });
  };

  return (
    <div className="display-grid">
      <div className="d-flex flex-wrap">
        {(cart.length !== 0) && displayCart()}
        {cart.length === 0 && <h5>The cart is empty</h5>}
      </div>
    </div>
  );
};

export default CartView;
