'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';
import { FilterSection, SearchAndFilter } from '../../components/ProductFilters';

// Real product data based on actual sneaker images
const allProducts = [
  {
    id: '1',
    name: 'Air Force 1 Low',
    brand: 'Nike',
    price: 110,
    originalPrice: 130,
    rating: 4.8,
    reviews: 1247,
    image: '/nike-air-force-1.jpg',
    isNew: false,
    isOnSale: true,
    colors: ['#ffffff', '#000000', '#ff0000'],
    sizes: ['8', '9', '10', '11', '12'],
    category: 'lifestyle',
    gender: 'men'
  },
  {
    id: '2',
    name: 'Air Max LTD 3',
    brand: 'Nike',
    price: 85,
    originalPrice: 100,
    rating: 4.6,
    reviews: 892,
    image: '/nike-air-max-ltd-3.jpg',
    isNew: false,
    isOnSale: true,
    colors: ['#000000', '#0066ff', '#808080'],
    sizes: ['7', '8', '9', '10', '11'],
    category: 'running',
    gender: 'men'
  },
  {
    id: '3',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    rating: 4.7,
    reviews: 634,
    image: '/adidas-samba-og.jpg',
    isNew: true,
    isOnSale: false,
    colors: ['#000000', '#ffffff', '#00ff00'],
    sizes: ['8', '9', '10', '11', '12'],
    category: 'lifestyle',
    gender: 'men'
  },
  {
    id: '4',
    name: '2002R',
    brand: 'New Balance',
    price: 140,
    rating: 4.9,
    reviews: 456,
    image: '/new-balance-2002r.jpg',
    isNew: true,
    isOnSale: false,
    colors: ['#808080', '#ffffff', '#000000'],
    sizes: ['7', '8', '9', '10', '11'],
    category: 'lifestyle',
    gender: 'men'
  },
  {
    id: '5',
    name: 'Air Max Portal',
    brand: 'Nike',
    price: 75,
    originalPrice: 90,
    rating: 4.5,
    reviews: 323,
    image: '/nike-air-max-portal.jpg',
    isNew: false,
    isOnSale: true,
    colors: ['#ffffff', '#000000', '#ff6600'],
    sizes: ['8', '9', '10', '11'],
    category: 'running',
    gender: 'men'
  },
  // Additional men's variations for more content
  {
    id: '6',
    name: 'Air Force 1 Mid',
    brand: 'Nike',
    price: 120,
    rating: 4.7,
    reviews: 789,
    image: '/nike-air-force-1.jpg',
    isNew: false,
    isOnSale: false,
    colors: ['#000000', '#ffffff'],
    sizes: ['8', '9', '10', '11', '12'],
    category: 'lifestyle',
    gender: 'men'
  },
  {
    id: '7',
    name: 'Samba Classic',
    brand: 'Adidas',
    price: 80,
    originalPrice: 95,
    rating: 4.6,
    reviews: 512,
    image: '/adidas-samba-og.jpg',
    isNew: false,
    isOnSale: true,
    colors: ['#ffffff', '#000000'],
    sizes: ['7', '8', '9', '10', '11'],
    category: 'lifestyle',
    gender: 'men'
  },
  {
    id: '8',
    name: '2002R Protection Pack',
    brand: 'New Balance',
    price: 160,
    rating: 4.8,
    reviews: 234,
    image: '/new-balance-2002r.jpg',
    isNew: true,
    isOnSale: false,
    colors: ['#000000', '#808080'],
    sizes: ['8', '9', '10', '11'],
    category: 'lifestyle',
    gender: 'men'
  }
];

// Loading skeleton component
const ProductListSkeleton = ({ count = 8 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.1
        }}
      >
        <div className="aspect-square bg-gray-800 rounded-xl mb-4 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-800 rounded w-1/2 animate-pulse"></div>
          <div className="h-6 bg-gray-800 rounded w-1/3 animate-pulse"></div>
        </div>
      </motion.div>
    ))}
  </>
);

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [filters, setFilters] = useState({
    brands: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number]
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const result = allProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Brand filter
      const matchesBrand = filters.brands.length === 0 || 
                          filters.brands.includes(product.brand.toLowerCase());
      
      // Size filter
      const matchesSize = filters.sizes.length === 0 || 
                         filters.sizes.some(size => product.sizes.includes(size));
      
      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);

      return matchesSearch && matchesBrand && matchesSize && matchesPrice && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [searchTerm, sortBy, filters]);

  const brandOptions = [
    { id: 'nike', label: 'Nike', count: allProducts.filter(p => p.brand === 'Nike').length },
    { id: 'adidas', label: 'Adidas', count: allProducts.filter(p => p.brand === 'Adidas').length },
    { id: 'jordan', label: 'Jordan', count: allProducts.filter(p => p.brand === 'Jordan').length },
    { id: 'puma', label: 'Puma', count: allProducts.filter(p => p.brand === 'Puma').length },
    { id: 'new balance', label: 'New Balance', count: allProducts.filter(p => p.brand === 'New Balance').length },
    { id: 'converse', label: 'Converse', count: allProducts.filter(p => p.brand === 'Converse').length },
  ];

  const sizeOptions = [
    { id: '7', label: 'US 7' },
    { id: '8', label: 'US 8' },
    { id: '9', label: 'US 9' },
    { id: '10', label: 'US 10' },
    { id: '11', label: 'US 11' },
    { id: '12', label: 'US 12' },
  ];

  const categoryOptions = [
    { id: 'running', label: 'Running' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
              ALL <span className="text-gradient-green">PRODUCTS</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our complete collection of premium athletic footwear
            </p>
          </motion.div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 bg-gray-900 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Filters</h2>
                
                <button
                  onClick={() => setFilters({
                    brands: [],
                    sizes: [],
                    colors: [],
                    categories: [],
                    priceRange: [0, 1000]
                  })}
                  className="text-[var(--neon-orange)] hover:text-[var(--neon-green)] transition-colors font-medium mb-6"
                >
                  Clear All Filters
                </button>

                <FilterSection
                  title="Brand"
                  options={brandOptions}
                  selectedValues={filters.brands}
                  onChange={(brands) => setFilters({ ...filters, brands })}
                />

                <FilterSection
                  title="Size"
                  options={sizeOptions}
                  selectedValues={filters.sizes}
                  onChange={(sizes) => setFilters({ ...filters, sizes })}
                />

                <FilterSection
                  title="Category"
                  options={categoryOptions}
                  selectedValues={filters.categories}
                  onChange={(categories) => setFilters({ ...filters, categories })}
                />

                {/* Price Range */}
                <div className="border-b border-gray-800 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-400 mb-1">Min</label>
                        <input
                          type="number"
                          value={filters.priceRange[0]}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                          })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[var(--neon-green)]"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-400 mb-1">Max</label>
                        <input
                          type="number"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: [filters.priceRange[0], parseInt(e.target.value) || 1000]
                          })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[var(--neon-green)]"
                          placeholder="1000"
                        />
                      </div>
                    </div>
                    <div className="text-center text-gray-400 text-sm">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Filter Controls */}
              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onFilterToggle={() => setIsFilterOpen(true)}
                resultsCount={filteredAndSortedProducts.length}
              />

              {/* Products Grid */}
              <motion.div
                layout
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results */}
              {filteredAndSortedProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">😔</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}