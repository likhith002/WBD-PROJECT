import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import axios from "axios";
import TempHeader from "../Header/TempHeader";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Electronics mart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [disableButton, setdisableButton] = React.useState(true);
  const [childPaymentdets, setchildPaymentdets] = React.useState({});
  // const [UUID, setUUD] = React.useState(null);

  React.useEffect(() => {
    console.log(childPaymentdets);
  }, [childPaymentdets]);

  const handleNext = () => {
    // setUUD(crypto.randomUUID());
    if (activeStep === 2) {
      axios.post("http://localhost:3002/orders", childPaymentdets);
    }
    setActiveStep(activeStep + 1);
    setdisableButton(true);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TempHeader></TempHeader>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4 }}
        style={{ marginTop: "100px" }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            CHECKOUT
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {crypto.randomUUID()} We have emailed
                  your order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
                <Link color="inherit" href="/">
                  Electronics mart
                </Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div>
                  <div>
                    {activeStep === 0 && (
                      <AddressForm test={setdisableButton} />
                    )}
                    {activeStep === 1 && (
                      <PaymentForm test={setdisableButton} />
                    )}
                    {activeStep === 2 && (
                      <Review
                        test={setdisableButton}
                        childDetails={setchildPaymentdets}
                      />
                    )}
                  </div>
                </div>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={disableButton}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
