import React from 'react';

const CategoryCard = ({ name, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded p-4 text-center cursor-pointer hover:bg-blue-50"
      onClick={onClick}
    >
      <h2 className="text-lg font-medium">{name}</h2>
    </div>
  );
};

export default CategoryCard;
