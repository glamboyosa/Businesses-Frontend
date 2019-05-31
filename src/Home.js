//Home page of the app
import React, { Component } from "react";
// import "./App.css";
import { Link, withRouter } from "react-router-dom";
import { authenticationService } from "./login";
import { Role } from "./role";
import { Bar } from "react-chartjs-2";
import UsersBarComponent from "./UsersBarComponent";
import CategoriesBarComponent from "./CategoriesBarComponent";
import BusinessPieComponent from "./BusinessPieComponent";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
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
  //should really be done in app.js but was having issues because I have a router and switch.
  // Seriously violating DRY principles
  componentDidMount() {
    fetch("https://localhost:44341/api/values", {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
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

  render() {
    const {
      currentUser,
      isAdmin,
      isUser1,
      isUser2,
      isUser3,
      items
    } = this.state;
    return (
      <section className="section-home">
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
          <div className="text">
            <h2
              style={{
                margin: "0 auto",
                paddingTop: "20px"
              }}
            >
              Welcome {authenticationService.currentUserValue.role}
            </h2>
          </div>
          <div className="charts-div row">
            <div className="col-6">
              <h3>User's Barchart</h3>
              <UsersBarComponent className="bar" />
            </div>
            <div className="col-6">
              <h3>Categories Barchart</h3>
              <CategoriesBarComponent />
            </div>
            <div className="col-6 bus">
              <h3>Business Piechart</h3>
              <BusinessPieComponent />
            </div>
          </div>

          <div className="App ">
            {/* <div className="charts-div">
             
            </div> */}

            <ul className="list-unstyled">
              {items.map(item => (
                // you hsve to use the json output for item.item
                <li key={item.id} className="text-secondary" />
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Home);
