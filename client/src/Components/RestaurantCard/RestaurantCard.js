import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardContent from "@material-ui/core/CardContent";

import { Button, Card } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import "./RestaurantCard.css";
const RestaurantCard = ({ restaurant }) => {
  const {
    _id,
    name,
    email,
    phone,
    address,
    tags,
    minOrderAmount,
    imageUrl1,
    imageUrl2,
    imageUrl3,
  } = restaurant;
  const edit = useSelector((state) => state.editReducer.edit);

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      display: "flex",
      display: "inlineBock",
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
    avatar: {
      Color: red[500],
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Card className="card1">
        <img className="d-block w-100" src={imageUrl1} alt="First slide" />

        <CardContent>
          <Card.Title variant="body2" color="textSecondary" component="p">
            {name}
          </Card.Title>
          <Card.Title variant="body2" color="textSecondary" component="p">
            {address}
          </Card.Title>

          <div
            style={{
              margin: "auto",
              display: "block",
              width: "fit-content",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                />
              }
            />
          </div>

          <Typography>
            {!edit ? (
              <Button className="button">
                <Link to={`order/${_id}`}>Order Online</Link>
              </Button>
            ) : null}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantCard;
