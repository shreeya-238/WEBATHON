import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect for carousel logic
import SharePopup from '../../components/SharePopup.jsx'; // Import the new SharePopup component

// Import carousel images
import banner1 from '../../../images/landing page/Banners E-commerce Website.jpeg';
import banner3 from '../../../images/landing page/download (1).jpeg';
import banner5 from '../../../images/landing page/image.png';
import banner6 from '../../../images/landing page/image2.png';
import banner7 from '../../../images/landing page/Organic & Vegan Bakery Landing Page Design for a Healthy 2025.jpeg';
import banner8 from '../../../images/landing page/Organic Beauty_ Shop Natural Cosmetics 2025.jpeg';
import banner9 from '../../../images/landing page/Wordpress website.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    banner1,
    banner3,
    banner5,
    banner6,
    banner7,
    banner8,
    banner9,
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(slideInterval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const [showSearchInput, setShowSearchInput] = useState(false); // New state for search input visibility
  const [showSharePopup, setShowSharePopup] = useState(false); // New state for share popup visibility

  const handleSearchToggle = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
  };

  const categories = [
    { 
      name: 'Mobiles & Electronics', 
      slug: 'mobiles-electronics', 
      icon: '📱',
      description: 'Latest smartphones, laptops, and gadgets'
    },
    { 
      name: 'Groceries & Pet Supplies', 
      slug: 'groceries-pet-supplies', 
      icon: '🛒',
      description: 'Fresh groceries and pet essentials'
    },
    { 
      name: 'Fashion & Beauty', 
      slug: 'fashion-beauty', 
      icon: '👗',
      description: 'Trendy fashion and beauty products'
    },
    { 
      name: 'Pharmacy & Household', 
      slug: 'pharmacy-household', 
      icon: '💊',
      description: 'Healthcare and household items'
    },
    { 
      name: 'Home & Furniture', 
      slug: 'home-furniture', 
      icon: '🏠',
      description: 'Furniture and home decor'
    },
    { 
      name: 'Toys & Kids', 
      slug: 'toys-kids', 
      icon: '🧸',
      description: 'Toys and children products'
    },
    { 
      name: 'Business Purchases', 
      slug: 'business-purchases', 
      icon: '💼',
      description: 'Business and office supplies'
    },
    { 
      name: 'Sports & Fitness', 
      slug: 'sports-fitness', 
      icon: '⚽',
      description: 'Sports equipment and fitness gear'
    },
    { 
      name: 'Books & Education', 
      slug: 'books-education', 
      icon: '📚',
      description: 'Books and educational materials'
    }
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            {/* Logo on left */}
            <div className="text-xl sm:text-2xl font-bold text-gray-900 order-1 sm:order-none">
              YourLogo
            </div>
            
            {/* Right side: Search, Account, Share */}
            <div className="flex items-center space-x-4 sm:space-x-8 order-2 sm:order-none">
              {/* Search Icon */}
              <button onClick={handleSearchToggle} className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Search</span>
              </button>

              {/* Search Input (conditionally rendered) */}
              {showSearchInput && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-48 pl-4 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
              )}

              <Link to="/login" className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Account</span>
              </Link>
              
              <button onClick={handleShareClick} className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Carousel Section - Replaces Hero Section */}
      <section className="relative w-full overflow-hidden mb-12 sm:mb-16 lg:mb-20">
        <div className="flex transition-transform ease-out duration-500"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#10095;
        </button>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Remove the original Hero Section content */}
        {/* <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="mb-6 sm:mb-8">
            <svg className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Discover Products You Can Trust
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Explore our curated collection of high-quality products across all categories
          </p>
        </div> */}

        {/* Categories Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20">
          {categories.map((category, index) => (
            <div 
              key={category.slug}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">{category.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className="w-full sm:w-auto bg-gray-100 text-gray-800 font-medium py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Explore {category.name}
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>

        {/* Bottom CTA */}
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Ready to Start Shopping?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us for quality products
          </p>
          <Link 
            to="/login"
            className="w-full sm:w-auto bg-gray-100 text-gray-800 font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base block mx-auto max-w-xs"
          >
            Get Started Today
          </Link>
        </div>
      </main>

      {/* Footer / Admin Login Link */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500 border-t border-gray-200 mt-12">
        <Link to="/admin/login" className="hover:text-blue-600 transition-colors">Admin Login</Link>
      </footer>

      {/* Share Popup */}
      {showSharePopup && (
        <SharePopup
          isOpen={showSharePopup}
          onClose={handleCloseSharePopup}
          shareUrl={window.location.href}
          shareTitle="Check out weabthon!"
          shareText="Discover amazing products on weabthon - your new favorite e-commerce platform."
        />
      )}
    </div>
  );
};

export default Home;
