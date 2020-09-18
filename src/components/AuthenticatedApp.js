import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Profile from "./Profile";
import Repositories from './Repositories';

const AuthenticatedApplication = () => {
  const { id } = useParams();
  return (
    <div>
      <Navigation />

      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>

        <Route exact path="/repositories/">
          <Repositories />
        </Route>

        <Route path="/repositories/:id">
          <Repositories />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="*">
          <div>This path doesn't exist</div>
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApplication;
