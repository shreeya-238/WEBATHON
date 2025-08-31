import React from 'react';

const ProductCard = ({ product }) => {
  const { name, description, price, rating, badges, image } = product;

  // Generate random review count for demo purposes
  const reviewCount = Math.floor(Math.random() * 2000) + 100;

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
        
        {/* Rating with review count */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
        
        {/* Price */}
        <div className="mb-3">
          <span className="font-bold text-lg text-green-600">₹{price}</span>
        </div>

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.includes('env') && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                ✅ Env-Friendly
              </span>
            )}
            {badges.includes('india') && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                🇮🇳 Made in India
              </span>
            )}
            {badges.includes('fssai') && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                🍴 FSSAI Certified
              </span>
            )}
            {badges.includes('ethically-sourced') && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                🌱 Ethically Sourced
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
