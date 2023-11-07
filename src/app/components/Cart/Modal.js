import React, { useState } from "react";
import "./Modal.css";
import CartView from "./CartView";
import { postOrder } from "@/store/http";

const Modal = (props) => {
  const context = props.context;
  let cart = context.getCartProducts();

  const getTotalPrice = () => {
    return Math.round(props.getTotalPrice() * 100) / 100;
  };

  const [errorDisplayed, setErrorDisplay] = useState(false);

  const openError = () => {
    setErrorDisplay(true);
    setTimeout(() => {
      closeError();
    }, 9000);
  };

  const closeError = () => {
    setErrorDisplay(false);
  };

  async function processOrder() {
    let orderData = convertCartToOrder();
    let ok = await postOrder(orderData);
    if (ok) {
      context.clearCart();
    } else {
      openError();
    }
  }

  function convertCartToOrder() {
    let pizzas = [];
    let tableN = context.tableN;
    for (let itemI in cart) {
      for (let i = 0; i < cart[itemI]["quantity"]; i++) {
        pizzas.push({
          id: cart[itemI]["id"],
          notes: "",
        });
      }
    }

    return {
      "table": tableN,
      "pizzas": pizzas,
    };
  }

  return (
    <div className="modal backdrop-modal show d-block">
      <div className="modal-dialog moda-bg-dough">
        <div className="modal-content">
          <div className="modal-header">
            <a
              className="bg-light px-3 pb-2 pt-3 d-flex card navbar-brand h2 text-tomato border-italy-green text-cuanky"
              href="#"
            >
              Pizzaria Malluigi
            </a>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={props.close}
            ></button>
          </div>
          <div className="modal-body">
            <CartView context={context} cart={cart} />
          </div>
          <div className="justify-content-end d-flex align-items-baseline m-3 ">
            <h4 className="bg-italy-green text-light card px-2 py-1">
              Total ${getTotalPrice()}
            </h4>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.close}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={processOrder}
            >
              Order
            </button>
          </div>
          {errorDisplayed && (
            <p className="text-danger close-animation">
              Couldn't order, please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
