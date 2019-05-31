import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import Axios from "axios";
import { authcomponent } from "./authecomponent";
class BusinessPieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    };
  }
  componentDidMount() {
    Axios.get("https:localhost:44341/api/businesslistings", {
      method: "GET",
      mode: "cors",
      headers: authcomponent()
    }).then(res => {
      var business = res.data;
      var id = [];
      var busName = [];
      business.forEach(current => {
        id.push(current.categoryId);
        busName.push(current.businessName);
      });
      this.setState({
        Data: {
          labels: busName,
          datasets: [
            {
              labels: "Businesses",
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
        <Pie
          data={this.state.Data}
          options={{ maintainAspectRatio: false }}
          height={300}
          width={400}
        />
      </div>
    );
  }
}
export default BusinessPieComponent;
