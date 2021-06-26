import React, { useState, useEffect } from "react";
import "./SearchCategory.css";
import MealCard from "./MealCard";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

function SearchCategory(props) {
  const categoryName = props.location.state.category;

  const [categoryRes, setCategoryRes] = useState([]);
  const [loading, setLoading] = useState(false);

  // www.themealdb.com/api/json/v1/1/filter.php?c={catname} <<< SEARCH BY CATEGORY
  const getFilteredCategoryFromDB = async () => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    return response.data.meals;
  };

  useEffect(() => {
    const getFilteredCategoryResult = async () => {
      const categoryResults = await getFilteredCategoryFromDB();
      if (categoryResults) setCategoryRes(categoryResults);
    };
    getFilteredCategoryResult();
    setLoading(true);
  }, []);

  return (
    <div>
      <h4>You are searching</h4>
      <h2>{categoryName} category</h2>
      {loading ? (
        <div>
          <div className="meal_list">
            {categoryRes.map((meal) => (
              <MealCard
                key={meal.idMeal}
                id={meal.idMeal}
                mealName={meal.strMeal}
                thumb={meal.strMealThumb}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="spinnercontainer">
          <CircularProgress color="secondary" />
          <h4>Please wait</h4>
        </div>
      )}
    </div>
  );
}

export default SearchCategory;
