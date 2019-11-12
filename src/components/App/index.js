import React from "react";
import { compose } from "recompose";
import withAuthentication from "../Session/withAuthentication";
import withAuthorization from "../Session/withAuthorization";
import ifAuthorized from "../Session/ifAuthorized";

const App = ({ children }) => (
  <React.Fragment>
    {children}
  </React.Fragment>
);

const AppWithAuthentication = compose(
  withAuthentication,
  withAuthorization(false)
)(App);

const AppWithAuthorization = compose(
  withAuthentication,
  withAuthorization(true)
)(App);

const AppIfAuthorized = compose(
  withAuthentication,
  ifAuthorized(true)
)(App);

export { AppWithAuthentication, AppWithAuthorization, AppIfAuthorized };
