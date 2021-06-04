import React, { useEffect } from "react";//, useState
import { useDispatch } from "react-redux";//, useSelector
import { getRestaurants } from "../../JS/actions/restaurant";
// import RestaurantCard from "../../Components/RestaurantCard/RestaurantCard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Landpage.css";
const useStyles = makeStyles((theme) => ({
  presentation: {
    display: "flex",
    width: "90%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    // eslint-disable-next-line
    ["@media (max-width:1024px)"]: {
      flexDirection: "column",
    },
  },
  introduction: {
    flex: 1,
    paddingLeft: 60,
    height: "340px",
    position: "relative",
  },
  safeFood: {
    fontSize: 50,
    fontWeight: 400,
  },
  delivery: {
    color: "#d2691e",
    fontSize: "300%",
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
    marginLeft: "1%",
  },
  paragraph: {
    width: 400,
    fontSize: 18,
    marginRight: "100%",
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
    width: "700%",
    marginLeft: "170%",
    marginTop: "-10%",
    position: "relative",
  },
  ctaOrder: {
    fontSize: 5,
    backgroundColor: "#852938",
    color: "black",
    marginTop: 400,
    marginLeft: "120%",
  },
  input: {
    marginTop: "45%",

    zIndex: 999,
    width: 760,
    height: "15%",
  },
  /*header: {
    position: "fixed",
  },*/
}));

const Landpage = () => {
  let address = ""
  // const [address, setAdress] = useState("");
  // const load = useSelector((state) => state.restaurantReducer.load);
  /*const restaurantList = useSelector(
    (state) => state.restaurantReducer.restaurantList
  );*/
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(getRestaurants());
    }
  }, [dispatch, address]);

  return (
    <header className="header">
      <section className={classes.presentation}>
        <div className={classes.introduction}>
          <Typography className={classes.safeFood} noWrap></Typography>

          <Button variant="outlined" className={classes.ctaOrder}>
            <Link to="/filter">ORDER</Link>
          </Button>
        </div>
        <div className={classes.cover}></div>
      </section>
    </header>
  );
};

export default Landpage;
