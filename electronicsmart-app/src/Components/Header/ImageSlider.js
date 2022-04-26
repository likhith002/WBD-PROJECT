import React from "react";
import "./ImageSlider.css";
import SimpleImageSlider from "react-simple-image-slider";
import { Zoom } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
function ImageSlider() {
  const images = [
    "https://images.samsung.com/is/image/samsung/assets/in/HomepageKV_Foldable_1440x640.jpg?imwidth=1366",
    "https://images.samsung.com/is/image/samsung/assets/in/9751_R3_AC-Hot-and-Cold-Banners-1440x640.jpg?imwidth=1366",
    "https://image01.realme.net/general/20211108/1636368728801.jpg",
    "https://aws-obg-image-lb-3.tcl.com/content/dam/brandsite/region/in/home-page-banner/C825-Desktop.jpg",
    "https://www.lg.com/in/images/plp-b2c/REF-InstaView-DID-1M-Herobanner-C0078-D.jpg",
  ];

  const zoomOutProperties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: false,
    autoplay: true,
    pauseOnHover: true,
  };

  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <img key={index} style={{ width: "100%" }} src={each} />
        ))}
      </Zoom>
    </div>
  );
}

export default ImageSlider;
