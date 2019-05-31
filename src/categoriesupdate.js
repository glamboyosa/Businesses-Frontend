import React from "react";
import Form from "./form";
import { fetchCategories, updateCategories } from "./actions/appactions";

var createReactClass = require("create-react-class");

const Update = createReactClass({
  getInitialState() {
    return {
      categories: {}
    };
  },
  componentWillReceiveProps(props) {
    this.setState(props);
  },
  componentDidMount() {
    fetchCategories(this.props.match.params.categoryId)
      .then(data => {
        this.setState(state => {
          state.categories = data;
          return state;
        });
      })
      .catch(err => console.error("error", err));
  },
  handleSubmit(data) {
    updateCategories(this.state.categories.id, data);
  },
  render() {
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          categoryName={this.state.categories.categoryName}
        />
      </div>
    );
  }
});
export default Update;
