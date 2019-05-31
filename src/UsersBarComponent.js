import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Axios from "axios";
import { authcomponent } from "./authecomponent";
class UsersBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    };
  }
  componentDidMount() {
    Axios.get("https://localhost:44341/api/users", {
      method: "GET",
      mode: "cors",
      headers: authcomponent()
    }).then(res => {
      const users = res.data;
      var id = [];
      var username = [];
      users.forEach(current => {
        id.push(current.id);
        username.push(current.userName);
      });
      this.setState({
        Data: {
          labels: username,
          datasets: [
            {
              label: "Users",
              data: id,
              backgroundColor: [
                "rgba(255,105,145,0.6)",
                "rgba(155,100,210,0.6)",
                "rgba(90,178,255,0.6)",
                "rgba(240,134,67,0.6)",
                "rgba(120,120,120,0.6)",
                "rgba(250,55,197,0.6)"
              ]
            }
          ]
        }
      });
    });
  }
  render() {
    return (
      <div>
        <Bar
          data={this.state.Data}
          options={{ maintainAspectRatio: false, responsive: true }}
          height={400}
          width={600}
        />
      </div>
    );
  }
}
export default UsersBarComponent;
