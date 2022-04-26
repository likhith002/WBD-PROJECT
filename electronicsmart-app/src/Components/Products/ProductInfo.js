import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./ProductInfo.css";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { SelectUser } from "../../features/Reducers/UserSlice";
import { selectproduct } from "../../features/Reducers/ProductSlice";
import {
  addtoCart,
  SelectCartbtn,
  cartbtn_inactive,
  SelectCart,
  cartbtn_active,
} from "../../features/Reducers/CartSlice";
import {
  addtoWish,
  SelectWishbtn,
  SelectWishlist,
  wishbtn_active,
  wishbtn_inactive,
} from "../../features/Reducers/WishlistSlice";

// import { margin } from "@mui/system";

function ProductInfo() {
  const product = useSelector(selectproduct);
  const [review, setreview] = useState([]);
  // const [product, setproduct] = useState({});
  const [pinres, setpinres] = useState(null);
  const [pincode, setpincode] = useState(null);
  const [reviewnew, setreviewnew] = useState(null);
  const wish_btn = useSelector(SelectWishbtn);
  const cart_btn = useSelector(SelectCartbtn);
  const cart = useSelector(SelectCart);
  const wishlist = useSelector(SelectWishlist);
  const dispatch = useDispatch();
  const user = useSelector(SelectUser);
  const [ratingvalue, setratingValue] = React.useState(0);
  // let product_id = window.location.pathname.slice(
  //   9,
  //   window.location.pathname.length
  // );

  const handlepin = (e) => {
    if (product.pin.some((obj) => obj === pincode)) setpinres(true);
    else setpinres(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:3002/reviews?id=${product._id}`).then((res) => {
      setreview(res.data);
    });

    console.log(review);

    const flag = wishlist.some((obj) => product._id === obj._id);
    if (flag === false) {
      dispatch(wishbtn_active());
    }

    const flag2 = cart.some((obj) => product._id === obj._id);
    if (flag2 === false) {
      dispatch(cartbtn_active());
    }
  }, [product._id]);

  const handlereview = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3002/reviews", {
        // id: crypto.randomUUID(),
        product_id: product._id,
        user_id: user._id,
        name: user.firstName,
        rating: ratingvalue,
        data: reviewnew,
      })
      .then((res) => {
        // axios
        //   .get(`http://localhost:3002/reviews?id=${product._id}`)
        //   .then((res) => {
        //     setreview(res.data);
        //   });
        setreview([res.data]);
        console.log("posted review", res.data);
      });
  };

  const handleAddtoWish = () => {
    dispatch(addtoWish(product));
    dispatch(wishbtn_inactive());
  };
  const handleAddtoCart = () => {
    dispatch(addtoCart(product));
    dispatch(cartbtn_inactive());
  };
  return (
    <div className="product_info">
      <div>
        <h1 className="product_title">{product.name}</h1>
        <h1 className="product_description">{product.brand}</h1>
        <hr />
        <div className="price_container">
          <h4 className="product_price">{product.price}</h4>
          <p className="inclusive_taxes">Inclusive of all taxes</p>
        </div>
      </div>
      <div className="product_buttons">
        {!cart_btn ? (
          <Button variant="contained" disabled className="wish_btn">
            <ShoppingCartIcon />
            ADD TO CART
          </Button>
        ) : (
          <button className="cart_btn" onClick={handleAddtoCart}>
            <ShoppingCartIcon />
            ADD TO CART
          </button>
        )}

        {!wish_btn ? (
          <Button variant="contained" disabled className="wish_btn">
            <FavoriteIcon />
            WISHLIST
          </Button>
        ) : (
          <button className="wish_btn" onClick={handleAddtoWish}>
            <FavoriteIcon />
            WISHLIST
          </button>
        )}
      </div>

      <div>
        <h5 style={{ color: "grey", fontSize: "20px", marginTop: "10px" }}>
          PRODUCT INFORMATION
        </h5>
        {/* 
        <div>
          {Object.keys(product).map((obj) => {
            <div>
              <h6>{JSON.stringify(obj)}</h6>
              <p>{product[obj]}</p>
            </div>;
          })}
        </div> */}
        {product.type === "mobile" && (
          <div>
            <h6>NAME</h6>
            <p>{product.name}</p>
            <h6>BRAND</h6>
            <p>{product.brand}</p>

            <h6>MEMORY</h6>
            <p>{product.memory}</p>
            <h6>RAM</h6>
            <p>{product.ram}</p>
            <h6>NETWORK CONNECTIVITY</h6>
            <p>{product.networkconnectivity}</p>
            <h6>AVAILABILITY STATUS</h6>
            {product.availability ? <p>Available</p> : <p>Not available</p>}
          </div>
        )}
        {product.type === "airconditioner" && (
          <div>
            <h6>NAME</h6>
            <p>{product.name}</p>
            <h6>BRAND</h6>
            <p>{product.brand}</p>

            <h6>YEARS OF WARRANTY</h6>
            <p>{product.warranty}</p>

            <h6>AVAILABILITY STATUS</h6>
            {product.availability ? <p>Available</p> : <p>Not available</p>}
          </div>
        )}

        {product.type === "television" && (
          <div>
            <h6>NAME</h6>
            <p>{product.name}</p>
            <h6>BRAND</h6>
            <p>{product.brand}</p>

            <h6>No of HDMI Ports </h6>
            <p>{product.hdmi}</p>
            <h6>RESOLUTION </h6>
            <p>{product.resolution}</p>
            <h6>AVAILABILITY STATUS</h6>
            {product.availability ? <p>Available</p> : <p>Not available</p>}
          </div>
        )}

        {product.type === "desktop" && (
          <div>
            <h6>NAME</h6>
            <p>{product.name}</p>
            <h6>BRAND</h6>
            <p>{product.brand}</p>

            <h6>MEMORY</h6>
            <p>{product.memory}</p>
            <h6>RAM</h6>
            <p>{product.ram}</p>
            <h6>AVAILABILITY STATUS</h6>
            {product.availability ? <p>Available</p> : <p>Not available</p>}
          </div>
        )}
      </div>
      <div className="pincode-deliveryContainer">
        <h4>
          Delivery Options <LocalShippingIcon />{" "}
        </h4>
        <div
          style={{
            margin: "10px",
            marginBottom: "10px!important",
            zIndex: "1",
            color: "green",
          }}
        >
          {pinres === true && <p>Pincode is available for delivery</p>}
        </div>
        <div
          style={{
            margin: "10px",
            marginBottom: "10px!important",
            zIndex: "1",
            color: "red",
          }}
        >
          {pinres === false && <p>Pincode is Not available for delivery</p>}
        </div>
        <div className="Address-switcher-container">
          <div className="Address-address-box Address-pincode-input Address-pdp-box">
            <input
              type="tel"
              placeholder="Enter a PIN code"
              onChange={(e) => {
                if (e.target.value === "") {
                  setpinres(null);
                }
                setpincode(e.target.value);
              }}
            />

            <button
              type="submit"
              className="Address-address-button"
              onClick={handlepin}
            >
              CHECK
            </button>
          </div>
        </div>
        <p className="pincode-enterPincode">
          Please enter PIN code to check delivery time &amp; Pay on Delivery
          Availability
        </p>
      </div>

      <h2 className="review_head">Reviews</h2>

      {user != null && (
        <div style={{ display: "flex" }}>
          <form action="" onSubmit={handlereview} className="form-review">
            <input
              type="text"
              onChange={(e) => setreviewnew(e.target.value)}
              placeholder="Write a review"
              className="review_input"
            />
            <Box
              sx={{
                "& > legend": { mt: 3 },
              }}
            >
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={ratingvalue}
                onChange={(event, newValue) => {
                  setratingValue(newValue);
                }}
              />
            </Box>
            <button className="review_btn">POST YOUR REVIEW</button>
          </form>
        </div>
      )}

      <span>
        {review.length === 0 ? (
          <h6>NO REVIEWS FOR THIS PRODUCT</h6>
        ) : (
          review.length > 0 &&
          review.map((obj) => (
            <div className="review_data">
              <h2 key={obj._id} className="review_tag">
                {obj.data}
              </h2>
              <h2 key={obj._id} className="review_tag">
                {obj.name}
              </h2>
              <div style={{ display: "flex" }}>
                {Array(obj.rating)
                  .fill()
                  .map((_, i) => (
                    <p>⭐</p>
                  ))}
              </div>
            </div>
          ))
        )}
      </span>
    </div>
  );
}

export default ProductInfo;
