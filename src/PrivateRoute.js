//Function responsible for restricting users according ton roles
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "./login";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        // if (!currentUser) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/404" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
export default PrivateRoute;
