import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removefromWish,
  SelectWishlist,
} from "../../features/Reducers/WishlistSlice";

import "./Wishlist.css";
import TempHeader from "../Header/TempHeader";
function Wishlist() {
  const wishlist = useSelector(SelectWishlist);
  const dispatch = useDispatch();
  return (
    <div className="row">
      <TempHeader></TempHeader>
      <h1 style={{ marginTop: "80px", textAlign: "center" }}>WISHLIST</h1>
      {wishlist.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>YOUR LIST IS EMPTY</h1>
      ) : (
        wishlist.map((obj) => (
          <div
            className="col-4"
            style={{
              marginBottom: "20px",
              marginTop: "50px",
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
                    onClick={() => {
                      dispatch(removefromWish({ product_id: obj._id }));
                    }}
                  >
                    Remove from Wishlist
                  </button>
                </p>
              </div>
            </div>
          </div>
          // <div className="col-4" style={{ marginBottom: "30px" }}>
          //   <div className="card">
          //     <div className="card-body">
          //       <h5 className="card-title">{obj.Name}</h5>
          //       <p className="card-text">
          //         Price : {obj.Price} <br />
          //       </p>
          //       <button
          //         onClick={() =>
          //           dispatch(removefromWish({ product_id: obj.product_id }))
          //         }
          //         className="btn btn-primary"
          //       >
          //         Remove from List
          //       </button>
          //     </div>
          //   </div>
          // </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
