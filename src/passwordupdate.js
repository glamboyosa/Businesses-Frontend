import React from "react";
import { fetchTheUsers, updateTheUsers } from "./actions/appactions";
import FormChange from "./formchange";
var createReactClass = require("create-react-class");
const Update1 = createReactClass({
  getIntitialState() {
    return {
      users: {}
    };
  },
  componentWillReceiveProps(props) {
    this.setState(props);
  },
  componentDidMount() {
    fetchTheUsers(this.props.match.params.usersId)
      .then(data => {
        this.setState({
          users: data
        });
      })
      .catch(err => {
        console.error("error" + err);
      });
  },
  handleSubmit(data) {
    updateTheUsers(this.state.users.id, data);
    this.props.history.push("/");
  },
  render() {
    return (
      <div>
        <FormChange
          onSubmit={this.handleSubmit}

          // password={this.state.users.password}
        />
      </div>
    );
  }
});
export default Update1;
