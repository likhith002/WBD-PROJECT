import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { SelectUser } from "../../features/Reducers/UserSlice";
import { Navigate } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import { add_address } from "../../features/Reducers/AddressSlice";

export default function AddressForm(props) {
  const user = useSelector(SelectUser);
  const [ad1, setad1] = useState(null);
  const [ad2, setad2] = useState(null);
  const [pin, setpin] = useState(null);
  const [city, setcity] = useState(null);
  const [country, setcountry] = useState(null);
  const [state, setstate] = useState(null);
  const [address, setaddress] = useState(null);

  const TOKEN =
    "JsJPv_3ySUPAEOP8mZg6w4Xv2qoEd1lWAimyLlK43UXH44GMyBBkC0U3qFVHEZHuQRw";
  const [FirstNameError, setFirstNameError] = React.useState(null);
  const [LastNameError, setLastNameError] = React.useState(null);
  const [ZipError, setZipError] = React.useState(null);
  const [AddressError, setAddressError] = React.useState(null);
  const [auth_token, setauth_token] = React.useState("");

  const NAME_REGEX = /^[a-zA-Z]{2,30}$/;
  const ZIP_REGEX = /^\d{6}$/;
  const dispatch = useDispatch();
  let countries = [
    {
      country_name: "Afghanistan",
      country_short_name: "AF",
      country_phone_code: 93,
    },
    {
      country_name: "Albania",
      country_short_name: "AL",
      country_phone_code: 355,
    },
    {
      country_name: "Zimbabwe",
      country_short_name: "ZW",
      country_phone_code: 263,
    },
  ];
  let states = [
    {
      state_name: "Alabama",
    },
    {
      state_name: "Alaska",
    },
    {
      state_name: "Arizona",
    },
    {
      state_name: "Arkansas",
    },
    {
      state_name: "Byram",
    },
    {
      state_name: "Wyoming",
    },
  ];
  let cities = [
    {
      city_name: "Anchorage",
    },
    {
      city_name: "Barrow",
    },
    {
      city_name: "Bethel",
    },
    {
      city_name: "Wasilla",
    },
  ];

  const validateField = (inputValue, pattern) => {
    // console.log(pattern.test(inputValue))
    return pattern.test(inputValue);
  };

  React.useEffect(() => {
    if (countries === null) {
      axios
        .get("https://www.universal-tutorial.com/api/getaccesstoken", {
          headers: {
            Accept: "application/json",
            "api-token": TOKEN,
            "user-email": "zenerdiodesteam@gmail.com",
          },
        })
        .then((res) => res.data.auth_token)
        .then((authToken) => {
          console.log(`Got auth token:${auth_token}`);
          setauth_token(authToken);
          return axios.get("https://www.universal-tutorial.com/api/countries", {
            headers: {
              Authorization: `Bearer ${auth_token}`,
              Accept: "application/json",
            },
          });
        })
        .then((res) => {
          countries = res.data;
          console.log("Set countries");
        });
    }

    if (user != null) {
      axios
        .get(`http://localhost:3002/user?_id=${user._id}&onlyaddress=true`)
        .then((res) => {
          if (res.data.Address.length > 0) {
            setaddress(res.data.Address[res.data.Address.length - 1]);
            dispatch(
              add_address(res.data.Address[res.data.Address.length - 1])
            );

            props.test(false);
          }

          console.log(res.data);
        });
    }
  }, []);

  const handleValidDatedInputs = () => {
    // e.preventDefault();
    if (
      !(
        ((FirstNameError || LastNameError || ZipError || AddressError) &&
          (ad1 || pin || country || state || city)) ||
        !(pin && ad1 && country && state && city)
      )
    ) {
      //all fields are validated then
      console.log("POSTing address");
      console.log(props);
      props.test(false);
      fetch(`http://localhost:3002/user?_id=${localStorage.getItem('id')}&addaddress=true`, {
        method: 'PATCH',
        body:JSON.stringify({
              Address:{
                firstLine: ad1,
                secondLine: ad2,
                pin: pin,
                city: city,
                country: country,
                state: state,
              }
          }),
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json'
          }
})
        .then((res) => res.json())
        .then(console.log)
        .catch((err) => console.log(err.response.data));
    }
  };

  return (
    <React.Fragment>
      {user === null ? (
        <Navigate to="/signup" replace={true} />
      ) : (
        <div>
          <div>
            {address === null ? (
              <div>
                {" "}
                <Typography variant="h6" gutterBottom>
                  Shipping address
                </Typography>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
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
                        handleValidDatedInputs();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
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
                        handleValidDatedInputs();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address1"
                      name="address1"
                      label="Address line 1"
                      fullWidth
                      autoComplete="shipping address-line1"
                      variant="standard"
                      error={AddressError}
                      helperText={
                        AddressError === null || !AddressError
                          ? ""
                          : "Empty Field"
                      }
                      onBlur={(e) => {
                        setAddressError(
                          validateField(e.target.value, /^(\s?)+$/)
                        );
                        handleValidDatedInputs();
                      }}
                      onChange={(e) => setad1(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address line 2"
                      fullWidth
                      autoComplete="shipping address-line2"
                      variant="standard"
                      onChange={(e) => setad2(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      select
                      fullWidth
                      disabled={state !== null && state !== "" ? false : true}
                      variant="standard"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setcity(e.target.value);
                      }}
                    >
                      {cities.map((option) => (
                        <MenuItem
                          key={option.city_name}
                          value={option.city_name}
                        >
                          {option.city_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      select
                      fullWidth
                      label="State/Province/Region"
                      disabled={
                        country !== null && country !== "" ? false : true
                      }
                      autoComplete="state"
                      variant="standard"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setstate(e.target.value);
                      }}
                    >
                      {states.map((option) => (
                        <MenuItem
                          key={option.state_name}
                          value={option.state_name}
                        >
                          {option.state_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      fullWidth
                      autoComplete="shipping postal-code"
                      variant="standard"
                      error={ZipError}
                      helperText={
                        ZipError === null || !ZipError ? "" : "Invalid Zip."
                      }
                      onBlur={(e) => {
                        setZipError(!validateField(e.target.value, ZIP_REGEX));
                        console.log(validateField(e.target.value, ZIP_REGEX));
                        handleValidDatedInputs();
                      }}
                      onChange={(e) => setpin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      select
                      fullWidth
                      label="Country            "
                      autoComplete="shipping country"
                      variant="standard"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setcountry(e.target.value);
                      }}
                    >
                      {countries.map((option) => (
                        <MenuItem
                          fullWidth
                          key={option.country_name}
                          value={option.country_name}
                        >
                          {option.country_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </div>
            ) : (
              <div
                xs={2}
                style={{
                  fontWeight: "600px",
                  color: "brown",
                }}
              >
                <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    style={{ textTransform: "uppercase" }}
                    primary={"Address1:"}
                    secondary={""}
                  />
                  <Typography variant="body2">{address.firstLine}</Typography>
                </ListItem>
                {address.secondLine && (
                  <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      style={{ textTransform: "uppercase" }}
                      primary={"Address2:"}
                      secondary={""}
                    />
                    <Typography variant="body2">
                      {address.secondLine}
                    </Typography>
                  </ListItem>
                )}

                <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    style={{ textTransform: "uppercase" }}
                    primary={"Pincode:"}
                    secondary={""}
                  />
                  <Typography variant="body2">{address.pin}</Typography>
                </ListItem>
                <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    style={{ textTransform: "uppercase" }}
                    primary={"City:"}
                    secondary={""}
                  />
                  <Typography variant="body2">{address.city}</Typography>
                </ListItem>
                <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    style={{ textTransform: "uppercase" }}
                    primary={"State:"}
                    secondary={""}
                  />
                  <Typography variant="body2">{address.state}</Typography>
                </ListItem>
                <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    style={{ textTransform: "uppercase" }}
                    primary={"Country:"}
                    secondary={""}
                  />
                  <Typography variant="body2">{address.country}</Typography>
                </ListItem>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
