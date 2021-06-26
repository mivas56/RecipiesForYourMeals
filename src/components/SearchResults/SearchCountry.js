import React, { useState, useEffect } from "react";
import "./SearchCategory.css";
import MealCard from "./MealCard";
import axios from "axios";

function SearchCountry(props) {
  const countryName = props.location.state.country;

  const [countryRes, setCountryRes] = useState([]);
  /* const [searchRes, setSearchRes] = useState(""); */

  // www.themealdb.com/api/json/v1/1/filter.php?c={catname} <<< SEARCH BY country
  const getFilteredCountryFromDB = async () => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`
    );
    return response.data.meals;
  };

  useEffect(() => {
    const getFilteredCountryResult = async () => {
      const countryResults = await getFilteredCountryFromDB();
      if (countryResults) setCountryRes(countryResults);
    };
    getFilteredCountryResult();
  }, []);

  return (
    <div>
      <h4>You are searching</h4>
      <h2>{countryName} meals</h2>
      <div className="meal_list">
        {countryRes.map((meal) => (
          <MealCard
            key={meal.idMeal}
            id={meal.idMeal}
            mealName={meal.strMeal}
            thumb={meal.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchCountry;
