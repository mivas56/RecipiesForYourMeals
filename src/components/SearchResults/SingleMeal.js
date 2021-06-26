import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import "./SingleMeal.css";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";

function SingleMeal(props) {
  const id = props.location.state.id;
  const [meal, setMeal] = useState([]);
  const [instrArray, setInstrArray] = useState([]);
  const [dis, setDisable] = useState(false);
  const [btnCol, setBtnCol] = useState("#d62929");

  // www.themealdb.com/api/json/v1/1/lookup.php?i=${id} << Lookup with id

  // Gettin single meal with id from db
  const getSingle = async () => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return response.data.meals[0];
  };

  useEffect(() => {
    const getMeal = async () => {
      const singleMeal = await getSingle();
      if (singleMeal) setMeal(singleMeal);
    };
    getMeal();
  }, []);

  useEffect(() => {
    const storageMeals = JSON.parse(localStorage.getItem("favMeals"));
    storageMeals?.map((m) => {
      if (m.id === id) {
        setDisable(true);
        setBtnCol("gray");
      } else {
        return null;
      }
    });
  }, []);

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

  useEffect(() => {
    async function instrArr() {
      const str = await meal.strInstructions;
      const res = str ? str.split("\r\n") : str;
      if (res) setInstrArray(res);
    }
    instrArr();
  }, [meal]);

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

  removeItemAll(instrArray, " ");
  removeItemAll(instrArray, "");
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
      id: id,
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
  );
}

export default SingleMeal;
