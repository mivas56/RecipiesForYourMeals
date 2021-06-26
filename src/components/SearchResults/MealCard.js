import React from "react";
import "./MealCard.css";
import { Link } from "react-router-dom";

function MealCard({ id, mealName, thumb }) {
  return (
    <div className="mealCard">
      <Link
        to={{
          pathname: `/singlemeal/${id}`,
          state: { id: id },
        }}
        style={{
          textDecoration: "none",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <div className="info">
          {mealName.length > 20 ? mealName.substring(0, 17) + "..." : mealName}
        </div>
        <img className="mealThumbnail" src={thumb} alt="strMealThumb" />
      </Link>
    </div>
  );
}

export default MealCard;
