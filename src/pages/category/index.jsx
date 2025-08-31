import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.jsx';

const Category = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    env: false,
    india: false,
    fssai: false,
  });
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [slug]);

  const handleFilterChange = (badge) => {
    setFilters((prev) => ({ ...prev, [badge]: !prev[badge] }));
  };

  const handleClearFilters = () => {
    setFilters({ env: false, india: false, fssai: false });
    setSearchTerm('');
    setSortBy('default');
  };

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBadges = Object.entries(filters).every(([badge, active]) =>
      !active || product.badges.includes(badge)
    );

    return matchesSearch && matchesBadges;
  });

  // Sorting logic
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products in {slug.replace(/-/g, ' ')}</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Filters + Sorting */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Badge Filters */}
        {['env', 'india', 'fssai'].map((badge) => (
          <label key={badge} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters[badge]}
              onChange={() => handleFilterChange(badge)}
            />
            {badge === 'env' && '✅ Env-Friendly'}
            {badge === 'india' && '🇮🇳 Made in India'}
            {badge === 'fssai' && '🍴 FSSAI Certified'}
          </label>
        ))}

        {/* Sorting Dropdown */}
        <label className="flex items-center gap-2">
          Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-1"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </label>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
