import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../JS/actions/cart";
import { deleteItem } from "../../JS/actions/item";
import AddItem from "../AddItem/AddItem";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Card, Button } from "react-bootstrap";
import "./ItemCard.css";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const ItemCard = ({ item }) => {
  const classes = useStyles();
  const { _id, imageUrl, title, description, tags, price, restaurant } = item;
  // console.log(item);
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.editReducer.edit);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const addToCartHandler = () => {
    let product = {
      productId: _id,
      restaurantId: restaurant,
      name: title,
      imageUrl,
      price,
      // quantity: 1,
    };
    dispatch(postCart(product));
    alert("item added to cart");
  };

  return (
    <div className="page">
      <Card className="Card">
        <Card.Img className="movie" src={imageUrl} />
        <Card.Body>
          <Card.Title className="Title">{title}</Card.Title>
          <hr />
          <Card.Title>{price}DT</Card.Title>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Recipe</Typography>
              <Typography paragraph>{description}</Typography>
            </CardContent>
          </Collapse>
          {!edit && isAuth ? (
            <button onClick={addToCartHandler}>Add To Cart</button>
          ) : !edit && !isAuth ? (
            <button>
              <Link to="/signin">Add To Cart</Link>
            </button>
          ) : (
            <div>
              <AddItem id={_id} />
              <Button onClick={() => dispatch(deleteItem(item._id))}>
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemCard;
// edit
