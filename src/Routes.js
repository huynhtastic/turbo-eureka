import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Cookies from 'universal-cookie';
import Home from "./containers/Home";
import Employee from "./containers/Employee";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

const cookies = new Cookies();

function isAdmin() {
  return (cookies.get('emp_id') && parseInt(cookies.get('admin')) === 1);
}

function isEmployee() {
  return (cookies.get('emp_id') && parseInt(cookies.get('admin')) === 0);
}

export default () =>
  <Switch>
    <Route path="/" exact component={Home}/>
		<Route path="/login" exact component={Login} />
    <Route path="/employee" exact render={() => (
      isEmployee() ? (
        <Employee />
      ) : (
        <Redirect to="/login" />
      )
    )} />
		<Route component={NotFound} />
  </Switch>;
