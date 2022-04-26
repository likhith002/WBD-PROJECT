import React, { useEffect, useState } from "react";
import "./Productimgdiv.css";
import { DisplayPriceHistory } from "./Pricehistory";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectproduct } from "../../features/Reducers/ProductSlice";

function ProductimgBlock() {
  // const [product, setproduct] = useState({});
  const product = useSelector(selectproduct);

  // useEffect(() => {
  //   axios.get(`http://localhost:3002/product/${product_id}`).then((res) => {
  //     setproduct(res.data[0]);
  //   });
  // }, []);
  // let product_id = window.location.pathname.slice(
  //   9,
  //   window.location.pathname.length
  // );
  // const [id,setid] = useState(product_id)

  // if (product_id.slice(0, 1) === "M") {
  //   axios
  //     .get(`http://localhost:3006/Mobile?product_id=${product_id}`)
  //     .then((res) => {
  //       setproduct(
  //         res.data.filter((obj) => obj.product_id === product_id)[0]
  //       );
  //     });
  // }

  // if (product_id.slice(0, 1) === "A") {
  //   axios
  //     .get(`http://localhost:3006/AirConditioners?product_id=${product_id}`)
  //     .then((res) => {
  //       setproduct(res.data[0]);
  //     });
  // }

  // if (product_id.slice(0, 1) === "D") {
  //   axios
  //     .get(`http://localhost:3006/Desktop?product_id=${product_id}`)
  //     .then((res) => {
  //       setproduct(res.data[0]);
  //     });
  // }

  // if (product_id.slice(0, 1) === "T") {
  //   axios
  //     .get(`http://localhost:3006/TV?product_id=${product_id}`)
  //     .then((res) => {
  //       setproduct(res.data[0]);
  //     });
  //   // }
  // }, [product_id]);
  return (
    <div className="product_img_div">
      <img className="product_image" src={product.img} width="866" alt="" />
      <DisplayPriceHistory product_id={product._id} />
    </div>
  );
}

export default ProductimgBlock;
