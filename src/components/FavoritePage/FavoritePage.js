import FavoriteCard from "./FavoriteCard";
import "./Favorite.css";
import { useState, useEffect } from "react";

function FavoritePage() {
  const [favMeals, setFavMeals] = useState([]);
  const storageMeals = JSON.parse(localStorage.getItem("favMeals"));

  useEffect(() => {
    setFavMeals(storageMeals);
  }, []);

  const removeMeal = (id) => {
    const newMealList = favMeals.filter((meal) => meal.id !== id);
    localStorage.setItem("favMeals", JSON.stringify(newMealList));
    setFavMeals(newMealList);
  };

  return (
    <div className="favContainer">
      <h2>Your favorites</h2>
      {favMeals?.length <= 0 || favMeals === null ? (
        <h4>
          You didn't add any favorites. Search for meal and add to your favorite
          to view this list.
        </h4>
      ) : (
        favMeals.map((favMeal) => {
          return (
            <FavoriteCard
              getMealId={removeMeal}
              key={favMeal.id}
              id={favMeal.id}
              name={favMeal.name}
              image={favMeal.image}
            />
          );
        })
      )}
    </div>
  );
}

export default FavoritePage;
