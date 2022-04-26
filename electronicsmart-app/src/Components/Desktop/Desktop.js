import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./desktopstyle.css";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slider from "@mui/material/Slider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addtoCart, SelectCart } from "../../features/Reducers/CartSlice";
import {
  addtoWish,
  SelectWishlist,
} from "../../features/Reducers/WishlistSlice";

import { useState, useEffect } from "react";
import Nav from "../Header/Nav";
export default function Desktop() {
  const [pageNumber, setPageNumber] = useState(0);
  let URL_BASE = `http://localhost:3002/product?type=desktop&limit=6`;
  const [Url, setUrl] = useState("");
  const [dat, setdat] = useState([]);
  const [pri, setpri] = useState("");
  const [mem, setmem] = useState("");
  const [rm, setrm] = useState("");

  const [val, setval] = useState([0, 100]);
  const [val1, setval1] = useState([0, 100]);
  const [val2, setval2] = useState([0, 100]);

  const updateRangeP = (e, data) => {
    setval(data);
    setpri(`&price_min=${data[0] * 1000 + 10000}&price_max=${data[1] * 2000}`);
  };

  const updateRangeM = (e, data) => {
    setval1(data);
    setmem(`&memory_min=${data[0]}&memory_max=${data[1] / 5}`);
  };

  const updateRangeR = (e, data) => {
    setval2(data);
    setrm(`&ram_min=${data[0]}&ram_max=${data[1] * 10}`);
  };

  useEffect(() => {
    fetch(URL_BASE + `&page=${pageNumber}` + Url + pri + mem + rm)
      .then((response) => response.json())
      .then((data) => setdat(data));
  }, [pageNumber, Url, pri, mem, rm]);

  const dispatch = useDispatch();

  const desktopsPerPage = 6;

  const pageCount = Math.ceil(15 / desktopsPerPage);
  const changePage = (pageObject) => {
    setPageNumber(pageObject.selected);
  };
  const cart = useSelector(SelectCart);
  const wishlist = useSelector(SelectWishlist);
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
              <label htmlFor="Dell">
                <input
                  type="checkbox"
                  name="Dell"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=dell");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=dell")) {
                        var nUrl = Url.replace("&brand=dell", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Dell
              </label>
              <br />
              <label htmlFor="HP">
                <input
                  type="checkbox"
                  name="HP"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=hp");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=hp")) {
                        var nUrl = Url.replace("&brand=hp", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                HP
              </label>
              <br />
              <label htmlFor="Apple">
                <input
                  type="checkbox"
                  name="Apple"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=apple");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=apple")) {
                        var nUrl = Url.replace("&brand=apple", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Apple
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
            <h6 style={{ margin: "10px" }}>Internal Memory</h6>
            <div style={{ width: "200px", marginLeft: "10px" }}>
              <h6>
                {val1[0]}-{val1[1] / 5}
              </h6>
              <Slider value={val1} onChange={updateRangeM} />
            </div>
          </div>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>RAM</h6>
            <div style={{ width: "200px", marginLeft: "10px" }}>
              <h6>
                {val2[0]}-{val2[1] * 10}
              </h6>
              <Slider value={val2} onChange={updateRangeR} />
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
            {dat.map((val) => {
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
                            Memory : {val.memory}
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
                                    backgroundColor: "rgb(245, 77, 77)",
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
