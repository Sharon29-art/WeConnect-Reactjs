import React from "react";
import { ToastContainer } from "react-toastify";
// import react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import components
import Home from "./Components/containerComponents/HomePage";
import RegisterPage from "./Components/containerComponents/RegisterPage";
import Profile from "./Components/containerComponents/ProfilePage";
import ChangePass from "./Components/containerComponents/ChangePassPage";
import Login from "./Components/containerComponents/LoginPage";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import ForgotPassword from "./Components/containerComponents/ResetPassword";
import myBusinesses from "./Components/containerComponents/myBusinesses";
import BusinessProfile from "./Components/containerComponents/businessProfile";
import AnalyticsDashboard from "./Components/containerComponents/AnalyticsDashboard";
// create a router
const router = (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/business/profile/:id" component={BusinessProfile} />
        <PrivateRoute exact path="/profile/update" component={Profile} />
        <PrivateRoute exact path="/profile/admin" component={ChangePass} />
        <Route exact path="/forgotpass" component={ForgotPassword} />
        <PrivateRoute
          exact
          path="/admin/my-businesses"
          component={myBusinesses}
        />
        <PrivateRoute
          exact
          path="/business/dashboard/:id"
          component={AnalyticsDashboard}
        />
      </Switch>
    </Router>
    <ToastContainer />
  </div>
);

class Routes extends React.Component {
  render() {
    return router;
  }
}

export default Routes;
