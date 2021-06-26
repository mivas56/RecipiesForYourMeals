import React, { useState, useEffect } from "react";
import "./../SearchResults/SingleMeal.css";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Button from "@material-ui/core/Button";

function Random() {
  // www.themealdb.com/api/json/v1/1/random.php
  const [status, setStatus] = useState(false);
  const [meal, setMeal] = useState([]);
  const [instrArray, setInstrArray] = useState([]);
  const [dis, setDisable] = useState(false);
  const [btnCol, setBtnCol] = useState("#d62929");

  // Get random meal from db
  const getRandom = async () => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    return response.data.meals[0];
  };
  // Setting random meal on click of the btn to the ui everytime it changes
  function getRandomMeal() {
    const getMeal = async () => {
      const singleMeal = await getRandom();
      if (singleMeal) setMeal(singleMeal);
      setStatus(true);
    };
    getMeal();
  }

  // Setting ingredients diagonally with its measure "Sugar - 2tbsp"
  function newList(item) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (item[`strIngredient${i}`]) {
        ingredients.push(
          `${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    return ingredients;
  }

  // Removing spacing from the console.log instructions, creating new array of it.
  useEffect(() => {
    async function instrArr() {
      const str = await meal.strInstructions;
      const res = str ? str.split("\r\n") : str;
      if (res) setInstrArray(res);
    }
    instrArr();
    setDisable(false);
    setBtnCol("#d62929");
  }, [meal]);

  useEffect(() => {
    const storageMeals = JSON.parse(localStorage.getItem("favMeals"));
    storageMeals?.map((m) => {
      if (m.id === meal.idMeal) {
        setDisable(true);
        setBtnCol("gray");
      } else {
        return null;
      }
    });
  }, []);

  function removeItemAll(arr, value) {
    let i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  removeItemAll(instrArray, "");
  removeItemAll(instrArray, " ");
  removeItemAll(instrArray, "1");
  removeItemAll(instrArray, "2");
  removeItemAll(instrArray, "3");
  removeItemAll(instrArray, "4");
  removeItemAll(instrArray, "5");
  removeItemAll(instrArray, "6");
  removeItemAll(instrArray, "STEP 1");
  removeItemAll(instrArray, "STEP 2");
  removeItemAll(instrArray, "STEP 3");
  removeItemAll(instrArray, "STEP 4");
  removeItemAll(instrArray, "STEP 5");
  removeItemAll(instrArray, "STEP 6");
  removeItemAll(instrArray, "STEP 7");

  const localStorageFavMeals = JSON.parse(localStorage.getItem("favMeals"));

  let favMeals =
    localStorage.getItem("favMeals") !== null ? localStorageFavMeals : [];

  const addToFav = () => {
    const favMeal = {
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
    };
    favMeals.push(favMeal);
    localStorage.setItem("favMeals", JSON.stringify(favMeals));
    setDisable(!dis);
    setBtnCol("gray");
  };

  return (
    <div className="singleContainer">
      <button className="randomBtn" onClick={getRandomMeal}>
        <p>RANDOM</p>
      </button>
      {status === false ? (
        <h5>Click a button to show a random meal</h5>
      ) : (
        <div className="singleContainer">
          <img className="mealImg" src={meal.strMealThumb} alt="" />
          <div className="mealName">
            <h2>{meal.strMeal}</h2>{" "}
            <Button
              disabled={dis}
              onClick={addToFav}
              variant="contained"
              style={{
                marginTop: "10px",
                backgroundColor: btnCol,
                color: "white",
              }}
              startIcon={<FavoriteIcon style={{ fontSize: "20px" }} />}
            >
              <p>Add to favorite</p>
            </Button>
          </div>
          <div className="ingredients">
            <h3>Ingredients: </h3>
            <ul>
              {newList(meal).map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="instructions">
            <h3>Instructions: </h3>
            <ul>
              {instrArray.map((instr) => (
                <li key={instr}>{instr}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Random;
