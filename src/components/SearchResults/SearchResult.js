import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import axios from "axios";
import "./SearchCategory.css";

function SearchResult(props) {
  const [mealsRes, setMealsRes] = useState([]);
  const mealName = props.location.state.name;

  const getMealFromDB = async () => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    setMealsRes("");
    return response.data.meals;
  };

  useEffect(() => {
    const getMealResult = async () => {
      const mealsResults = await getMealFromDB();
      if (mealsResults) setMealsRes(mealsResults);
    };
    getMealResult();
  }, [mealName]);

  return (
    <div>
      {mealsRes?.length > 0 ? (
        <div className="meal_list">
          {mealsRes.map((meal) => (
            <MealCard
              key={meal.idMeal}
              id={meal.idMeal}
              mealName={meal.strMeal}
              thumb={meal.strMealThumb}
            />
          ))}
        </div>
      ) : (
        <h3 className="searchRes">
          Sorry no results found, try searching by the meal name.
        </h3>
      )}
    </div>
  );
}

export default SearchResult;
