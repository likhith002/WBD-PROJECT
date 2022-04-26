import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./airconditionerstyle.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import Nav from "../Header/Nav";

import Player from "./Player";
import Slider from "@mui/material/Slider";
export default function AirConditioners() {
  const [pageNumber, setPageNumber] = useState(0);
  let URL_BASE = `http://localhost:3002/product?type=airconditioner&limit=6`;
  const [Url, setUrl] = useState("");

  const [dat, setdat] = useState([]);
  const [pri, setpri] = useState("");

  useEffect(() => {
    console.log(`Fired! useEffect! ${pageNumber}`);
    fetch(URL_BASE + `&page=${pageNumber}` + Url + pri)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setdat(data);
      });
  }, [pageNumber, Url, pri]);

  const [val, setval] = useState([0, 100]);
  const updateRangeP = (e, data) => {
    setval(data);
    setpri(`&price_min=${data[0] * 1000 + 10000}&price_max=${data[1] * 2000}`);
  };
  const ACPerPage = 6;

  const pageCount = Math.ceil(15 / ACPerPage);
  const changePage = (pageObject) => {
    setPageNumber(pageObject.selected);
    console.log(`ChangePage Fired ${pageNumber}`);
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
              <label htmlFor="Haiver">
                <input
                  type="checkbox"
                  name="Haiver"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=haiver");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=haiver")) {
                        var nUrl = Url.replace("&brand=haiver", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                Haiver
              </label>
              <br />
              <label htmlFor="BlueStar">
                <input
                  type="checkbox"
                  name="BlueStar"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&brand=bluestar");
                      console.log(Url);
                    } else {
                      if (Url.includes("brand=bluestar")) {
                        var nUrl = Url.replace("&brand=bluestar", "");
                        setUrl(nUrl);
                      }
                    }
                  }}
                />
                BlueStar
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
            <h6 style={{ margin: "10px" }}>Years of Warranty</h6>
            <div>
              <label htmlFor="1">
                <input
                  type="checkbox"
                  name="YearsofWarranty"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&yearsofwarranty=1");
                      console.log(Url);
                    } else {
                      if (Url.includes("yearsofwarranty=1")) {
                        var nUrl = Url.replace("&yearsofwarranty=1", "");
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
                  name="YearsofWarranty"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&yearsofwarranty=2");
                      console.log(Url);
                    } else {
                      if (Url.includes("yearsofwarranty=2")) {
                        var nUrl = Url.replace("&yearsofwarranty=2", "");
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
                  name="YearsofWarranty"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setUrl(Url + "&yearsofwarranty=3");
                      console.log(Url);
                    } else {
                      if (Url.includes("yearsofwarranty=3")) {
                        var nUrl = Url.replace("&yearsofwarranty=3", "");
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
            <Player data={dat} />
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
