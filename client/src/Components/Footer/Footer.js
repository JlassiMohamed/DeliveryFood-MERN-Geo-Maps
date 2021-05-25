import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { Card, Button, ListGroupItem, ListGroup } from "react-bootstrap";

//import Card from "@material-ui/core/Card";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//import "./Footer.css";//
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    opacity: 1,
  },
  container: {
    backgroundColor: "#A9A9A9",
    opacity: 0.6,
    marginTop: 40,
    height: "42vh",
    textAlign: "center",
  },
  innerCont: {
    margin: "74px 40px 40px 40px",
  },
  resources: {
    margin: "60px 40px 10px 40px",
  },
  buttonStyleOne: {
    color: "white",
    backgroundColor: "#e69021",
    "&:hover": {
      backgroundColor: "#881515",
    },
  },
  buttonStyleTwo: {
    color: "white",
    backgroundColor: "#e69021",
    marginLeft: 10,
    marginTop: 8,
    "&:hover": {
      backgroundColor: "#881515",
    },
  },
  paragraphe: {
    color: "#881515",
    fontFamily: "Yellowtail",
  },
}));

export default function Footer() {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const classes = useStyles();
  return (
    <header>
      <Grid container direction="row" className={classes.container}>
        <Grid item xs={12} sm={4} className={classes.innerCont}>
          {isAuth ? (
            <Grid container direction="row">
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="p">
                  Company
                </Typography>
                <Typography variant="body1" component="p">
                  <br />
                  - About <br />
                  - Blog <br />
                  - Careers <br />
                  - Contact <br />
                  - Report Fraud <br />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="p">
                  Contact Us
                </Typography>
                <Typography variant="body1" component="p">
                  <br />
                  - Facebook:Delivery@yahoo.com <br />
                  - Gmail:delivery@gmail.com <br />
                  - Phone:77943519 <br />
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography
                variant="h4"
                component="p"
                className={classes.paragraphe}
              >
                Delivery Food for Business
              </Typography>
              <Typography
                className="paragraphe"
                variant="body1"
                component="p"
                className={classes.paragraphe}
              >
                Get more out of your business, without losing focus on what is
                most important — delighting your customers
              </Typography>
              <br />
              <Link to="/addrestaurant">
                <Button className={classes.buttonStyleOne}>Get Started</Button>
              </Link>
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={3} className={classes.innerCont}>
          <Typography variant="h5" component="p" className={classes.paragraphe}>
            Delivery Food NewsLetter
          </Typography>
          <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: 28 }}
            className={classes.paragraphe}
          >
            Stay updated with new offers from our app
          </Typography>
          <TextField label="Your Email address" variant="outlined" />
          <Button className={classes.buttonStyleTwo}>SEND</Button>
        </Grid>
      </Grid>
    </header>
  );
}
