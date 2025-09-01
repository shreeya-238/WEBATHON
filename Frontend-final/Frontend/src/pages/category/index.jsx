import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/productcard';

const Category = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Mock products data for consumer empowerment platform - this will be replaced by backend data later
  const mockProducts = {
    'food-beverages': [
      { name: 'Organic Apples - Brand A', price: 120, rating: 4.5, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', badge: 'FSSAI Certified', discount: 10, safetyScore: 95 },
      { name: 'Fresh Tomatoes - Brand B', price: 40, rating: 4.2, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop', badge: 'Pesticide Free', safetyScore: 88 },
      { name: 'Organic Spinach - Brand C', price: 60, rating: 4.7, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop', badge: 'Organic Certified', safetyScore: 92 },
      { name: 'Fresh Carrots - Brand D', price: 35, rating: 4.1, image: 'https://images.unsplash.com/photo-1447175008436-170170724a28?w=400&h=400&fit=crop', badge: 'Quality Tested', safetyScore: 85 },
      { name: 'Organic Bananas - Brand E', price: 80, rating: 4.4, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop', badge: 'Organic Certified', discount: 15, safetyScore: 90 },
      { name: 'Fresh Onions - Brand F', price: 25, rating: 4.0, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop', badge: 'Quality Assured', safetyScore: 82 },
    ],
    'health-wellness': [
      { name: 'Vitamin C Supplements - Brand A', price: 450, rating: 4.6, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop', badge: 'FSSAI Approved', safetyScore: 94 },
      { name: 'Protein Powder - Brand B', price: 1200, rating: 4.3, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', badge: 'Lab Tested', safetyScore: 89 },
      { name: 'Omega-3 Capsules - Brand C', price: 850, rating: 4.8, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop', badge: 'USP Verified', safetyScore: 96 },
      { name: 'Probiotics - Brand D', price: 650, rating: 4.5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop', badge: 'Clinical Proven', safetyScore: 91 },
      { name: 'Multivitamin - Brand E', price: 750, rating: 4.2, image: 'https://images.unsplash.com/photo-1548907040-4baa9d7e7f8b?w=400&h=400&fit=crop', badge: 'GMP Certified', safetyScore: 87 },
      { name: 'Iron Supplements - Brand F', price: 550, rating: 4.4, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop', badge: 'Doctor Recommended', safetyScore: 93 },
    ],
    'electronics-tech': [
      { name: 'Smartphone - Brand A', price: 25000, rating: 4.6, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', badge: 'BIS Certified', safetyScore: 92 },
      { name: 'Laptop - Brand B', price: 45000, rating: 4.7, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', badge: 'Energy Star', safetyScore: 94 },
      { name: 'Wireless Earbuds - Brand C', price: 3500, rating: 4.3, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'Bluetooth Certified', safetyScore: 88 },
      { name: 'Power Bank - Brand D', price: 1200, rating: 4.4, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'CE Marked', safetyScore: 85 },
      { name: 'Smart Watch - Brand E', price: 8500, rating: 4.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', badge: 'Water Resistant', safetyScore: 90 },
      { name: 'Tablet - Brand F', price: 18000, rating: 4.2, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'BIS Certified', discount: 20, safetyScore: 87 },
    ],
    'home-lifestyle': [
      { name: 'Air Purifier - Brand A', price: 8500, rating: 4.6, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'HEPA Filter', safetyScore: 93 },
      { name: 'Water Filter - Brand B', price: 3200, rating: 4.8, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400&h=400&fit=crop', badge: 'NSF Certified', safetyScore: 96 },
      { name: 'Kitchen Appliances Set - Brand C', price: 12500, rating: 4.5, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'ISI Marked', safetyScore: 89 },
      { name: 'Bedding Set - Brand D', price: 4500, rating: 4.4, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400&h=400&fit=crop', badge: 'OEKO-TEX Certified', safetyScore: 91 },
      { name: 'Furniture - Brand E', price: 18000, rating: 4.3, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'FSC Certified', safetyScore: 87 },
      { name: 'Lighting Solutions - Brand F', price: 2800, rating: 4.7, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400&h=400&fit=crop', badge: 'Energy Efficient', discount: 15, safetyScore: 94 },
    ],
    'beauty-personal-care': [
      { name: 'Face Cream - Brand A', price: 850, rating: 4.6, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'Dermatologist Tested', safetyScore: 92 },
      { name: 'Shampoo - Brand B', price: 450, rating: 4.4, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'Sulfate Free', safetyScore: 88 },
      { name: 'Sunscreen - Brand C', price: 650, rating: 4.7, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'SPF 50+', safetyScore: 95 },
      { name: 'Toothpaste - Brand D', price: 180, rating: 4.3, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'ADA Approved', safetyScore: 90 },
      { name: 'Lipstick - Brand E', price: 750, rating: 4.5, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'Lead Free', safetyScore: 93 },
      { name: 'Perfume - Brand F', price: 1200, rating: 4.2, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'Phthalate Free', discount: 10, safetyScore: 87 },
    ],
    'automotive-transport': [
      { name: 'Car Air Freshener - Brand A', price: 280, rating: 4.6, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'Non-Toxic', safetyScore: 89 },
      { name: 'Car Seat Cover - Brand B', price: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400&h=400&fit=crop', badge: 'Fire Retardant', safetyScore: 94 },
      { name: 'Motor Oil - Brand C', price: 450, rating: 4.5, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'API Certified', safetyScore: 91 },
      { name: 'Tire - Brand D', price: 3200, rating: 4.4, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400&h=400&fit=crop', badge: 'DOT Approved', safetyScore: 93 },
      { name: 'Brake Pads - Brand E', price: 850, rating: 4.3, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'OE Quality', safetyScore: 87 },
      { name: 'Car Battery - Brand F', price: 5800, rating: 4.7, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400&h=400&fit=crop', badge: 'BIS Certified', discount: 15, safetyScore: 96 },
    ],
    'financial-services': [
      { name: 'Health Insurance - Brand A', price: 8500, rating: 4.6, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'IRDAI Approved', safetyScore: 94 },
      { name: 'Investment Plan - Brand B', price: 12000, rating: 4.4, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'SEBI Registered', safetyScore: 91 },
      { name: 'Credit Card - Brand C', price: 2500, rating: 4.7, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'RBI Compliant', safetyScore: 95 },
      { name: 'Loan Service - Brand D', price: 1800, rating: 4.3, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'NBFC Licensed', safetyScore: 88 },
      { name: 'Mutual Fund - Brand E', price: 5000, rating: 4.5, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'AMFI Registered', safetyScore: 92 },
      { name: 'Banking Service - Brand F', price: 3500, rating: 4.2, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', badge: 'RBI Licensed', discount: 20, safetyScore: 89 },
    ],
    'education-learning': [
      { name: 'Online Course - Brand A', price: 2800, rating: 4.6, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', badge: 'UGC Approved', safetyScore: 93 },
      { name: 'Study Material - Brand B', price: 450, rating: 4.4, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', badge: 'Quality Assured', safetyScore: 89 },
      { name: 'Tutoring Service - Brand C', price: 1200, rating: 4.7, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', badge: 'Verified Tutors', safetyScore: 95 },
      { name: 'Skill Development - Brand D', price: 850, rating: 4.3, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', badge: 'Industry Certified', safetyScore: 87 },
      { name: 'Language Learning - Brand E', price: 1800, rating: 4.5, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', badge: 'Native Speakers', safetyScore: 91 },
      { name: 'Test Preparation - Brand F', price: 2200, rating: 4.2, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', badge: 'Success Guarantee', discount: 15, safetyScore: 88 },
    ],
    'travel-tourism': [
      { name: 'Hotel Booking - Brand A', price: 4500, rating: 4.6, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop', badge: 'Safety Certified', safetyScore: 92 },
      { name: 'Flight Tickets - Brand B', price: 8500, rating: 4.4, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', badge: 'DGCA Approved', safetyScore: 94 },
      { name: 'Tour Package - Brand C', price: 12500, rating: 4.7, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop', badge: 'Government Approved', safetyScore: 96 },
      { name: 'Car Rental - Brand D', price: 2800, rating: 4.3, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop', badge: 'Insurance Included', safetyScore: 89 },
      { name: 'Travel Insurance - Brand E', price: 850, rating: 4.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', badge: 'Comprehensive Cover', safetyScore: 93 },
      { name: 'Adventure Sports - Brand F', price: 3500, rating: 4.2, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop', badge: 'Safety Equipment', discount: 25, safetyScore: 87 },
    ],
    'all-categories': [
      { name: 'Organic Apples - Brand A', price: 120, rating: 4.5, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', badge: 'FSSAI Certified', discount: 10, safetyScore: 95 },
      { name: 'Vitamin C Supplements - Brand B', price: 450, rating: 4.6, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop', badge: 'FSSAI Approved', safetyScore: 94 },
      { name: 'Smartphone - Brand C', price: 25000, rating: 4.6, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', badge: 'BIS Certified', safetyScore: 92 },
      { name: 'Air Purifier - Brand D', price: 8500, rating: 4.6, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'HEPA Filter', safetyScore: 93 },
      { name: 'Face Cream - Brand E', price: 850, rating: 4.6, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'Dermatologist Tested', safetyScore: 92 },
      { name: 'Car Air Freshener - Brand F', price: 280, rating: 4.6, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', badge: 'Non-Toxic', safetyScore: 89 },
      { name: 'Health Insurance - Brand G', price: 8500, rating: 4.6, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400&h=400&fit=crop', badge: 'IRDAI Approved', safetyScore: 94 },
      { name: 'Online Course - Brand H', price: 2800, rating: 4.6, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', badge: 'UGC Approved', safetyScore: 93 },
    ]
  };

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const categoryProducts = mockProducts[slug] || [];
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
        setLoading(false);
    }, 500);
  }, [slug]);

  useEffect(() => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'safety':
          return b.safetyScore - a.safetyScore;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, priceRange]);

  const getCategoryName = (slug) => {
    const categoryMap = {
      'food-beverages': 'Food & Beverages',
      'health-wellness': 'Health & Wellness',
      'electronics-tech': 'Electronics & Tech',
      'home-lifestyle': 'Home & Lifestyle',
      'beauty-personal-care': 'Beauty & Personal Care',
      'automotive-transport': 'Automotive & Transport',
      'financial-services': 'Financial Services',
      'education-learning': 'Education & Learning',
      'travel-tourism': 'Travel & Tourism',
      'all-categories': 'All Categories'
    };
    return categoryMap[slug] || slug;
  };

  // Native sharing functionality for category pages
  const handleShareCategory = async () => {
    const categoryName = getCategoryName(slug);
    const shareData = {
      title: `${categoryName} - TrustTag`,
      text: `Discover trustworthy ${categoryName.toLowerCase()} products on TrustTag! Read reviews, check safety scores, and make informed decisions.`,
      url: window.location.href, // Current category page URL
    };

    try {
      // Check if native sharing is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Category link copied to clipboard! Share it with your friends.');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Category link copied to clipboard! Share it with your friends.');
      } catch (clipboardError) {
        // Final fallback: show the URL
        alert(`Share this category link: ${window.location.href}`);
      }
    }
  };

  if (!slug) {
    return <div className="p-6">Loading category...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{getCategoryName(slug)}</span>
            </nav>
            
            {/* Category Title and Share Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  {getCategoryName(slug)}
                </h1>
                <p className="text-gray-600 mt-2">
                  {filteredProducts.length} trustworthy products available with safety scores and reviews
                </p>
              </div>
              
              {/* Share Category Button */}
              <button
                onClick={handleShareCategory}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 group"
                title={`Share ${getCategoryName(slug)} category`}
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Category
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
      <input
        type="text"
                  placeholder="Search products, brands, or reviews..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
                <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
                <option value="safety">Sort by Safety Score</option>
          </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={`${priceRange.min}-${priceRange.max}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  setPriceRange({ min, max });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="0-100000">All Prices</option>
                <option value="0-500">Under ₹500</option>
                <option value="500-2000">₹500 - ₹2000</option>
                <option value="2000-10000">₹2000 - ₹10000</option>
                <option value="10000-100000">Above ₹10000</option>
              </select>
            </div>
          </div>
      </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Category;
