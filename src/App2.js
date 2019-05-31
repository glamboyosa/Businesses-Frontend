import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteCategory } from "./actions/appactions";
import Spinner from "./Spinner.gif";
import { authenticationService } from "./login";
import { handleResponse } from "./helpers/handle-response";
import { authcomponent } from "./authecomponent";
import { Role } from "./role";
//import "./index.css";
//import "./App.css";

//import axios from "axios";

class App2 extends Component {
  //default state object
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      intervalId: 0,
      isLoaded: false
    };
  }
  componentDidMount() {
    fetch("https://localhost:44341/api/categories", {
      method: "GET",
      mode: "cors",
      headers: authcomponent()
    })
      .then(handleResponse)
      .then(res => res)
      .then(json => {
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
  onDelete(id) {
    deleteCategory(id)
      .then(data => {
        let category = this.state.items.filter(category => {
          return id !== category.id;
        });
        this.setState(state => {
          state.items = category;
          return state;
        }).bind(this);
      })
      .catch(err => {
        console.error("err" + err);
      });
    // this.props.history.push("/users");
  }
  deleteHandler(i, e) {
    e.preventDefault();
    this.onDelete(this.state.items[i].id);
    // window.location.reload();
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
      return (
        <div className="text-center">
          <img src={Spinner} alt="Spinner" />;
        </div>
      );
    } else {
      return (
        <div className="section text-center">
          {currentUser && (
            <nav className="sidebar">
              <div className="navbar-nav">
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
              </div>
            </nav>
          )}
          <div className="App text-center">
            <div className="bar">
              <nav className="navbar navbar-expand navbar-light bg-light">
                {/* <ul className="navbar-nav ml-auto">
                  <h1>Users</h1>{" "}
                </ul> */}
                <ul className="navbar-nav ml-auto nav">
                  <h3 className="hands">
                    Welcome {authenticationService.currentUserValue.firstName}
                  </h3>
                </ul>
              </nav>
            </div>
            {(isUser2 || isUser3) && (
              <Link
                style={{
                  textDecoration: "none"
                }}
                to="/categories/create"
              >
                Create
              </Link>
            )}

            <ul className="list-unstyled">
              <li className="text-secondary">
                <div className=" p-4 ">
                  <table className="xxx table table-grey table-bordered">
                    <tbody>
                      <tr>
                        <th className="">Category Name</th>
                      </tr>
                      {items.map((item, i) => (
                        <tr key={item.id}>
                          {/* //you hsve to use the json output for item.item */}
                          <td>{item.categoryName}</td>
                          <td>
                            {" "}
                            {(isUser2 || isUser3) && (
                              <Link
                                style={{
                                  textDecoration: "none"
                                }}
                                to={`/categories/update/${item.id}`}
                                className="m-3"
                              >
                                Update
                              </Link>
                            )}
                            {(isUser2 || isUser3) && (
                              <button
                                onClick={this.deleteHandler.bind(this, i)}
                                onDelete={this.onDelete.bind(this)}
                                className="btn btn-danger btn-sm .ml-2"
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

                {/* <div className="float-left ml-5">
                  {item.id} | 
                </div> */}
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default App2;
