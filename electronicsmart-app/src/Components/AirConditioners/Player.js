import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./airconditionerstyle.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { addtoCart, SelectCart } from "../../features/Reducers/CartSlice";
import {
  addtoWish,
  SelectWishlist,
} from "../../features/Reducers/WishlistSlice";

export default function Player(props) {
  const dispatch = useDispatch();
  const cart = useSelector(SelectCart);
  const wishlist = useSelector(SelectWishlist);
  console.log(props.data);
  return props.data.map((val) => {
    return (
      <div className="col-4" style={{ marginBottom: "30px" }}>
        <div className="card">
          <img
            src={val.img}
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
                <h3 class="card__title">{val.name}</h3>
                <span class="card__status">Price : Rs {val.price}</span>
                <br />
              </div>
            </div>
            <p class="card__description">
              <div>
                <div style={{ float: "left", margin: "5px" }}>
                  <div style={{ float: "left" }}>
                    <Link to={`/product/${val._id}`}>
                      {" "}
                      <div
                        style={{
                          borderRadius: "18px",
                          backgroundColor: "#f54d4d",
                          borderColor: "#D7BDCA",
                        }}
                        class="btn btn-primary"
                      >
                        View More details
                      </div>
                    </Link>
                  </div>
                  <div
                    style={{
                      margin: "5px",
                      marginLeft: "20px",
                      float: "left",
                      cursor: "pointer",
                    }}
                  >
                    {!cart.some((obj) => val._id === obj._id) ? (
                      <div
                        onClick={() => {
                          dispatch(addtoCart(val));
                        }}
                      >
                        <ShoppingBasketOutlinedIcon
                          style={{ color: "black" }}
                        />
                      </div>
                    ) : (
                      <div style={{ cursor: "context-menu" }}>
                        <ShoppingBasketIcon style={{ color: "black" }} />
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      margin: "5px",
                      marginLeft: "20px",
                      float: "right",
                      cursor: "pointer",
                    }}
                  >
                    {!wishlist.some((obj) => val._id === obj._id) ? (
                      <div
                        onClick={() => {
                          dispatch(addtoWish(val));
                        }}
                      >
                        <FavoriteBorderIcon
                          style={{
                            color: "red",
                            fontWeight: "bold",
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{ cursor: "context-menu" }}>
                        <FavoriteIcon
                          style={{
                            color: "red",
                            fontWeight: "bold",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  });
}
