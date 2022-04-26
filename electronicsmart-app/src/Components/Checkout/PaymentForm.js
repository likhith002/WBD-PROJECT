import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import Nav from "../Header/Nav";
import { useDispatch, useSelector } from "react-redux";
import {
  add_payment,
  SelectPayment,
} from "../../features/Reducers/PaymentSlice";
import InputMask from "react-input-mask";

export default function PaymentForm(props) {
  const [cvv, setcvv] = useState(null);
  const [exp, setexp] = useState(null);
  const [name, setname] = useState(null);
  const [no, setno] = useState(null);
  const dispatch = useDispatch();
  const payment = useSelector(SelectPayment);

  const [FirstNameError, setFirstNameError] = React.useState(null);
  const [CardError, setCardError] = React.useState(null);
  const [CVVError, setCVVError] = React.useState(null);
  const [DateError, setDateError] = React.useState(null);

  const NAME_REGEX = /^[ a-zA-Z]{5,50}$/;
  const CARD_REGEX = /^\d{16}$/;

  const validateField = (inputValue, pattern) => {
    // console.log(pattern.test(inputValue))
    return pattern.test(inputValue);
  };

  const handleValidDatedInputs = () => {
    // e.preventDefault();
    if (
      !(
        (CVVError || CardError || FirstNameError || DateError) &&
        (cvv || no || name || exp) &&
        cvv &&
        no &&
        name &&
        exp
      )
    ) {
      //all fields are validated then dispatch add_payment
      const obj = {
        cvv: cvv,
        exp: exp,
        name: name,
        no: no,
        type: "Visa",
      };
      props.test(false);
      console.log("Automatic payment saving", JSON.stringify(payment));
      dispatch(add_payment(obj));
    }
  };

  React.useEffect(() => {
    if (CVVError || CardError || FirstNameError || DateError) props.test(true);
  }, [CVVError, CardError, FirstNameError, DateError]);

  return (
    <React.Fragment>
      <Nav />
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            error={FirstNameError}
            helperText={
              FirstNameError === null || !FirstNameError ? "" : "Invalid Name."
            }
            onBlur={(e) => {
              setFirstNameError(!validateField(e.target.value, NAME_REGEX));
            }}
            onChange={(e) => {
              setname(e.target.value);
              handleValidDatedInputs();
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputMask
            mask="9999 9999 9999 9999"
            value={no}
            disabled={false}
            maskChar=" "
            onBlur={(e) => {
              console.log(no);
              setCardError(!validateField(no, CARD_REGEX));
              handleValidDatedInputs();
            }}
            onChange={(e) => {
              setno(e.target.value.replaceAll(" ", ""));
              handleValidDatedInputs();
            }}
          >
            {() => (
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                placeholder="XXXX XXXX XXXX XXXX"
                autoComplete="cc-number"
                variant="standard"
                error={CardError}
                helperText={
                  CardError === null || !CardError ? "" : "Invalid Number."
                }
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputMask
            mask="99/99"
            value={exp}
            disabled={false}
            maskChar=""
            onBlur={(e) => {
              setDateError(
                !validateField(e.target.value.replaceAll("/", ""), /\d{4}/) ||
                  parseInt(e.target.value.replaceAll("/", "").slice(0, 2)) > 12
                  ? true
                  : false
              );
              handleValidDatedInputs();
            }}
            onChange={(e) => {
              setexp(e.target.value.replaceAll("/", ""));
              handleValidDatedInputs();
            }}
          >
            {() => (
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                placeholder="MM/YY"
                autoComplete="cc-exp"
                variant="standard"
                error={CardError}
                helperText={
                  CardError === null || !CardError ? "" : "Invalid Number."
                }
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            variant="standard"
            type="password"
            // error={CVVError}
            // helperText={CVVError === null || !CVVError ? "" : "Invalid CVV."}
            onBlur={(e) => {
              // setCVVError(!validateField(e.target.value, /^\d{3,}$/));
              // handleValidDatedInputs();
            }}
            onChange={(e) => {
              setcvv(e.target.value);
              handleValidDatedInputs();
              // props.test(true);
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
