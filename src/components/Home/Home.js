import React from "react";
import Categories from "../Categories/Categories";
import Countries from "../Categories/Countries";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="main_page">
      <Categories />
      <Countries />
      <div className="countries__container">
        <h4>Still don't know?</h4>
        <h2>
          Search a{" "}
          <Link
            to="/random"
            style={{
              textDecoration: "none",
              color: "#d62929",
            }}
          >
            Random Recipie
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Home;
