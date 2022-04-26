import React, { useState, useEffect } from "react";
import "./mobilestyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Slider from "@mui/material/Slider";
import { addtoCart, SelectCart } from "../../features/Reducers/CartSlice";
import {
  addtoWish,
  SelectWishlist,
} from "../../features/Reducers/WishlistSlice";

import Nav from "../Header/Nav";
export default function Mobile1() {
  const [pageNumber, setPageNumber] = useState(0);
  let URL_BASE = `http://localhost:3002/product?type=mobile&limit=6`;
  const [Url, setUrl] = useState("");
  const dispatch = useDispatch();
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
    setrm(`&ram_min=${data[0]}&ram_max=${data[1] / 5}`);
  };

  useEffect(() => {
    fetch(URL_BASE + `&page=${pageNumber}` + Url + pri + mem + rm)
      .then((response) => response.json())
      .then((data) => setdat(data));
  }, [pageNumber, Url, pri, mem, rm]);

  const mobilesPerPage = 6;
  const pagesVisited = pageNumber * mobilesPerPage;
  const pageCount = Math.ceil(15 / mobilesPerPage);
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
              <label htmlFor="Oppo">
                <input
                  type="checkbox"
                  name="Oppo"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=oppo");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=oppo")) {
                        var nUrl = Url.replace("&brand=oppo", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Oppo
              </label>
              <br />
              <label htmlFor="Vivo">
                <input
                  type="checkbox"
                  name="Vivo"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=vivo");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=vivo")) {
                        var nUrl = Url.replace("&brand=vivo", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Vivo
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
            <h6 style={{ margin: "10px" }}>Memory</h6>
            <div style={{ width: "200px", marginLeft: "10px" }}>
              <h6>
                {val1[0]}-{val1[1] / 5}
              </h6>
              <Slider value={val1} onChange={updateRangeM} />
            </div>
          </div>
          <div id="lbox1">
            <h6 style={{ margin: "10px" }}>Ram</h6>
            <div style={{ width: "200px", marginLeft: "10px" }}>
              <h6>
                {val2[0]}-{val2[1] / 5}
              </h6>
              <Slider value={val2} onChange={updateRangeR} />
            </div>
          </div>
          <div id="lbox2">
            <h6 style={{ margin: "10px" }}>Network Connectivity</h6>
            <div>
              <label htmlFor="4G">
                <input
                  type="checkbox"
                  name="NC"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&networkconnectivity=4G");
                      console.log(Url);
                    } else {
                      if (Url.includes("&networkconnectivity=4G")) {
                        var nUrl = Url.replace("&networkconnectivity=4G", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                4G
              </label>
              <br />
              <label htmlFor="5G">
                <input
                  type="checkbox"
                  name="NC"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&networkconnectivity=5G");
                      console.log(Url);
                    } else {
                      if (Url.includes("&networkconnectivity=5G")) {
                        var nUrl = Url.replace("&networkconnectivity=5G", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />{" "}
                5G
              </label>
              <br />
            </div>
          </div>
        </div>
        <div className="col-10 " id="right" style={{ marginLeft: "-10px" }}>
          <div style={{ marginBottom: "10px", marginLeft: "1050px" }}>
            <DropdownButton
              style={{ zIndex: "100" }}
              id="dropdown-basic-button "
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
          <div class="row" style={{ marginTop: "10px" }}>
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
