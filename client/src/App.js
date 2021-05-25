import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import { currentUser } from "./JS/actions/user";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import Errors from "./Pages/Errors/Errors";
import Landpage from "./Pages/Landpage/Landpage";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import AddRestaurant from "./Pages/AddRestaurant/AddRestaurant";
import PrivateRoute from "./router/PrivateRoute";
import UserRoute from "./router/UserRoute";
import Restaurant from "./Pages/Restaurant/Restaurant";
import Orders from "./Pages/Orders/Orders";
import Profile from "./Pages/Profile/Profile";
import Filter from "./Components/Filter/Filter";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(currentUser());
    }
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <main className="App">
        <Switch>
          <Route exact path="/" component={Landpage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/profile" component={Profile} />
          <Route path="/filter" component={Filter} />
          <Route
            path={["/addrestaurant", "/setting"]}
            component={AddRestaurant}
          />
          <Route
            path={["/order/:restaurantId", "/seller/dashboard/:restaurantId"]}
            render={(props) => <Restaurant {...props} />}
          />
          <UserRoute path="/cart" component={Cart} />
          <PrivateRoute
            path={["/myorders", "/orders/:restaurantId"]}
            component={Orders}
          />
          <Route path="/*" component={Errors} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
