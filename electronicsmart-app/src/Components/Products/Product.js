import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductimgBlock from "./ProductimgBlock";
import "./Product.css";
import Header from "../Header/Nav";

import { useParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add_product } from "../../features/Reducers/ProductSlice";
function Product(props) {
  const dispatch = useDispatch();
  // const [product, setproduct] = useState({});

  let { id } = useParams();
  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:3002/product?_id=${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(add_product(response.data[0]));
      })
      .catch((err) => {
        alert(err.response.message);
      });
  }, [id]);

  return (
    <div className="product-container">
      <Header />
      <h1 className="title_prod_det">Product Details</h1>
      <div className="product">
        {/* <ProductimgBlock product_id={useParams().id} />
        <ProductInfo product_id={useParams().id} /> */}

        <ProductimgBlock />
        <ProductInfo />
      </div>
    </div>
  );
}

export default Product;
