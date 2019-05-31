import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Axios from "axios";
import { authcomponent } from "./authecomponent";
class CategoriesBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    };
  }
  componentDidMount() {
    Axios.get("https:localhost:44341/api/categories", {
      method: "GET",
      mode: "cors",
      headers: authcomponent()
    }).then(res => {
      const categories = res.data;
      var catName = [];
      var Id = [];
      //loop through
      categories.forEach(curr => {
        catName.push(curr.categoryName);
        Id.push(curr.id);
        console.log(catName, Id);
      });
      this.setState({
        Data: {
          labels: catName,
          datasets: [
            {
              label: "Categories",
              data: Id,
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
          options={{ maintainAspectRatio: true }}
          height={400}
          width={600}
        />
      </div>
    );
  }
}
export default CategoriesBarComponent;
