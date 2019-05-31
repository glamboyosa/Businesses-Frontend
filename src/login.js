import React, { Component } from "react";
import axios from "axios";
import { BehaviorSubject } from "rxjs";
import "./style.css";
//current is in charge of keeping the user logged in
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("jwt"))
);
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submit(e) {
    e.preventDefault();
    axios
      .post("https://localhost:44341/api/users/authenticate", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("jwt", JSON.stringify(res.data));
        currentUserSubject.next(res);
        // const currentUser = authenticationService.currentUserValue;
        // console.log(currentUser.data.userName);
        // if (currentUser.userName === "Admin") {
        //   this.props.history.push("/users");
        // } else if (currentUser.userName === "User1") {
        //   this.props.history.push("/business");
        // } else if (currentUser.userName === "User2") {
        //   this.props.history.push("/categories");
        // } else if (currentUser.userName === "User3") {
        //   this.props.history.push("/business");
        // } else {
        //   this.props.history.push("/");
        // }
        this.props.history.push("/Home");
        window.location.reload();
      });
  }

  render() {
    return (
      <section className="container">
        <div className="form text-center">
          <div className="login-wrapper">
            <img
              src="https://res.cloudinary.com/molyktech/image/upload/v1540457655/up-logo.png"
              className="img"
            />
            <h3 className="text-center">SIGN IN TO YOUR ACCOUNT</h3>
            <form onSubmit={e => this.submit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Username"
                  style={{ margin: "auto", marginTop: 0 }}
                  className="d-block"
                  name="username"
                  onChange={e => this.change(e)}
                  value={this.state.username}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="d-block"
                  placeholder="Password"
                  style={{ margin: "auto" }}
                  name="password"
                  onChange={e => this.change(e)}
                  value={this.state.password}
                />
              </div>
              <div className="text-center">
                <button type="submit" className=" bt button-sign">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
function logout() {
  localStorage.removeItem("jwt");
  currentUserSubject.next(null);
}
export const authenticationService = {
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
export default login;
