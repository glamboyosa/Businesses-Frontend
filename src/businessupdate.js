import React from "react";
import Form2 from "./form2";
import { fetchBusiness, updateBusiness } from "./actions/appactions";

var createReactClass = require("create-react-class");

const Update = createReactClass({
  getInitialState() {
    return {
      business: {}
    };
  },
  componentWillReceiveProps(props) {
    this.setState(props);
  },
  componentDidMount() {
    fetchBusiness(this.props.match.params.businessId)
      .then(data => {
        this.setState(state => {
          state.business = data;
          return state;
        });
      })
      .catch(err => {
        console.error("error", err);
      });
  },
  handleSubmit(data) {
    updateBusiness(this.state.business.id, data);
  },
  render() {
    return (
      <div>
        <Form2
          onSubmit={this.handleSubmit}
          customerName={this.state.business.customerName}
          email={this.state.business.email}
          businessName={this.state.business.businessName}
          address={this.state.business.address}
          city={this.state.business.city}
          lga={this.state.business.lga}
          url={this.state.business.url}
          description={this.state.business.description}
        />
      </div>
    );
  }
});
export default Update;
