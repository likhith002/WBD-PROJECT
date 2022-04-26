import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

import {
  removefromCart,
  SelectCart,
  SelectTotal,
} from "../../features/Reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

import { SelectUser } from "../../features/Reducers/UserSlice";
import { SelectPayment } from "../../features/Reducers/PaymentSlice";
import { selectaddress } from "../../features/Reducers/AddressSlice";

export default function Review(props) {
  props.test(false);

  const products = useSelector(SelectCart);
  const total = useSelector(SelectTotal);

  const dispatch = useDispatch();
  const user = useSelector(SelectUser);
  const payment = useSelector(SelectPayment);

  const address = useSelector(selectaddress);
  console.log("payment" + payment);
  let payments = [
    { name: "Card Type", detail: "Visa" },
    { name: "Card holder", detail: payment[0].name },
    { name: "Card number", detail: "xxxx-xxxx-xxxx" + payment[0].no.slice(11) },
    { name: "Expiry date", detail: payment[0].exp },
  ];
  React.useEffect(() => {
    if (user != null) {
      props.childDetails({
        products: products,
        total: total,
        address: address,
        payment: payment[0],
        user_id: user._id,
      });
    }
  }, [products]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <div>
            <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={product.name}
                secondary={product._id.slice(0, 4)}
              />

              <Typography variant="body2">₹{product.price}</Typography>
              <button
                className="btn btn-primary"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  dispatch(removefromCart({ product_id: product._id }));
                }}
              >
                <DeleteIcon />
              </button>
            </ListItem>
          </div>
        ))}

        <ListItem key={"1"} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Shipping"} secondary={"Cost"} />
          <Typography variant="body2">
            ₹{Math.floor(useSelector(SelectTotal) * 0.01)}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹
            {useSelector(SelectTotal) +
              Math.floor(useSelector(SelectTotal) * 0.01)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} ls={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{user != null && user.firstname}</Typography>
          <Typography gutterBottom>
            {address != null && address.firstLine}
          </Typography>
          <Typography gutterBottom>
            {address != null && address.city}
          </Typography>
          <Typography gutterBottom>
            {address != null && address.state}
          </Typography>
          <Typography gutterBottom>
            {address != null && address.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
