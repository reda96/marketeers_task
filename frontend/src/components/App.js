import React, { Component } from "react";
import LogIn from "./Login";
import Register from "./Register";
import Table from "./Table";
import { Route, Switch } from "react-router-dom";
export default class App extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Table} />
        <Route exact path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
