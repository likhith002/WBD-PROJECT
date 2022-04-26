import React from "react";
import Nav from "../Header/Nav";
import { useSelector, useDispatch } from "react-redux";
import "./ProfileStyle.css";
import { SelectUser } from "../../features/Reducers/UserSlice";
import EditIcon from "@mui/icons-material/Edit";
import { changefn, changeln } from "../../features/Reducers/UserSlice";
import Newpassword from "./Newpassword";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch();
  const currUser = useSelector(SelectUser);
  const [det, setdet] = useState(false);
  const [clickfn, setclickfn] = useState(false);
  const [clickln, setclickln] = useState(false);
  const [tab3, settab3] = useState(true);
  const [oDet, setoDet] = useState([]);

  useEffect(() => {
    if (currUser != null) {
      axios
        .get(`http://localhost:3002/orders?id=${currUser._id}`)
        .then((res) => {
          setoDet(res);
        });
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className="Mainn">
        {currUser === null ? (
          <Navigate to="/signup" replace={true} />
        ) : (
          <div
            style={{
              paddingTop: "45px",
            }}
            className="container emp-profile"
          >
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img
                    src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618777?s=2048x2048"
                    alt=""
                  />
                  <br />
                  <div style={{ marginTop: "10px", marginLeft: "100px" }}>
                    <form>
                      <input type="file" name="file" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>
                    {currUser.firstName}
                    <span> </span> {currUser.lastName}
                  </h5>
                  {tab3 ? (
                    <ul
                      style={{
                        marginTop: "95px",
                      }}
                      className="nav nav-tabs"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          BASIC DETAILS
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="profile-tab"
                          data-toggle="tab"
                          onClick={() => {
                            settab3(false);
                          }}
                          href="#profile"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          PREVIOUS ORDERS
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <ul
                      style={{
                        marginTop: "95px",
                      }}
                      className="nav nav-tabs"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="home-tab"
                          data-toggle="tab"
                          onClick={() => {
                            settab3(true);
                            setdet(false);
                          }}
                          href="#home"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          BASIC DETAILS
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="profile-tab"
                          data-toggle="tab"
                          href="#profile"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          PREVIOUS ORDERS
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <Newpassword />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div
                  style={{
                    marginLeft: "10px",
                    textAlign: "start",
                  }}
                  className="profile-work"
                >
                  <p>BUY STUFF</p>
                  <Link to="/Mobile1">Mobiles</Link>
                  <br />
                  <Link to="/Desktop">Desktops</Link>
                  <br />
                  <Link to="/TV">TVs</Link>
                  <br />
                  <Link to="/TV">Air Conditioners</Link>
                  <br />
                  <p>LIMILTED EDITION</p>
                  <Link to="/product/T0047">Samsung T4900</Link>
                  <br />
                  <Link to="/product/D0036">HP 54.61 cm (21.5 inch)</Link>
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  {tab3 ? (
                    !det ? (
                      <div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>First Name</label>
                          </div>
                          {!clickfn ? (
                            <div className="col-md-6">
                              <p>
                                {currUser.firstName}
                                <EditIcon
                                  onClick={() => {
                                    setclickfn(!clickfn);
                                  }}
                                />
                              </p>
                            </div>
                          ) : (
                            <div className="col-md-6">
                              <p>
                                <input
                                  id="ff_name"
                                  onChange={(e) => {
                                    dispatch(changefn({ fn: e.target.value }));
                                  }}
                                />
                                <EditIcon
                                  onClick={() => {
                                    fetch(`http://localhost:3002/user?_id=${localStorage.getItem('id')}`,{
                                      method: 'PATCH',
                                      body: JSON.stringify({
                                        firstName:
                                          document.getElementById("ff_name")
                                            .value,
                                      }),
                                      headers: {
                                        'content-type': 'application/json',
                                        'authorization': `Bearer ${localStorage.getItem('token')}`
                                      }
                                    }
                                    );
                                    setclickfn(!clickfn);
                                  }}
                                />
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Last Name</label>
                          </div>
                          {!clickln ? (
                            <div className="col-md-6">
                              <p>
                                {currUser.lastName}
                                <EditIcon
                                  onClick={() => {
                                    setclickln(!clickln);
                                  }}
                                />
                              </p>
                            </div>
                          ) : (
                            <div className="col-md-6">
                              <p>
                                <input
                                  id="last_name"
                                  onChange={(e) => {
                                    dispatch(changeln({ ln: e.target.value }));
                                  }}
                                />
                                <EditIcon
                                  onClick={() => {
                                    fetch(`http://localhost:3002/user?_id=${localStorage.getItem('id')}`,{
                                      method: 'PATCH',
                                      body: JSON.stringify({
                                        lastName:
                                          document.getElementById("last_name")
                                            .value,
                                      }),
                                      headers: {
                                        'content-type': 'application/json',
                                        'authorization': `Bearer ${localStorage.getItem('token')}`
                                      }
                                    }
                                    );
                                    setclickln(!clickln);
                                  }}
                                />
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p>{currUser.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Phone Number</label>
                          </div>
                          <div className="col-md-6">
                            <p>{currUser.phone}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )
                  ) : (
                    <div>
                      <div className="row">
                        <div className="col-md-2">
                          <label>Order Date</label>
                        </div>
                        <div className="col-md-2">
                          <label>Order Time</label>
                        </div>
                        <div className="col-md-2">
                          <label>Name</label>
                        </div>
                        <div className="col-md-2">
                          <label>Price</label>
                        </div>
                        <div className="col-md-2">
                          <label>Total Paid</label>
                        </div>
                      </div>
                      {console.log(oDet.data)}
                      {oDet.data.map((val) =>
                        val.products.map((val1) => (
                          <div className="row">
                            <div className="col-md-2">
                              {val1.updatedAt && (
                                <label>
                                  {new Date(
                                    val1.updatedAt
                                  ).toLocaleDateString()}
                                </label>
                              )}
                            </div>
                            <div className="col-md-2">
                              {val1.updatedAt && (
                                <label>
                                  {new Date(
                                    val1.updatedAt
                                  ).toLocaleTimeString()}
                                </label>
                              )}
                            </div>
                            <div className="col-md-2">
                              <label>{val1.name}</label>
                            </div>
                            <div className="col-md-2">
                              <label>Rs {val1.price}</label>
                            </div>
                            <div className="col-md-2">
                              <label>Rs {val.total}</label>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
