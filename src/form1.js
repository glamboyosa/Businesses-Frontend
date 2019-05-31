import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "./style.css";
var createReactClass = require("create-react-class");

const Form1 = createReactClass({
  //setting initial state
  getInitialState() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      userName: this.props.userName,
      email: this.props.email,
      obj: [],
      role: null
    };
  },
  componentDidMount() {
    fetch("https://localhost:44341/api/roles")
      .then(res => res.json())
      .then(json => {
        const role = json[0].name;
        console.log(role);
        this.setState({
          obj: json,
          role: role
        });
      });
  },
  handleFirstChange(e) {
    this.setState({
      firstName: e.target.value
    });
  },
  handleLastChange(e) {
    this.setState({
      lastName: e.target.value
    });
  },
  handleUserChange(e) {
    this.setState({
      userName: e.target.value
    });
  },
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  },
  handleRoleChange() {
    var value = ReactDOM.findDOMNode(this.refs.role).value;
    this.setState({
      role: value
    });
  },
  //   ,
  // handleCategoryChange(e){
  //   this.setState({
  //     values: e.target.value
  //   })
  // },
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
              htmlFor="firstName"
            >
              First Name *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.firstName}
                onChange={this.handleFirstChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="firstName"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="lastName"
            >
              Last Name *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.lastName}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                onChange={this.handleLastChange}
                id="lastName"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="userName"
            >
              UserName *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.userName}
                onChange={this.handleUserChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%",
                  marginBottom: "10px"
                }}
                id="userName"
                className="form-control"
              />
            </div>
          </div>
          <div>
            <label
              className="col-sm-2 control-label required"
              htmlFor="userName"
            >
              Email *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleEmailChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="email"
                className="form-control"
              />
            </div>
          </div>
          <div className="drop-down">
            {/* SO WE MUST PASS ONCHANGE INSIDE THE RETURN*/}
            <select
              ref="role"
              onChange={this.handleRoleChange}
              style={{ width: "82%", marginTop: "20px", marginLeft: "18px" }}
            >
              {this.state.obj.map(obj => {
                return (
                  <option
                    value={obj.name}
                    key={obj.name}
                    onChange={this.handleRoleChange}
                  >
                    {obj.name}
                  </option>
                );
              })}
            </select>
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
                  <Link
                    style={{
                      textDecoration: "none"
                    }}
                    to="/users"
                  >
                    Back
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
});
export default Form1;
