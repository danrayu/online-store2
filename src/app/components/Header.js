import React, { useContext, useState } from "react";
import CartButton from "./Cart/CartButton";
import Modal from "./Cart/Modal";
import AuthContext from "@/store/auth-context";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const context = useContext(AuthContext);
  const setAddToCartAnim = (animCallback) => {
    context.addToCartAnim = animCallback;
  };

  function submitSearch(e) {
    e.preventDefault();
    context.setStringFilter(e.target[0].value.toLowerCase());
  }

  return (
    <>
      {show && (
        <Modal close={handleClose} getTotalPrice={context.cartTotalPrice} context={context} />
      )}
      <nav className="navbar navbar-expand-lg bg-white p-4">
          <a className="bg-light px-3 pb-2 pt-3 d-flex card navbar-brand h2 text-tomato border-italy-green text-cuanky" href="#">
            Pizzaria Malluigi
          </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <ul className="navbar-nav ">
            <li className="btn btn-success mx-1 nav-item active">
              <a className="nav-link text-light" href="#">
                Home <span className="sr-only text-light">(current)</span>
              </a>
            </li>
            <li className="btn btn-success mx-1 nav-item">
              <a className="nav-link text-light" href="#">
                Link
              </a>
            </li>
          </ul> */}
          <form className="d-flex ms-auto" onSubmit={submitSearch}>
            <input
              className="form-control me-2 dark"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <CartButton
          do={handleShow}
          itemsCount={context.cartItems.length}
          animSetter={setAddToCartAnim}
        ></CartButton>
      </nav>
    </>
  );
};

export default Header;
