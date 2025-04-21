// FilterSidebar.js
import React from "react";

const FilterSlideBar = ({ selectedCategory, setSelectedCategory, setSortOrder }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md w-1/4">
      <h3 className="text-lg font-bold">Filters</h3>
      <label className="block mt-4">
        Category:
        <select className="w-full p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Football">Football</option>
          <option value="Cricket">Cricket</option>
          <option value="Badminton">Badminton</option>
        </select>
      </label>
      <label className="block mt-4">
        Sort By Price:
        <select className="w-full p-2 border rounded" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </label>
    </div>
  );
};

export default FilterSlideBar;