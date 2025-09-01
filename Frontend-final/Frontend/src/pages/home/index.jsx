import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../../components/categorycard';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
  ];

  const categories = [
    { name: 'Food & Beverages', icon: '🍎', description: 'Discover safe and authentic food products' },
    { name: 'Health & Wellness', icon: '💊', description: 'Quality healthcare and wellness products' },
    { name: 'Electronics & Tech', icon: '📱', description: 'Safe and reliable technology products' },
    { name: 'Home & Lifestyle', icon: '🏠', description: 'Trusted household and lifestyle items' },
    { name: 'Beauty & Personal Care', icon: '💄', description: 'Authentic beauty and care products' },
    { name: 'Automotive & Transport', icon: '🚗', description: 'Reliable automotive products and services' },
    { name: 'Financial Services', icon: '💰', description: 'Trusted financial products and services' },
    { name: 'Education & Learning', icon: '📚', description: 'Quality educational resources and tools' },
    { name: 'Travel & Tourism', icon: '✈️', description: 'Safe travel services and accommodations' },
    { name: 'All Categories', icon: '🔍', description: 'Browse all product categories' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Native sharing functionality
  const handleShare = async () => {
    const shareData = {
      title: 'TrustTag - Your Consumer Empowerment Platform',
      text: 'Discover trustworthy products, share reviews, and access intelligent insights for consumer safety and quality. Join TrustTag today!',
      url: window.location.origin, // Current website URL
    };

    try {
      // Check if native sharing is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.origin);
        alert('Link copied to clipboard! Share it with your friends.');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin);
        alert('Link copied to clipboard! Share it with your friends.');
      } catch (clipboardError) {
        // Final fallback: show the URL
        alert(`Share this link: ${window.location.origin}`);
      }
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-4 sm:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 text-white rounded-lg p-2">
                <span className="text-xl font-bold">T</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TrustTag</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-4 sm:mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search products, brands, or reviews..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg group"
                title="Share TrustTag"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>

              {/* User Account Dropdown */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">Account Options</p>
                  </div>
                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Consumer</p>
                    <Link to="/auth/consumer-login" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                      Consumer Login
                    </Link>
                    <Link to="/auth/consumer-signup" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                      Consumer Signup
                    </Link>
                  </div>
                  <div className="px-4 py-2 border-t">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Business</p>
                    <Link to="/auth/company-login" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                      Company Login
                    </Link>
                    <Link to="/auth/company-signup" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                      Company Signup
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Carousel */}
        <div className="relative mb-12 overflow-hidden rounded-xl shadow-lg">
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Carousel ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          
          {/* Carousel Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          {/* Previous/Next Buttons */}
          <button
            onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Product Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover trustworthy products across all categories. Read reviews, share experiences, and make informed decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                icon={category.icon}
                description={category.description}
              />
            ))}
          </div>
        </section>

        {/* Why Choose TrustTag Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose TrustTag?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just a product directory—we're your proactive watchdog for consumer well-being, powered by AI and machine learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">Machine learning algorithms analyze patterns and predict risks for your safety.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600">Access real-time regulatory data and compliance information for products.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community-Driven</h3>
              <p className="text-gray-600">Share reviews, complaints, and experiences to help others make informed decisions.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how TrustTag empowers consumers with intelligent insights and proactive protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ML Clustering Analysis</h3>
                  <p className="text-gray-600">Advanced algorithms identify patterns and group similar products for better comparison and risk assessment.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">LLM Summarization</h3>
                  <p className="text-gray-600">AI-powered summaries of reviews, complaints, and regulatory data for quick insights.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Prediction</h3>
                  <p className="text-gray-600">Proactive identification of potential safety, quality, and authenticity risks in products.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
                  <p className="text-gray-600">Comprehensive analytics highlighting safety, quality, and authenticity metrics for informed decision-making.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About TrustTag</h4>
              <p className="text-sm text-gray-300 mb-4">
                Your consumer empowerment platform powered by AI and machine learning. Discover trustworthy products, share experiences, and access intelligent insights for consumer safety and quality.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/category/all-categories" className="hover:text-white transition-colors">All Categories</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Issues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Admin</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/auth/admin-login" className="hover:text-white transition-colors">Admin Login</Link></li>
                <li><Link to="/auth/admin-signup" className="hover:text-white transition-colors">Admin Signup</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 TrustTag. Empowering consumers through intelligent insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
