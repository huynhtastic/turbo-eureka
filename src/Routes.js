import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Employee from "./containers/Employee";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
		<Route path="/login" exact component={Login} />
    <Route path="/employee" exact component={Employee} />
		<Route component={NotFound} />
  </Switch>;
