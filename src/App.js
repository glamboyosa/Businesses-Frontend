import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import App1 from "./App1";
import App2 from "./App2";
import categoriespost from "./categoriespost";
import userspost from "./userspost";
import UsersGet from "./UsersGet";
import businesspost from "./businesspost";
import businessupdate from "./businessupdate";
import categoriesupdate from "./categoriesupdate";
import usersupdate from "./usersupdate";
import passwordupdate from "./passwordupdate";
import login from "./login";
import PrivateRoute from "./PrivateRoute";
import Role from "./role";
import Home1 from "./Home1";
import NotFound from "./NotFound";
import "./style.css";
//import axios from "axios";

class App extends Component {
  //default state object

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Login" exact component={login} />
          <Route path="/" exact component={Home1} />
          <Route path="/Home" exact component={Home} />
          <Route path="/404" exact component={NotFound} />
          <PrivateRoute
            path="/categories"
            roles={[Role.User2, Role.Admin, Role.User3]}
            exact
            component={App2}
          />
          <PrivateRoute
            path="/business"
            roles={[Role.User3, Role.User1, Role.Admin]}
            exact
            component={App1}
          />
          <PrivateRoute
            path="/users"
            roles={[Role.Admin]}
            exact
            component={UsersGet}
          />
          <PrivateRoute
            path="/business/create"
            roles={[Role.User1, Role.User3]}
            exact
            component={businesspost}
          />
          <PrivateRoute
            path="/categories/create"
            roles={[Role.User2, Role.User3]}
            exact
            component={categoriespost}
          />
          <PrivateRoute
            path="/users/create"
            roles={[Role.Admin]}
            exact
            component={userspost}
          />
          <PrivateRoute
            path="/business/update/:businessId"
            roles={[Role.User1, Role.User3]}
            component={businessupdate}
          />
          <PrivateRoute
            path="/categories/update/:categoryId"
            roles={[Role.User2, Role.User3]}
            component={categoriesupdate}
          />
          <PrivateRoute
            path="/users/update/:usersId"
            roles={[Role.Admin]}
            component={usersupdate}
          />
          <Route
            path="/users/changepassword/:usersId"
            component={passwordupdate}
          />
          {/* </div> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
