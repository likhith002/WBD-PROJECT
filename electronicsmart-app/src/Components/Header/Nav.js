import "./Nav.css";
import LoginModel from "./LoginModel";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

import { Link, NavLink } from "react-router-dom";
import { SelectCart } from "../../features/Reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, SelectUser } from "../../features/Reducers/UserSlice";
import { useState, useEffect } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import * as React from "react";

function Nav() {
  const cart = useSelector(SelectCart);
  const user = useSelector(SelectUser);
  // const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const handlelogout = () => {
    localStorage.clear();
    window.location.reload();

    dispatch(logout());
  };

  return (
    <div className="mainnavbar">
      <Link to="/">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>EM</Avatar>
      </Link>

      <div className="dropdown_navbar">
        <Link to="/Mobile1">
          <button className="dropbutton_navbar">
            <span>
              MOBILES
              <ArrowDropDownIcon claassName="arrow-dropdown_navbar" />
            </span>
            <i></i>
          </button>
        </Link>

        <div className="dropdown_navbar-content">
          <div className="header_navbar">
            <h2 className="header_dropdown">NEW RELEASES</h2>
          </div>
          <div className="row_navbar">
            <div className="column_navbar_item">
              <h4>VIVO</h4>
              <NavLink to="/product/62485c72ff16f5d35e0ac62a">Vivo Y3s</NavLink>
              <NavLink to="/product/62485c72ff16f5d35e0ac62b">Vivo V21</NavLink>
              <NavLink to="/product/62485c72ff16f5d35e0ac62c">
                Vivo Y20T
              </NavLink>
            </div>

            <div className="column_navbar_item">
              <h4>OPPO</h4>
              <Link to="/product/62485c72ff16f5d35e0ac62f">Oppo F19 pro</Link>
              <Link to="/product62485c72ff16f5d35e0ac630">Oppo F19s</Link>
              <Link to="/product/62485c72ff16f5d35e0ac631">Oppo A15S</Link>
            </div>

            <div className="column_navbar_item">
              <img
                className="dropdown_image"
                src="https://image01.realme.net/general/20211227/1640581886121.jpg"
                alt=""
              />
            </div>
            <div className="column_navbar_item">
              <h4>OPPO</h4>
              <Link to="/product/62485c72ff16f5d35e0ac631">Oppo A94</Link>
              <Link to="/product/62485c72ff16f5d35e0ac625">Oppo Find X</Link>
              <Link to="/product/62485c72ff16f5d35e0ac626">Oppo Find X2</Link>
            </div>
            <div className="column_navbar_item">
              <h4>SAMSUNG</h4>
              <Link to="/product/62485c72ff16f5d35e0ac620">
                Samsung Galaxy Z Fold2 5G
              </Link>
              <Link to="/product/62485c72ff16f5d35e0ac621">
                Samsung Galaxy S20 FE
              </Link>
              <Link to="/product/62485c72ff16f5d35e0ac622">
                Samsung Galaxy M32 5G
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown_navbar">
        <Link to="/Desktop">
          <button className="dropbutton_navbar">
            <span>
              DESKTOP
              <ArrowDropDownIcon claassName="arrow-dropdown_navbar" />
            </span>
            <i></i>
          </button>
        </Link>

        <div className="dropdown_navbar-content">
          <div className="header_navbar">
            <h2 className="header_dropdown">NEW RELEASES</h2>
          </div>
          <div className="row_navbar">
            <div className="column_navbar_item">
              <h4>DELL</h4>
              <Link to="/product/62485d6eff16f5d35e0ac650">
                Dell Inspiron 24 5000
              </Link>
              <Link to="/product/62485d6eff16f5d35e0ac651">
                Dell New Inspiron 3891
              </Link>
              <Link to="/product/62485d6eff16f5d35e0ac652">
                Dell Vostro 3681
              </Link>
            </div>
            <div className="column_navbar_item">
              <h4>HP</h4>
              <Link to="/product/62485d6eff16f5d35e0ac655">HP All-In-One</Link>
              <Link to="/product/62485d6eff16f5d35e0ac656">
                Hp Desktop i7 4TH GEN Refurb
              </Link>
              <Link to="/product/62485d6eff16f5d35e0ac657">
                HP Desktop Computer
              </Link>
            </div>

            <div className="column_navbar_item">
              <img
                className="dropdown_image"
                src="https://i.dell.com/sites/csimages/banner_imagery/all/in-dhs-holiday-deals-shopmain-slo-1-1170x395.jpg?width=1600&format=jpg&quality=80"
                alt=""
              />
            </div>
            <div className="column_navbar_item">
              <h4>APPLE</h4>
              <Link to="/product/62485d6eff16f5d35e0ac65a">
                Apple MacBook Pro 13-in
              </Link>
              <Link to="/product/62485d6eff16f5d35e0ac65b">
                Apple iMac 21.5-in
              </Link>
              <Link to="/product/62485d6eff16f5d35e0ac69">
                Hp All-in-One 24-df1669in PC
              </Link>
            </div>

            <div className="column_navbar_item">
              <h4>HP</h4>
              <Link to="/product/62485d6eff16f5d35e0ac655">HP All-In-One</Link>
              <Link to="/product/62485d6eff16f5d35e0ac656">
                Hp Desktop i7 4TH GEN Refurb
              </Link>
              <Link to="/product/62485d6eff16f5d35e0ac657">
                HP Desktop Computer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown_navbar">
        <Link to="/TV">
          <button className="dropbutton_navbar">
            <span>
              TELEVISIONS
              <ArrowDropDownIcon claassName="arrow-dropdown_navbar" />
            </span>

            <i className=""></i>
          </button>
        </Link>

        <div className="dropdown_navbar-content">
          <div className="header_navbar">
            <h2 className="header_dropdown">NEW RELEASES</h2>
          </div>
          <div className="row_navbar">
            <div className="column_navbar_item">
              <h4>SONY</h4>
              <Link to="/product/62485794ff16f5d35e0ac616">Sony Z97</Link>
              <Link to="/product/62485794ff16f5d35e0ac617">Sony A80J</Link>
              <Link to="/product/62485794ff16f5d35e0ac618">Sony X90J</Link>
            </div>
            <div className="column_navbar_item">
              <h4>LG</h4>
              <Link to="/product/62485794ff16f5d35e0ac61b">LGTV UP77</Link>
              <Link to="/product/62485794ff16f5d35e0ac61c">LGTV UP75</Link>
              <Link to="/product/62485794ff16f5d35e0ac61d">LGTV B1 55</Link>
            </div>

            <div className="column_navbar_item">
              <img
                src="https://images.samsung.com/is/image/samsung/assets/in/tvs/8369-UHD-s.com-PFP_1440x334.jpg?imwidth=1366"
                alt=""
              />
            </div>
            <div className="column_navbar_item">
              <h4>SAMSUNG</h4>
              <Link to="/product/62485794ff16f5d35e0ac611">
                Samsung QN700A Neo QLED
              </Link>
              <Link to="/product/62485794ff16f5d35e0ac612">Samsung T4900</Link>
              <Link to="/product/62485794ff16f5d35e0ac613">Samsung T4600</Link>
            </div>

            <div className="column_navbar_item">
              <h4>LG</h4>
              <Link to="/product/62485794ff16f5d35e0ac61b">LGTV UP77</Link>
              <Link to="/product/62485794ff16f5d35e0ac61c">LGTV UP75</Link>
              <Link to="/product/62485794ff16f5d35e0ac61d">LGTV B1 55</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown_navbar">
        <Link to="/AirConditioners">
          <button className="dropbutton_navbar">
            <span>
              AIR CONDITIONERS
              <ArrowDropDownIcon claassName="arrow-dropdown_navbar" />
            </span>
            <i className=""></i>
          </button>
        </Link>

        <div className="dropdown_navbar-content">
          <div className="header_navbar">
            <h2 className="header_dropdown">NEW RELEASES</h2>
          </div>
          <div className="row_navbar">
            <div className="column_navbar_item">
              <h4>SAMSUNG</h4>
              <Link to="/product/62485d39ff16f5d35e0ac641">
                Samsung AR18AY4ACWK
              </Link>
              <Link to="/product/62485d39ff16f5d35e0ac642">
                Samsung AR18AY5YBTZ
              </Link>
              <Link to="/product/62485d39ff16f5d35e0ac643">
                Samsung Model 3a
              </Link>
            </div>
            <div className="column_navbar_item">
              <h4>Haiver</h4>
              <Link to="/product/62485d39ff16f5d35e0ac646">Haiver Model a</Link>
              <Link to="/product/62485d39ff16f5d35e0ac647">Haiver Model b</Link>
              <Link to="/product/62485d39ff16f5d35e0ac648">Haiver Model c</Link>
            </div>
            <div className="column_navbar_item">
              <img
                src="https://www.hitachiaircon.in/storage/images/ranges/range_image_header_0901257f40baf13c920b3b9dfd583c57.jpg"
                alt=""
              />
            </div>

            <div className="column_navbar_item">
              <h4>BLUE STAR</h4>
              <Link to="/product/62485d39ff16f5d35e0ac64b">
                BlueStar Model a1
              </Link>
              <Link to="/product/62485d39ff16f5d35e0ac64c">
                BlueStar Model b1
              </Link>
              <Link to="/product/62485d39ff16f5d35e0ac64d">
                BlueStar Model c1
              </Link>
            </div>

            <div className="column_navbar_item">
              <h4>Haiver</h4>
              <Link to="/product/62485d39ff16f5d35e0ac646">Haiver Model a</Link>
              <Link to="/product/62485d39ff16f5d35e0ac647">Haiver Model b</Link>
              <Link to="/product/62485d39ff16f5d35e0ac648">Haiver Model c</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar_options">
        <span className="nav_option_dropdown">
          <AccountCircleIcon />
          <div class="dropdown_navbar-profile">
            <button className="dropbutton_navbar-profile">PROFILE</button>
            <div className="dropdown_navbar-profile-content">
              {user === null ? (
                <a href="#">
                  <span>
                    <LoginModel />
                  </span>
                  <Link to="/signup">Sign Up</Link>
                </a>
              ) : (
                <div>
                  <Link to={`/Profile`}>
                    {" "}
                    <button className="logout_btn">View Profile</button>
                  </Link>
                  <button className="logout_btn" onClick={handlelogout}>
                    <LogoutIcon></LogoutIcon> LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </span>
        <Link to="/wishlist" className="">
          <span className="nav_option_dropdown">
            <FavoriteIcon />
            <p className="navbar_option_text">Wishlist</p>
          </span>
        </Link>

        <Link to="/cart">
          <div className="header__optionBasket nav_option_dropdown">
            <ShoppingBasketIcon />

            <span className="header_optionLineTwo header_basketCount">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
