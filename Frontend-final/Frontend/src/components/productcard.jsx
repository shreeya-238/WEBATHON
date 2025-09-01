import React from 'react';

const ProductCard = ({ product }) => {
  const { name, price, rating, image, badge, discount, safetyScore } = product;

  // Get safety score color based on score
  const getSafetyColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Get safety level text
  const getSafetyLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {badge}
            </span>
          </div>
        )}
        
        {/* Discount */}
        {discount && (
          <div className="absolute top-2 right-2">
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          </div>
        )}
        
        {/* Safety Score Badge */}
        {safetyScore && (
          <div className="absolute bottom-2 left-2">
            <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${getSafetyColor(safetyScore)}`}>
              Safety: {safetyScore}
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors" title="Report Issue">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
          {name}
        </h3>
        
        {/* Safety Score and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">({rating})</span>
          </div>
          
          {/* Safety Level */}
          {safetyScore && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(safetyScore)}`}>
              {getSafetyLevel(safetyScore)}
            </div>
          )}
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">₹{price}</span>
            {discount && (
              <span className="text-sm text-gray-500 line-through">₹{Math.round(price * (1 + discount / 100))}</span>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95">
            Read Reviews
          </button>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95">
            Report Issue
          </button>
        </div>
        
        {/* Safety Score Bar */}
        {safetyScore && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Safety Score</span>
              <span>{safetyScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  safetyScore >= 90 ? 'bg-green-500' : 
                  safetyScore >= 80 ? 'bg-blue-500' : 
                  safetyScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${safetyScore}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
