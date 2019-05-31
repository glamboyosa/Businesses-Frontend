import React, { Component } from "react";
// import "./App.css";
import { Link } from "react-router-dom";
import "./style.css";
import { deleteUsers } from "./actions/appactions";
import Spinner from "./Spinner.gif";
import { authenticationService } from "./login";
import { handleResponse } from "./helpers/handle-response";
import { authcomponent } from "./authecomponent";
import { Role } from "./role";
import ScrollIntoView from "./ScrollIntoView";

//import axios from "axios";

class UsersGet extends Component {
  //default state object
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
      intervalId: 0
    };
  }
  componentDidMount() {
    fetch("https://localhost:44341/api/users", {
      method: "GET",
      mode: "cors",
      headers: authcomponent()
    })
      .then(handleResponse)
      .then(res => res)
      .then(json => {
        console.log(`Given JSON is ${json}`);
        if (this._isMounted) {
          this.setState({ isLoaded: false });
        } else {
          this.setState({
            isLoaded: true,
            items: json
          });
        }
      });
    authenticationService.currentUser.subscribe(x =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin,
        isUser1: x && x.role === Role.User1,
        isUser2: x && x.role === Role.User2,
        isUser3: x && x.role === Role.User3
      })
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  onDelete(id) {
    deleteUsers(id)
      .then(data => {
        let users = this.state.items.filter(users => {
          return id !== users;
        });
        this.setState(state => {
          state.items = users;
          return state;
        }).bind(this);
      })
      .catch(err => {
        console.error("err", err);
      });
  }
  deleteHandler(i, e) {
    e.preventDefault();
    this.onDelete(this.state.items[i].id);
    window.location.reload();
  }
  logout() {
    authenticationService.logout();
    this.props.history.push("/");
    /*
    we can either have logout as an arrow function or like below bind it to the "this" variable
    */
    // this.context.router.history.push("/Login");
    // const link = <Link to="/Login" />;
    // return link;

    // return <Redirect to="/Login" />;
  }
  //for scroll to top
  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId: intervalId });
  }
  render() {
    // console.log(Spinner);
    //  let data;
    const {
      isLoaded,
      items,
      currentUser,
      isAdmin,
      isUser1,
      isUser2,
      isUser3
    } = this.state;
    if (!isLoaded) {
      //  return (data = <img data-src={require("./Spinner.gif")} />); // return <div>Loading...</div>;
      return (
        <div className="text-center">
          <img src={Spinner} alt="Spinner" />;
        </div>
      );

      //return <div>Loading...</div>;
      // return (data = <img data-src={require("../images/giphy.gif")} />); // return <div>Loading...</div>;
    } else {
      return (
        <section className="section">
          {currentUser && (
            <nav className="sidebar">
              <Link
                to="/Home"
                className="nav-item nav-link"
                style={{ color: "white", border: "1px solid #667dd8" }}
              >
                Home
              </Link>
              {isAdmin && (
                <Link
                  to="/users"
                  className="nav-item nav-link"
                  style={{ color: "white", border: "1px solid #667dd8" }}
                >
                  Users
                </Link>
              )}
              {(isUser1 || isUser3 || isAdmin) && (
                <Link
                  to="/business"
                  className="nav-item nav-link"
                  style={{ color: "white", border: "1px solid #667dd8" }}
                >
                  Business Listing
                </Link>
              )}
              {(isUser2 || isUser3 || isAdmin) && (
                <Link
                  to="/categories"
                  className="nav-item nav-link"
                  style={{ color: "white", border: "1px solid #667dd8" }}
                >
                  Categories
                </Link>
              )}
              <a
                onClick={this.logout.bind(this)}
                className="nav-item nav-link"
                style={{ color: "white", border: "1px solid #667dd8" }}
              >
                Sign out
              </a>
            </nav>
          )}

          <div className="App">
            <nav className="navbar navbar-expand navbar-light bg-light">
              <ul className="navbar-nav ml-auto">
                <h1>Users</h1>{" "}
              </ul>
              <ul className="navbar-nav ml-auto nav">
                <h3 className="hands">
                  Welcome {authenticationService.currentUserValue.firstName}
                </h3>
              </ul>
            </nav>

            <Link
              style={{
                textDecoration: "none"
              }}
              to="/users/create"
            >
              Create
            </Link>
            <ul className="list-unstyled">
              <li className="text-secondary">
                <div
                  className="text-center"
                  style={{
                    overflow: "auto",
                    height: "inherit",
                    display: "block",
                    maxWidth: 1350,
                    marginLeft: 20
                  }}
                >
                  <table className="table table-grey table-bordered">
                    <tbody>
                      <tr>
                        <th className="xx">First Name</th>
                        <th className="xx">Last Name</th>
                        <th className="xx">User Name</th>
                        <th className="xx">Email</th>
                        <th className="xx">Password</th>
                        <th className="xx">Role</th>
                      </tr>
                      {/* // you hsve to use the json output for item.item */}
                      {items.map((item, i) => (
                        <tr className="mr-3" key={item.id}>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.userName}</td>
                          <td>{item.email}</td>
                          <td>{item.password}</td>
                          <td>{item.role}</td>
                          <td>
                            {" "}
                            <Link
                              style={{
                                textDecoration: "none"
                              }}
                              to={`/users/update/${item.id}`}
                              className="m-3"
                            >
                              Update
                            </Link>
                            <button
                              onClick={this.deleteHandler.bind(this, i)}
                              onDelete={this.onDelete.bind(this)}
                              className="btn btn-danger btn-sm .ml-2"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <button
                      title="Back to top"
                      className="scroll bt button-ful"
                      onClick={() => {
                        this.scrollToTop();
                      }}
                    >
                      top
                      {/* <span className="arrow-up glyphicon glyphicon-chevron-up" /> */}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div />
        </section>
      );
    }
  }
}

export default UsersGet;
