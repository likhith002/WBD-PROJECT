import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, Navigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import "./LoginModel.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/Reducers/UserSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const [Email, setEmail] = React.useState(null);
  const [Password, setPassword] = React.useState(null);
  const [loginvar, setloginvar] = React.useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/login", {
        email: Email,
        password: Password,
      })
      .then((res) => {
        dispatch(login(res.data));
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id',res.data._id);
        setloginvar(true);
        console.log(res.data);
        handleClose();
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  return (
    <div>
      {loginvar && <Navigate to="/" replace={true} />}
      <div>
        <Button onClick={handleOpen} className="profile-line">
          <LoginIcon />
          LOGIN
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="login_heading"
            >
              LOGIN
            </Typography>

            <form action="" className="login_form">
              <input
                type="email"
                placeholder="Email"
                className="login_email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="login_password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="login_submit"
                onClick={handlesubmit}
              >
                SUBMIT
              </button>
            </form>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              If you are not a user
              <Link to="/signup">
                <button className="login_submit" onClick={handleClose}>
                  Sign Up
                </button>
              </Link>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
