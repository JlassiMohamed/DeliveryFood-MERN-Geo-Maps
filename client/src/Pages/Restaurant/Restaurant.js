import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant } from "../../JS/actions/restaurant";
import { Link } from "react-router-dom";
import ItemCard from "../../Components/ItemCard/ItemCard";
import AddItem from "../../Components/AddItem/AddItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Carousel } from "react-bootstrap";
import "./Restaurant.css";
const useStyles = makeStyles((theme) => ({
  presentation: {
    display: "flex",
    width: "90%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    // ["@media (max-width:1024px)"]: {
    //   flexDirection: "column",
    // },
  },

  paragraph: {
    width: 400,
    fontSize: 18,
    marginRight: "150%",
    color: "#881515",
  },
  cover: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "72vh",
  },
  coverImg: {
    height: "500px",
    width: "300%",
    marginLeft: "7%",
    marginTop: "-2%",
    position: "relative",
  },

  input: {
    marginTop: "40%",
    left: "26%",
    zIndex: 999,
    width: 760,
    height: "15%",
  },
}));
const Restaurant = ({ match }) => {
  const classes = useStyles();
  const { restaurantId } = match.params;
  const restaurant = useSelector((state) => state.restaurantReducer.restaurant);
  const edit = useSelector((state) => state.editReducer.edit);
  const {
    name,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    email,
    phone,
    address,
    tags,
    minOrderAmount,
    items,
  } = restaurant;
  let itemList = items === undefined ? [] : items;
  const dispatch = useDispatch();
  useEffect(() => {
    // if (!edit) {
      //?????????????????????????
      dispatch(getRestaurant(restaurantId));
    // }
  }, [dispatch, restaurantId, edit, items]); // [dispatch, restaurantId, items] !!!!!!!!!!!!!!!!!!!!
  return (
    <div>
      <header className={classes.header}>
        <section className={classes.presentation}>
          <div className={classes.introduction}>
            <Typography className={classes.safeFood} noWrap></Typography>
            <Card className="cart" border="danger" style={{ width: "25rem" }}>
              <h1 className={classes.paragraph} noWrap>
                {name}
              </h1>
              <Card.Body>
                <Card.Title className={classes.paragraph}>{email}</Card.Title>
                <Card.Title className={classes.paragraph}>{phone}</Card.Title>
                <Card.Text className={classes.paragraph}>{address}</Card.Text>
                <Card.Title className={classes.paragraph}>{tags}</Card.Title>
                <Card.Title className={classes.paragraph}>
                  {minOrderAmount} DT
                  {edit ? (
                    <button>
                      <Link to="/setting">setting</Link>
                    </button>
                  ) : null}
                </Card.Title>
              </Card.Body>
            </Card>
          </div>

          <Carousel className="resto">
            <Carousel.Item>
              <img src={imageUrl1} alt="safe-delivery" className="carousel" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={imageUrl2} alt="safe-delivery" className="carousel" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={imageUrl3} alt="safe-delivery" className="carousel" />
            </Carousel.Item>
          </Carousel>
        </section>
      </header>

      <h4>List Of Items:</h4>

      {itemList.length > 0 ? (
        items.map((el) => <ItemCard item={el} key={el._id} />)
      ) : (
        <div>
          <span>OPENING SOON,</span>
          <p>
            Sorry customers, There's no item available yet, come back later!
          </p>
        </div>
      )}
      {edit ? <AddItem /> : null}
    </div>
  );
};

export default Restaurant;
// add
