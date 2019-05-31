//Home page of the app
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home1 = () => (
  <section class="section-big">
    <div className="error">
      <h1 className="wilkomm">Welcome</h1>
      <button className="button button-full">
        {" "}
        <Link
          style={{
            textDecoration: "none"
          }}
          to="/login"
          className="deco-none"
        >
          Sign In
        </Link>
      </button>
    </div>
  </section>
);

export default Home1;
