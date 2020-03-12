import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AddItemsForm from "./components/AddItemsForm";
import EditItemsForm from "./components/EditItemsForm";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {

  render() {

    const dashboardStyle = {
      width: "250px",
      margin: "25px",
      height: "250px",
      color: "black",
      fontSize: "175px",
      lineHeight: "225px",
      border: "1px solid black",
      borderRadius: "10px"
    }

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={() => (<Dashboard dashboardStyle={dashboardStyle} viewName="Dashboard" />)} />
              <PrivateRoute exact path="/add" component={AddItemsForm} />
              <PrivateRoute exact path="/edit" component={EditItemsForm} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
