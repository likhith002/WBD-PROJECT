import React from "react";
import Nav from "./Nav";
import ImageSlider from "./ImageSlider";
import "./Header.css";
function Header() {
  return (
    <div div className="header">
      <Nav className="navbar" />
      <ImageSlider />
    </div>
  );
}

export default Header;
