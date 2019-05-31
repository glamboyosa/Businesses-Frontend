import React from "react";

var createReactClass = require("create-react-class");
var FormChange = createReactClass({
  //setting initial state
  getInitialState() {
    return {
      password: this.props.password
    };
  },
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    // this.props.history.push("/");
  },
  render() {
    return (
      <form
        name="categories_post"
        className="form-horizontal"
        onSubmit={this.handleSubmit}
      >
        <h2 className="text-center mt-3">Change Password</h2>
        <div id="change_password">
          <div className="form-group">
            <div className="col-sm-10 ">
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                placeholder="change password"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "50%",
                  margin: "0 auto"
                }}
                id="password"
                className="form-control"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              id="formChangeSubmit"
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
});
export default FormChange;
