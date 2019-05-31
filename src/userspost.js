import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Form1 from "./form1";
import { createUsers } from "./actions/appactions";
import "./style.css";

class userspost extends Component {
  state = {
    redirect: false
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/users" />;
  //   }
  // };
  handleSubmit(data) {
    console.log("form submission data", data);
    createUsers(data);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/users" />;
    }
    return (
      <div>
        {this.setRedirect}
        <Form1 onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default userspost;
