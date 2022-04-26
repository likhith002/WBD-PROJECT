import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "@mui/material/Slider";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./tvstyle.css";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Header/Nav";
import ReactPaginate from "react-paginate";
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

import { useState, useEffect } from "react";

export default function TV() {
  const [pageNumber, setPageNumber] = useState(0);
  let URL_BASE = `http://localhost:3002/product?type=television&limit=6`;
  const [Url, setUrl] = useState("");
  const dispatch = useDispatch();
  const [dat, setdat] = useState([]);
  const [pri, setpri] = useState("");

  const [val, setval] = useState([0, 100]);
  const updateRangeP = (e, data) => {
    setval(data);
    setpri(`&price_min=${data[0] * 1000 + 1000}&price_max=${data[1] * 2000}`);
  };

  useEffect(() => {
    fetch(URL_BASE + `&page=${pageNumber}` + Url + pri)
      .then((response) => response.json())
      .then((data) => setdat(data));
  }, [pageNumber, Url, pri]);
  const ToDisplay = useSelector((state) => state.TFilter);

  const tvsPerPage = 6;
  const pagesVisited = pageNumber * tvsPerPage;
  const cart = useSelector(SelectCart);
  const wishlist = useSelector(SelectWishlist);
  const pageCount = Math.ceil(15 / tvsPerPage);
  const changePage = (pageObject) => {
    setPageNumber(pageObject.selected);
  };

  return (
    <div>
      <Nav />
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-2" id="left">
          <h4
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            FILTERS
          </h4>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>Availability</h6>
            <div>
              <label htmlFor="availablility">
                <input
                  type="checkbox"
                  name="Available"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&availability=true");
                      console.log(Url);
                    } else {
                      if (Url.includes("&availability=true")) {
                        var nUrl = Url.replace("&availability=true", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Available
              </label>
              <br />
              <label htmlFor="availablility">
                <input
                  type="checkbox"
                  name="notAvailable"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&availability=false");
                      console.log(Url);
                    } else {
                      if (Url.includes("&availability=false")) {
                        var nUrl = Url.replace("&availability=false", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Not Available
              </label>
            </div>
          </div>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>Brands</h6>
            <div>
              <label htmlFor="Samsung">
                <input
                  type="checkbox"
                  name="Samsung"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=samsung");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=samsung")) {
                        var nUrl = Url.replace("&brand=samsung", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Samsung
              </label>
              <br />
              <label htmlFor="Sony">
                <input
                  type="checkbox"
                  name="Sony"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=sony");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=sony")) {
                        var nUrl = Url.replace("&brand=sony", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Sony
              </label>
              <br />
              <label htmlFor="LGTV">
                <input
                  type="checkbox"
                  name="LGTV"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=lgtv");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=lgtv")) {
                        var nUrl = Url.replace("&brand=lgtv", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                LGTV
              </label>
              <br />
            </div>
          </div>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>Price</h6>
            <div style={{ width: "200px", marginLeft: "10px" }}>
              <h6>
                {val[0] * 1000 + 10000}-{val[1] * 2000}
              </h6>
              <Slider value={val} onChange={updateRangeP} />
            </div>
          </div>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>No of HDMI Ports</h6>
            <div>
              <label htmlFor="1">
                <input
                  type="checkbox"
                  name="NoofHDMIPorts"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&hdmi=1");
                      console.log(Url);
                    } else {
                      if (Url.includes("hdmi=1")) {
                        var nUrl = Url.replace("&hdmi=1", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                1
              </label>
              <br />
              <label htmlFor="2">
                <input
                  type="checkbox"
                  name="NoofHDMIPorts"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&hdmi=2");
                      console.log(Url);
                    } else {
                      if (Url.includes("hdmi=2")) {
                        var nUrl = Url.replace("&hdmi=2", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                2
              </label>
              <br />
              <label htmlFor="3">
                <input
                  type="checkbox"
                  name="NoofHDMIPorts"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&hdmi=3");
                      console.log(Url);
                    } else {
                      if (Url.includes("hdmi=3")) {
                        var nUrl = Url.replace("&hdmi=3", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                3
              </label>
              <br />
            </div>
          </div>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>Resolution</h6>
            <div>
              <label htmlFor="4K">
                <input
                  type="checkbox"
                  name="RAM"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&resolution=4K");
                      console.log(Url);
                    } else {
                      if (Url.includes("resolution=4K")) {
                        var nUrl = Url.replace("&resolution=4K", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                4K
              </label>
              <br />
              <label htmlFor="8K">
                <input
                  type="checkbox"
                  name="RAM"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&resolution=8K");
                      console.log(Url);
                    } else {
                      if (Url.includes("resolution=8K")) {
                        var nUrl = Url.replace("&resolution=8K", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                8K
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className="col-10" id="right" style={{ marginLeft: "-10px" }}>
          <div style={{ marginBottom: "10px", marginLeft: "1050px" }}>
            <DropdownButton
              style={{ zIndex: "100" }}
              id="dropdown-basic-button"
              title="Sort By the Following"
            >
              <Dropdown.Item
                onClick={() => {
                  setUrl(Url + "&sort=-1");
                }}
              >
                Price
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div class="row">
            {dat.map((val, key) => {
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
                        <svg
                          class="card__arc"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path />
                        </svg>

                        <div class="card__header-text">
                          <h3 class="card__title">{val.name}</h3>
                          <span class="card__status">
                            Price : Rs {val.price}
                          </span>
                          <br />
                          <span class="card__status">
                            Resolution : {val.resolution}
                          </span>
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
                                  <ShoppingBasketIcon
                                    style={{ color: "black" }}
                                  />
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
            })}
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttnss"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
