import React, { Component } from "react";
import "./style.css";
import { deleteBusiness } from "./actions/appactions";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.gif";
import { authenticationService } from "./login";
import { handleResponse } from "./helpers/handle-response";
// import { authcomponent } from "./authecomponent";
import { Role } from "./role";

//import axios from "axios";

class App1 extends Component {
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
    const currentUser = authenticationService.currentUserValue;
    var Bearer = currentUser.token;
    console.log(Bearer);
    fetch("https://localhost:44341/api/businesslistings", {
      method: "GET",
      mode: "cors",
      headers: { Authorization: "Bearer" + " " + Bearer }
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
    deleteBusiness(id)
      .then(data => {
        let business = this.state.items.filter(business => {
          return id !== business.id;
        });
        this.setState(state => {
          state.items = business;
          return state;
        }).bind(this);
      })
      .catch(err => {
        console.error("err" + err);
      });
  }
  deleteHandler(i, e) {
    e.preventDefault();
    this.onDelete(this.state.items[i].id);
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
        <div className="section">
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
                <h1>Businesses</h1>{" "}
              </ul>
              <ul className="navbar-nav ml-auto nav">
                <h3 className="hands">
                  Welcome {authenticationService.currentUserValue.firstName}
                </h3>
              </ul>
            </nav>

            {(isUser1 || isUser3) && <Link to="/business/create">Create</Link>}
            <ul className="list-unstyled">
              <li className="text-secondary">
                <div className="text-center">
                  <table
                    className="xxx table table-grey table-bordered"
                    // style={{
                    //   border: "1px solid white",
                    //   overflow: "auto",
                    //   height: "inherit",
                    //   display: "block",
                    //   maxWidth: 1200,
                    //   marginLeft: 20
                    // }}
                  >
                    <thead className="thead">
                      <tr className="">
                        <th className="col">Name</th>
                        <th className="col">Email</th>
                        <th className="col">Business Name</th>
                        <th className="col">Address</th>
                        <th className="col">City</th>
                        <th className="col">Lga</th>
                        <th className="col">Url</th>
                        <th className="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* // you hsve to use the json output for item.item */}
                      {items.map((item, i) => (
                        <tr key={item.id}>
                          <td className="xx">{item.customerName}</td>
                          <td className="xx">{item.email}</td>
                          <td className="xx">{item.businessName}</td>
                          <td className="xx">{item.address} </td>
                          <td className="xx">{item.city} </td>
                          <td className="xx">{item.lga} </td>
                          <td className="xx">{item.url}</td>
                          <td className="xx">{item.description}</td>
                          <td>
                            {(isUser1 || isUser3) && (
                              <Link
                                style={{
                                  textDecoration: "none"
                                }}
                                to={`/business/update/${item.id}`}
                                className="m-3"
                              >
                                Update
                              </Link>
                            )}

                            {/* <Link to="/business/delete">Delete</Link> */}

                            {(isUser1 || isUser3) && (
                              <button
                                onClick={this.deleteHandler.bind(this, i)}
                                onDelete={this.onDelete.bind(this)}
                                className="btn btn-danger btn-sm .ml-2"
                              />
                            )}
                          </td>
                          <td />
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

                {/* <div className="float-left p-3">
                  |  |  | |{" "}
                   | |  |  |{" "}
                  
                </div> */}
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default App1;
