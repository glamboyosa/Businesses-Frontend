import React from "react";
import Form1 from "./form1";
import { fetchUsers, updateUsers } from "./actions/appactions";

var createReactClass = require("create-react-class");
const Update = createReactClass({
  getInitialState() {
    return {
      users: {}
    };
  },
  componentWillReceiveProps(props) {
    this.setState(props);
  },
  componentDidMount() {
    fetchUsers(this.props.match.params.usersId)
      .then(data => {
        this.setState(state => {
          state.users = data;
          return state;
        });
      })
      .catch(err => {
        console.error("error" + err);
      });
  },
  handleSubmit(data) {
    updateUsers(this.state.users.id, data);
  },
  render() {
    return (
      <div>
        <Form1
          onSubmit={this.handleSubmit}
          firstName={this.state.users.firstName}
          lastName={this.state.users.lastName}
          userName={this.state.users.userName}
          role={this.state.users.role}
        />
      </div>
    );
  }
});
export default Update;
