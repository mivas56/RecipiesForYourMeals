import React from "react";
import "./SingleCategory.css";
import { Link } from "react-router-dom";

function SingleCategory({ title, description, thumbnail }) {
  // Removing [1] from description, it looked bad
  let newDescription = description.replace("[1]", "");

  return (
    <div className="categoryCard">
      <Link
        to={{
          pathname: `/searchcategory/${title}`,
          state: { category: title },
        }}
        style={{ textDecoration: "none", color: "#202020" }}
      >
        <h3>{title}</h3>
        <img className="categoryImg" src={thumbnail} alt="img" />

        <p className="categoryDescription">
          {newDescription.length > 100
            ? newDescription.substring(0, 97) + "..."
            : description}
        </p>
      </Link>
    </div>
  );
}

export default SingleCategory;
