import React, { useState } from "react";
import style from './CartButton.module.css';

const CartButton = (props) => {
  const [buttonGlow, setButtonGlow] = useState(false);
  const callMaster = () => {
    props.do();
  }
  
  const glowAnim = () => {
    setButtonGlow(true);

    setTimeout(() => {
      setButtonGlow(false);
    }, 140);
  }

  props.animSetter(glowAnim);

  return (
    <button className={"btn btn-md btn-success ms-2 d-flex " + (buttonGlow && style['cart-button-glow'])} onClick={callMaster}>
        Cart 
        <p className="m-0">{props.itemsCount}</p>
    </button>
  );
};

export default CartButton;
