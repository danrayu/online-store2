import React, { useState } from "react";
import TrashButton from "../generic/TrashButton";
import PlusMinusButton from "../generic/PlusMinusButton";
import style from "./ProductCartThumb.module.css";

const ProductCartThumb = (props) => {
  let item = props.prod;
  const [componentClosed, setComponentClosed] = useState(false);


  const closeComponent = () => {
    setComponentClosed(true);
    setTimeout(() => {
      props.context.minusCart(item["id"], true);
    }, 505);
  };

  const removeFromCart = () => {
    closeComponent();
  };

  const modCart = (positive) => {
    if (positive) {
      props.context.addToCart(item["id"]);
    } else {
      if (item.quantity === 1) {
        closeComponent();
        return;
      }
      props.context.minusCart(item["id"]);
    }
  };

  return (
    <div className={"col-12" + (componentClosed ? style["close-animation"] : ' p-3')}>
      <div className="p-3 card-bg-crust border-0 card d-flex flex-column align-content-between h-100">
        <div>
          <h4>{item.fields["name"]}</h4>
        </div>
        <div className="d-flex">
          <PlusMinusButton
            plus={false}
            onClick={() => modCart(false)}
          ></PlusMinusButton>
          <p className={"my-1 mx-2 " + style["quantity-field"]}>
            {item.quantity}
          </p>
          <PlusMinusButton
            plus={true}
            onClick={() => modCart(true)}
          ></PlusMinusButton>
        </div>
        <div className="mt-auto pt-2 d-flex justify-content-end">
          <h3 className="p-1 my-1 me-1">
            ${item.fields["price"]}
          </h3>
          <TrashButton do={removeFromCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductCartThumb;
