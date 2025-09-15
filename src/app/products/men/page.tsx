'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import ProductCard from '../../../components/ProductCard';
import Footer from '../../../components/Footer';
import { FilterSection, SearchAndFilter } from '../../../components/ProductFilters';

// Men's sneaker collection based on actual images
const mensProducts = [
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
    gender: 'men',
    description: 'The classic Nike Air Force 1 Low in crisp white with black accents. A timeless basketball shoe turned street style icon.'
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
    gender: 'men',
    description: 'Nike Air Max LTD 3 combines retro style with modern comfort. Features visible Air Max cushioning for all-day wear.'
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
    gender: 'men',
    description: 'The iconic Adidas Samba OG in classic black and white. Originally designed for soccer, now a streetwear essential.'
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
    gender: 'men',
    description: 'New Balance 2002R blends Y2K aesthetics with premium materials. Features ABZORB and N-ERGY cushioning technology.'
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
    gender: 'men',
    description: 'Nike Air Max Portal offers lightweight comfort with responsive cushioning. Perfect for daily training and casual wear.'
  }
];

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
    <div className="aspect-square bg-gray-800 rounded-xl mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
      <div className="h-6 bg-gray-800 rounded w-1/3"></div>
    </div>
  </div>
);

export default function MensPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [filters, setFilters] = useState({
    brands: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    categories: [] as string[],
    priceRange: [0, 200] as [number, number]
  });

  // Simulate initial page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate product loading when filters change
  useEffect(() => {
    setIsProductsLoading(true);
    const timer = setTimeout(() => {
      setIsProductsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, sortBy, filters]);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    const result = mensProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = filters.brands.length === 0 || 
                          filters.brands.includes(product.brand.toLowerCase());
      
      const matchesSize = filters.sizes.length === 0 || 
                         filters.sizes.some(size => product.sizes.includes(size));
      
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
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

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const heroVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const productGridVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const productItemVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const brandOptions = [
    { id: 'nike', label: 'Nike', count: mensProducts.filter(p => p.brand === 'Nike').length },
    { id: 'adidas', label: 'Adidas', count: mensProducts.filter(p => p.brand === 'Adidas').length },
    { id: 'new balance', label: 'New Balance', count: mensProducts.filter(p => p.brand === 'New Balance').length },
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
    { id: 'lifestyle', label: 'Lifestyle' },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header />

      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 to-black"
        variants={heroVariants}
        initial="initial"
        animate={isLoading ? "initial" : "animate"}
      >
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center space-y-4">
              <div className="h-16 bg-gray-800 rounded w-96 mx-auto"></div>
              <div className="h-6 bg-gray-800 rounded w-64 mx-auto"></div>
            </div>
          ) : (
            <motion.div className="text-center">
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                MEN&#39;S <span className="text-gradient-green">SNEAKERS</span>
              </motion.h1>
              <motion.p 
                className="text-gray-400 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Discover our premium collection of men&#39;s athletic footwear
              </motion.p>
              <motion.div 
                className="mt-6 text-[var(--neon-orange)] font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {mensProducts.length} Premium Sneakers Available
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={isLoading ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isLoading ? (
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-20"></div>
                    <div className="h-8 bg-gray-800 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-6">Filter Men&#39;s Sneakers</h2>
                
                <button
                  onClick={() => setFilters({
                    brands: [],
                    sizes: [],
                    colors: [],
                    categories: [],
                    priceRange: [0, 200]
                  })}
                  className="text-[var(--neon-orange)] hover:text-[var(--neon-green)] transition-colors font-medium mb-6"
                >
                  Clear All Filters
                </button>

                {/* Filter sections would go here */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-3">Brand</h3>
                    {brandOptions.map(brand => (
                      <label key={brand.id} className="flex items-center space-x-2 text-gray-300 mb-2">
                        <input 
                          type="checkbox" 
                          className="rounded bg-gray-800 border-gray-600"
                          checked={filters.brands.includes(brand.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, brands: [...prev.brands, brand.id] }));
                            } else {
                              setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand.id) }));
                            }
                          }}
                        />
                        <span>{brand.label} ({brand.count})</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-3">Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {sizeOptions.map(size => (
                        <button
                          key={size.id}
                          onClick={() => {
                            if (filters.sizes.includes(size.id)) {
                              setFilters(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size.id) }));
                            } else {
                              setFilters(prev => ({ ...prev, sizes: [...prev.sizes, size.id] }));
                            }
                          }}
                          className={`p-2 rounded border text-sm font-medium transition-colors ${
                            filters.sizes.includes(size.id)
                              ? 'bg-[var(--neon-green)] text-black border-[var(--neon-green)]'
                              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-3">Category</h3>
                    {categoryOptions.map(category => (
                      <label key={category.id} className="flex items-center space-x-2 text-gray-300 mb-2">
                        <input 
                          type="checkbox" 
                          className="rounded bg-gray-800 border-gray-600"
                          checked={filters.categories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, categories: [...prev.categories, category.id] }));
                            } else {
                              setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category.id) }));
                            }
                          }}
                        />
                        <span>{category.label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-3">Price Range</h3>
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
                              priceRange: [filters.priceRange[0], parseInt(e.target.value) || 200]
                            })}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[var(--neon-green)]"
                            placeholder="200"
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
            )}
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={isLoading ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isLoading ? (
              <div className="space-y-6">
                <div className="h-12 bg-gray-800 rounded"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Search and Sort */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 max-w-md">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search men&#39;s sneakers..."
                        className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)]"
                      >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="popular">Most Popular</option>
                      </select>
                    </div>
                  </div>
                    <div className="mt-4 text-gray-400">
                    Showing {filteredProducts.length} of {mensProducts.length} men&#39;s sneakers
                  </div>
                </div>

                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={productGridVariants}
                  initial="initial"
                  animate="animate"
                >
                  <AnimatePresence mode="wait">
                    {isProductsLoading ? (
                      [1, 2, 3, 4, 5, 6].map((i) => (
                        <ProductSkeleton key={`skeleton-${i}`} />
                      ))
                    ) : filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          variants={productItemVariants}
                          layout
                          transition={{ delay: index * 0.03 }}
                        >
                          <ProductCard {...product} />
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        className="col-span-full text-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-6xl mb-4">👟</div>
                        <h3 className="text-xl font-bold text-white mb-2">No men&#39;s sneakers found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search terms</p>
                        <motion.button
                          onClick={() => {
                            setSearchTerm('');
                            setFilters({
                              brands: [],
                              sizes: [],
                              colors: [],
                              categories: [],
                              priceRange: [0, 200]
                            });
                          }}
                          className="mt-4 px-6 py-2 bg-[var(--neon-green)] text-black font-bold rounded-lg hover:glow-green transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Clear All Filters
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}