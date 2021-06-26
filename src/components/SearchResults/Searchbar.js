import React, { useState } from "react";
import "./Searchbar.css";
import { useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

function Searchbar() {
  const [mealName, setMealName] = useState("");
  let history = useHistory();

  // Handling form submition
  function handleClick(e) {
    e.preventDefault();
    if (mealName.length === 0) {
      alert("please enter value");
    } else {
      history.push({
        pathname: `/searchresult/${mealName}`,
        state: { name: mealName },
      });
      setMealName("");
    }
  }
  //Getting value from input
  function getValue(val) {
    setMealName(val.target.value);
  }
  return (
    <form className="searchbar" onSubmit={handleClick}>
      <input
        type="text"
        placeholder="search recipies.."
        onChange={getValue}
        value={mealName}
      />

      <SearchIcon
        onClick={handleClick}
        style={{
          fontSize: "3vh",
          color: "#ffff",
          padding: "1vh",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          backgroundColor: "#d62929",
        }}
      />
    </form>
  );
}

export default Searchbar;
