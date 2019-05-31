import React, { Component } from "react";
// import axios from "axios";
import Form from "./form";
import { createCategories } from "./actions/appactions";
class categoriespost extends Component {
  // constructor(props) {
  //   super(props);
  handleSubmit(data) {
    console.log("form submission data", data);
    createCategories(data);
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default categoriespost;
