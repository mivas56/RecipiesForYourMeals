import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Countries.css";
import { Link } from "react-router-dom";

function Countries() {
  const [countries, setCountries] = useState([]);

  // Gettin country list from db
  const getCountries = async () => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    return response.data.meals;
  };
  // Setting countries to the ui once it's received from db
  useEffect(() => {
    const getAllCountries = async () => {
      const allCountries = await getCountries();
      if (allCountries) setCountries(allCountries);
    };
    getAllCountries();
  }, []);

  return (
    <div className="countries__container">
      <h4>Search by</h4>
      <h2>Area</h2>
      <div className="countries__list">
        {countries.map((country) => (
          <Link
            key={country.strArea}
            to={{
              pathname: `/searchcountry/${country.strArea}`,
              state: { country: country.strArea },
            }}
            style={{ textDecoration: "none", color: "#202020" }}
          >
            <div className="country__card">
              <p>{country.strArea}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Countries;
