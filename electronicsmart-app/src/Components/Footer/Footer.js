import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
import { pink, red } from "@mui/material/colors";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Typography from "@mui/material/Typography";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">ELECTRONICS MART</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer
      style={{ marginTop: "100px", backgroundColor: "whitesmoke" }}
      className="text-center text-lg-start bg-light text-muted "
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span style={{ marginLeft: "620px" }}>Get connected with us on </span>
        </div>

        <div>
          <a href="/#" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Electronics Mart
              </h6>
              <p>
                Our company sells different type of such as Mobiles,
                AC,TV,Desktops at cheaper prices with fast delivery.
              </p>
              <br></br>
              <InstagramIcon sx={{ color: pink[500] }} fontSize="large" />
              <FacebookIcon
                color="primary"
                sx={{ marginLeft: "25px" }}
                fontSize="large"
              />
              <TwitterIcon
                color="primary"
                sx={{ marginLeft: "25px" }}
                fontSize="large"
              />
              <YouTubeIcon
                sx={{ color: red[500], marginLeft: "25px" }}
                fontSize="large"
              />
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link to="/Mobile1" className="text-reset">
                  Mobiles
                </Link>
              </p>
              <p>
                <Link to="/TV" className="text-reset">
                  TV
                </Link>
              </p>
              <p>
                <Link to="/Desktop" className="text-reset">
                  Desktops
                </Link>
              </p>
              <p>
                <Link to="/Airconditioners" className="text-reset">
                  Air conditioners
                </Link>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link to="/signup" className="text-reset">
                  Sign up
                </Link>
              </p>
              <p>
                <Link to="#" className="text-reset">
                  Login
                </Link>
              </p>
              <p>
                <Link to="/cart" className="text-reset">
                  Cart
                </Link>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> Andhra Pradesh , Vizag,
                India
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                electronicsmart@electro.in
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 91 95123 57123
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 91 85214 47123
              </p>
            </div>
          </div>
        </div>
      </section>
      <Copyright style={{ marginBottom: "20px" }} />
    </footer>
  );
}
