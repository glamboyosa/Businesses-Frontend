import React from "react";
import { Link } from "react-router-dom";
var createReactClass = require("create-react-class");
const Form = createReactClass({
  //setting initial state
  getInitialState() {
    return {
      categoryName: this.props.categoryName
    };
  },
  handleCatChange(e) {
    this.setState({
      categoryName: e.target.value
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  },
  render() {
    return (
      <form
        name="categories_post"
        className="form-horizontal"
        onSubmit={this.handleSubmit}
      >
        <div id="categories_post">
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="categoriesName"
            >
              Categories Name *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.categoryName}
                onChange={this.handleCatChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100px"
                }}
                id="categoriesName"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-2" />
            <div className="col-sm-10">
              <div className="text-center">
                <button
                  type="submit"
                  id="categoriesSubmit"
                  className="btn btn-success"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-2" />
            <div className="col-sm-10">
              <div className="text-center">
                <button className="btn btn-danger .mt-3">
                  <Link to="/categories">Back</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
});
export default Form;
