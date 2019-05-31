import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

var createReactClass = require("create-react-class");
const Form2 = createReactClass({
  //setting initial state
  getInitialState() {
    return {
      customerName: this.props.customerName,
      email: this.props.email,
      businessName: this.props.businessName,
      address: this.props.address,
      city: this.props.city,
      lga: this.props.lga,
      url: this.props.url,
      description: this.props.description,
      obj: [],
      categoryId: null
    };
  },
  componentDidMount() {
    this.fetchOptions();
  },
  fetchOptions() {
    fetch("https://localhost:44341/api/categories")
      .then(res => res.json())
      .then(json => {
        const categoryId = json[0].id;
        this.setState({
          obj: json,
          categoryId: categoryId
        });
      });
  },
  handleCustomerChange(e) {
    this.setState({
      customerName: e.target.value
    });
  },
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  },
  handleBusinessChange(e) {
    this.setState({
      businessName: e.target.value
    });
  },
  handleAddressChange(e) {
    this.setState({
      address: e.target.value
    });
  },
  handleCityChange(e) {
    this.setState({
      city: e.target.value
    });
  },
  handleLgaChange(e) {
    this.setState({
      lga: e.target.value
    });
  },
  handleUrlChange(e) {
    this.setState({
      url: e.target.value
    });
  },
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  },
  handleCatChange() {
    var value = ReactDOM.findDOMNode(this.refs.categoryId).value;
    this.setState({
      categoryId: parseInt(value)
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  },
  // handleChange = (selectedOption) => {
  //   // this.setState({ selectedOption }); add it to state
  //   console.log(`Option selected:`, selectedOption);
  // },
  render() {
    return (
      <form
        name="categories_post"
        className="form-horizontal"
        onSubmit={this.handleSubmit}
      >
        <div id="business_post">
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="customerName"
            >
              Customer Name *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.customerName}
                onChange={this.handleCustomerChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="customerName"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label required" htmlFor="email">
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
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="businessName"
            >
              Business Name *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.businessName}
                onChange={this.handleBusinessChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="businessName"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="address"
            >
              Address *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.address}
                onChange={this.handleAddressChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="address"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label required" htmlFor="city">
              City
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.city}
                onChange={this.handleCityChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="city"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label required" htmlFor="lga">
              LGA *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.lga}
                onChange={this.handleLgaChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="lga"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label required" htmlFor="url">
              URL *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.url}
                onChange={this.handleUrlChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="url"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label required"
              htmlFor="description"
            >
              Description *
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%"
                }}
                id="description"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label required" htmlFor="email">
              categories Name *
            </label>
            <div className="drop-down">
              {/* SO WE MUST PASS ONCHANGE INSIDE THE RETURN*/}
              {/* <Select value={selectedOption} onChange={this.handleChange} options={this.state.obj}></Select> */}
              <select
                ref="categoryId"
                onChange={this.handleCatChange}
                style={{ width: "82%" }}
              >
                {this.state.obj.map(obj => {
                  return (
                    <option
                      key={obj.id}
                      value={obj.id}
                      onChange={this.handleCatChange}
                    >
                      {obj.categoryName}
                    </option>
                  );
                })}
              </select>
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
                  <Link to="/business">Home</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
});

export default withRouter(Form2);
