import React, { Component } from "react";
// import axios from "axios";
import Form2 from "./form2";
import { Redirect, withRouter } from "react-router-dom";
import { createBusiness } from "./actions/appactions";
class businesspost extends Component {
  // constructor(props) {
  //   super(props);
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/users" />;
    }
  };
  handleSubmit(data) {
    console.log("form submission data", data);
    createBusiness(data);
  }
  render() {
    return (
      <div>
        <Form2 onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default withRouter(businesspost);
