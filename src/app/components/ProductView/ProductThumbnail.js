import React, { useState } from "react";
import { Thumbnail } from "../generic/Thumbnail";
import { getIp } from "@/store/http";

const ProductThumbnail = (props) => {
  let item = props.prod;

  const [isPressed, setPressState] = useState(false);
  const thumbURL = "http://"+getIp()+":5000/static/images/" + item.image.src;
  const buttonPress = () => {
    let id = item["id"];
    props.press(id);
  };

  const onMouseDown = () => {
    setPressState(true);
  };

  const onMouseUp = () => {
    setTimeout(() => {
      setPressState(false);
    }, 70);
  };

  return (
    <div className="col-lg-4 col-md-6 col-12 p-3">
      <div className="p-4 pb-3 card-bg-dough crust-border card d-flex flex-column align-content-between h-100">
        <div>
          <h3 className="text-cuanky font-weight-bold">{item["name"]}</h3>
          <div className="mb-2">
            <Thumbnail image={thumbURL} />
          </div>
          <p className="mb-2">{item["description"]}</p>
        </div>
        <h4 className="me-3">${item["price"]}</h4>
        <div className="mt-auto pt-2 d-flex justify-content-end">
          <button
            className={
              "btn w-fit btn-success text-light " +
              (isPressed && "btn-green-pressed")
            }
            onClick={buttonPress}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductThumbnail;
