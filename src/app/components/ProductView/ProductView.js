import AuthContext from "@/store/auth-context";
import React, { useContext, useEffect, useState } from "react";
import ProductThumbnail from "./ProductThumbnail";
import { useFetch } from "@/app/hooks/useFetch";
import { fetchPizzaData } from "@/store/http";
import LoadingComponent from "../generic/LoadingComponent";

const ProductView = () => {
  const context = useContext(AuthContext);
  const [isFetchingP, pizzaData, fetchPError] = useFetch(fetchPizzaData);
  const [displayedProducts, setDisplayedProducts] = useState(pizzaData);
  const [stringFilter, setStringFilter] = useState("");

  const addToCart = (id) => {
    context.addToCart(id);
    context.addToCartAnim();
  };

  useEffect(() => {
    if (!isFetchingP) {
      context.setProducts(pizzaData);
    }
  }, [isFetchingP])


  /**
   * The two following useEffects are for managing the 
   * stringFilter. One is for listening from context,
   * the other for actually using the value
   */
  useEffect(() => {
    setStringFilter(context.stringFilter);
  }, [context.stringFilter])

  useEffect(() => {
    if (pizzaData) {
      setDisplayedProducts(pizzaData.filter(item => item.name.toLowerCase().includes(stringFilter)));
    }
  }, [stringFilter, pizzaData])

  return (
    <div>
      <div className="filters-and-sorts"></div>
      {(!isFetchingP && displayedProducts.length === 0) && <h4>No products match the search.</h4>}
      {isFetchingP && <LoadingComponent/>}
      {(!isFetchingP && !fetchPError) && 
        <>
          <div className="display-grid">
            <div className="d-flex flex-wrap">
              {displayedProducts.map((item) => {
                return (
                  <ProductThumbnail
                    prod={item}
                    press={addToCart}
                    key={item["id"]}
                  />
                );
              })}
            </div>
          </div>

          <div className="page-navigator"></div>
        </>
      }
      {fetchPError && <h3 style={{ color: "#ff0000" }}>Couldn't load data.</h3>}
    </div>
  );
};

export default ProductView;
