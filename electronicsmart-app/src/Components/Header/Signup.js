import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginModel from "./LoginModel";
import axios from "axios";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../features/Reducers/UserSlice";
// import { useDispatch } from "react-redux";
// const baseURL = "http://localhost:3006/users";
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

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [user_db, setuser_db] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // user_db.map((obj) => {
    //   if (obj.email === Email) {
    //     console.log("same email");
    //     setemailerror(1);
    //     return;
    //   }
    // });
    handleSignup();
  };

  // const dispatch = useDispatch();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [submiterror, setsubmiterror] = useState(0);
  const [emailerror, setemailerror] = useState(0);
  const [mobile, setMobile] = useState("");

  const [FirstNameError, setFirstNameError] = useState(null);
  const [LastNameError, setLastNameError] = useState(null);
  const [PasswordError, setPasswordError] = useState(null);
  const [EmailError, setEmailError] = useState(null);
  const [PhoneError, setPhoneError] = useState(null);

  useEffect(() => {
    if (!EmailError) {
      axios
        .post("http://localhost:3002/user?checkemail=true", {
          email: Email,
        })
        .then((res) => {
          if (res.data.available === true) {
            setemailerror(0);
            setsubmiterror(0);
          } else {
            setemailerror(1);
            setsubmiterror(1);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [EmailError]);

  const handleSignup = () => {
    // async function digestMessage(message) {
    //   const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    //   const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    //   const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    //   const hashHex = hashArray
    //     .map((b) => b.toString(16).padStart(2, "0"))
    //     .join(""); // convert bytes to hex string
    //   return hashHex;
    // }

    // digestMessage(Password).then((digestHex) => {
    //   if (emailerror === 0 && submiterror === 0) {
    //     const user_data = {
    //       id: crypto.randomUUID(),
    //       email: Email,
    //       firstname: FirstName,
    //       lastname: LastName,
    //       mobile: mobile,
    //       password: digestHex,
    //     };
    //     console.log(emailerror);
    //     console.log(submiterror);
    //     axios.post(baseURL, user_data);
    //     axios.get(baseURL).then((res) => {
    //       setuser_db(res.data);
    //     });
    //     dispatch(login(user_data));

    //     navigate("/");
    //   }
    // });

    if (emailerror === 0 && submiterror === 0) {
      const user_data = {
        email: Email,
        firstName: FirstName,
        lastName: LastName,
        phone: mobile,
        password: Password,
      };
      // console.log(emailerror);
      // console.log(submiterror);
      console.log(user_data);
      axios
        .post("http://localhost:3002/user", user_data)
        .then((res) =>{
            
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('id',res.data._id);


        });
      // axios.get(baseURL).then((res) => {
      //   setuser_db(res.data);
      // });


      dispatch(login(user_data));
      navigate("/");
    }
  };

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const NAME_REGEX = /^[a-zA-Z]{2,30}$/;
  const PASSWORD_REGEX = /.{6,}/;
  const PHONE_REGEX = /^\d{10}$/;

  const validateField = (inputValue, pattern) => {
    // console.log(pattern.test(inputValue))
    return pattern.test(inputValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>EM</Avatar>
          {emailerror ? (
            <Alert severity="error">
              This Email Already exists please provide another
            </Alert>
          ) : (
            " "
          )}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={FirstNameError}
                  helperText={
                    FirstNameError === null || !FirstNameError
                      ? ""
                      : "Invalid Name."
                  }
                  onBlur={(e) => {
                    setFirstNameError(
                      !validateField(e.target.value, NAME_REGEX)
                    );
                    setFirstName(e.target.value);
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={LastNameError}
                  helperText={
                    LastNameError === null || !LastNameError
                      ? ""
                      : "Invalid Name."
                  }
                  onBlur={(e) => {
                    setLastNameError(
                      !validateField(e.target.value, NAME_REGEX)
                    );
                    setLastName(e.target.value);
                  }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={EmailError}
                  helperText={
                    EmailError === null || !EmailError ? "" : "Invalid email."
                  }
                  onBlur={(e) => {
                    setEmailError(!validateField(e.target.value, EMAIL_REGEX));

                    setEmail(e.target.value);
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // console.log("Email check");
                    // for (let index = 0; index < user_db.length; index++) {
                    //   const element = user_db[index];
                    //   if (element.email === e.target.value) {
                    //     setemailerror(1);
                    //     setsubmiterror(1);
                    //     break;
                    //   } else {
                    //     setemailerror(0);
                    //     setsubmiterror(0);
                    //   }
                    // }
                    // user_db.map((obj) => {
                    //   if (obj.email === e.target.value) {
                    //     setemailerror(1);
                    //     setsubmiterror(1);
                    //   } else {
                    //     setemailerror(0);
                    //     setsubmiterror(0);
                    //   }
                    // });
                    setEmailError(!validateField(e.target.value, EMAIL_REGEX));

                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={PasswordError}
                  helperText={
                    PasswordError === null || !PasswordError
                      ? ""
                      : "Password must contain atleast 6 characters!."
                  }
                  onBlur={(e) => {
                    setPasswordError(
                      !validateField(e.target.value, PASSWORD_REGEX)
                    );
                    setPassword(e.target.value);
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="Mobile No"
                  autoComplete="family-name"
                  // onChange={(e) => setMobile(e.target.value)}
                  error={PhoneError}
                  helperText={
                    PhoneError === null || !PhoneError
                      ? ""
                      : "Invalid phone number."
                  }
                  onBlur={(e) => {
                    setPhoneError(!validateField(e.target.value, PHONE_REGEX));
                    setMobile(e.target.value);
                  }}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive  marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                ((EmailError ||
                  PasswordError ||
                  FirstNameError ||
                  LastNameError ||
                  PhoneError) &&
                  (Email || Password || FirstName || LastName || mobile)) ||
                !(Email && Password && FirstName && LastName && mobile)
                  ? true
                  : false
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account? <LoginModel />
              </Grid>
            </Grid>
          </Box>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
