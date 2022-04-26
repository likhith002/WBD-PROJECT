import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "./Newpasswordstyle.css";
import axios from "axios";
import { SelectUser,login} from "../../features/Reducers/UserSlice";
import { useSelector,useDispatch} from "react-redux";



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

export default function ChangePasswordModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const [user_db, setuser_db] = React.useState({});
  const [Password, setPassword] = React.useState(null);
  const [newPassword, setnewPassword] = React.useState(null);
  const [conPassword, setconPassword] = React.useState(null);
  const user=useSelector(SelectUser);
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios.get(`http://localhost:3002/user?_id=${user._id}`).then((res) => {
      setuser_db(res.data);
      console.log(user_db)
    });
  }, []);
  const handlepassword = (e) => {
    e.preventDefault();
      if (
       newPassword===conPassword 
      ) {
        fetch(`http://localhost:3002/user?_id=${localStorage.getItem('id')}`,{
          method: 'PATCH',
          body: JSON.stringify({
            Password:
              newPassword,
          }),
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
        );
      } else {
        alert("Bad credentials");
      }
      
    };

  return (
    <div>
      <Button style={{backgroundColor:"#D7BDCA", borderRadius:"18px"}} onClick={handleOpen} className="profile-line">
        Change Password
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
            Change Password
          </Typography>

          <form action="" className="login_form" onSubmit={handlepassword}>

            <input
              type="password"
              placeholder="New Password"
              className="login_password"
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new Password"
              className="login_password"
              onChange={(e) => setconPassword(e.target.value)}
            />
            <button type="submit" className="login_submit">
              SUBMIT
            </button>
          </form>

          
        </Box>
      </Modal>
      
    </div>
  );
}