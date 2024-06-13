import PropTypes from "prop-types";
import { useState } from "react";
const Categories = ({ categories, handleCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleClick = (category) => {
    setActiveCategory(category);
    handleCategoryClick(category);
  };
  return (
    <div className="w-full mb-5 rounded-lg">
      <h1 className="font-bold">Category</h1>
      <ul className="flex gap-4 mt-2">
        <li
          className={`text-sm py-3 px-6 rounded-full ${
            activeCategory === "All"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-900 hover:bg-green-300"
          } cursor-pointer`}
          onClick={() => handleClick("All")}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`text-sm py-3 px-6 rounded-full ${
              activeCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-900 hover:bg-green-300"
            } cursor-pointer`}
            onClick={() => handleClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

// Define PropTypes for Categories component
Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};
