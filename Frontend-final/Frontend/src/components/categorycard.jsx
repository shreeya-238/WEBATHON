import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, icon, description }) => {
  // Convert category name to slug for routing
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <Link to={`/category/${slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 h-full border border-gray-100 hover:border-green-200">
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center group-hover:from-green-100 group-hover:to-emerald-200 transition-all duration-300">
            <span className="text-2xl sm:text-3xl">{icon}</span>
          </div>
          
          {/* Category Name */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
          
          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
            {description}
          </p>
          
          {/* Arrow Icon */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
