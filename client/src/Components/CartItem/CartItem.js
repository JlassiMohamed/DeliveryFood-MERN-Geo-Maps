import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./CartItem.css";

const CartItem = ({ product, qtyChangeHandler, removeHandler }) => {
  const { productId, name, imageUrl, price, quantity } = product;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      width: "290px",
      marginLeft: "40%",
    },
    cover: {
      width: 200,
      marginLeft: "32%",
    },
    controls: {
      display: "flex",
      marginLeft: "70%",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

  const classes = useStyles();
  // const theme = useTheme();
  return (
    <Card className={classes.root} style={{ width: "45rem" }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <br />
          <h5 variant="subtitle1" color="textSecondary">
            {price}DT
          </h5>
        </CardContent>
        <div className={classes.controls}>
          <select
            value={quantity}
            onChange={(e) => qtyChangeHandler(productId, e.target.value)}
            className="cartItem__select"
          >
            {[...Array(10).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
          <button
            className="cartItem__deleteBtn"
            onClick={() => removeHandler(productId)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <img className={classes.cover} src={imageUrl} alt={name} />
    </Card>
  );
};

export default CartItem;
