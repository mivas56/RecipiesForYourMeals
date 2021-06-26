import React, { useState, useEffect } from "react";
import "./Categories.css";
import axios from "axios";
import SingleCategory from "./SingleCategory";

function Categories() {
  const [categories, setCategories] = useState([]);

  // Gettin all categories from db
  const getCategories = async () => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    return response.data.categories;
  };
  // Setting all categories to the ui once it is received from db
  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await getCategories();
      if (allCategories) setCategories(allCategories);
    };
    getAllCategories();
  }, []);

  return (
    <div className="categories__container">
      <h4>Search by</h4>
      <h2>Category</h2>
      <div className="categories__list">
        {categories.map((item) => (
          <SingleCategory
            key={item.idCategory}
            title={item.strCategory}
            description={item.strCategoryDescription}
            thumbnail={item.strCategoryThumb}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;
