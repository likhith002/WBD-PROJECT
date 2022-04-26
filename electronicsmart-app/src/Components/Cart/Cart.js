import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import TempHeader from "../Header/TempHeader";
import { Link } from "react-router-dom";
import { removefromCart } from "../../features/Reducers/CartSlice";
import { SelectCart } from "../../features/Reducers/CartSlice";

import { useNavigate } from "react-router-dom";
function Cart() {
  const cart = useSelector(SelectCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="cart ">
      <TempHeader />
      <h1 style={{ marginTop: "80px" }}>CART</h1>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Back
      </button>
      {cart.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>YOUR CART IS EMPTY</h1>
      ) : (
        <div className="proceed_checkout">
          <span>
            <h5 style={{ float: "right" }}>
              Proceed to checkout
              <Link to="/checkout">
                <button className="proceed_checkout_button">Proceed</button>
              </Link>
            </h5>
          </span>
          <div className="row">
            {cart.map((obj) => (
              <div
                className="col-4"
                style={{
                  marginBottom: "20px",
                  marginTop: "50px",
                  // marginLeft: "50px",

                  // marginRight: "-70px",
                }}
              >
                <div className="card">
                  <img
                    src={obj.img}
                    style={{
                      objectFit: "contain",
                      height: "400px",
                      width: "400px",
                    }}
                    class="card__image"
                    alt=""
                  />
                  <div class="card__overlay">
                    <div class="card__header">
                      <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                        <path />
                      </svg>

                      <div class="card__header-text">
                        <h3 class="card__title">{obj.name}</h3>
                        <span class="card__status">Rs {obj.price}</span>
                      </div>
                    </div>
                    <p class="card__description">
                      <button
                        className="button-18"
                        role="button"
                        onClick={() =>
                          dispatch(removefromCart({ product_id: obj._id }))
                        }
                      >
                        Remove from Cart
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
