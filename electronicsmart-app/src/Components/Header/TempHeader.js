import React from "react";
import "./tempHeader.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
export default function Tempheader() {
  return (
    <div className="mainnavbar">
      <Link to="/">
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }} className="avtr">
          EM
        </Avatar>
        <h6>ELECTRONICA MART</h6>
      </Link>
    </div>
  );
}
