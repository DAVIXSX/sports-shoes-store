'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Real product data based on actual sneaker images
const sampleProducts = [
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
    category: 'running',
    gender: 'men'
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSections, setLoadedSections] = useState({
    hero: false,
    bestSellers: false,
    limited: false,
    newArrivals: false,
    newsletter: false
  });

  // Simulate loading states for different sections
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadedSections(prev => ({ ...prev, hero: true })), 100),
      setTimeout(() => setLoadedSections(prev => ({ ...prev, bestSellers: true })), 500),
      setTimeout(() => setLoadedSections(prev => ({ ...prev, limited: true })), 800),
      setTimeout(() => setLoadedSections(prev => ({ ...prev, newArrivals: true })), 1100),
      setTimeout(() => setLoadedSections(prev => ({ ...prev, newsletter: true })), 1400),
      setTimeout(() => setIsLoading(false), 1600)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const sectionVariants = {
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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
  return (
    <motion.div 
      className="min-h-screen bg-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header />
      
      {/* Hero Section */}
      <motion.div variants={sectionVariants}>
        {loadedSections.hero ? (
          <HeroSection />
        ) : (
          <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <motion.div
              className="w-16 h-16 border-4 border-[var(--neon-green)] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </motion.div>
      
      {/* Best Sellers Section */}
      <motion.section 
        className="py-20 px-4"
        variants={sectionVariants}
        initial="initial"
        animate={loadedSections.bestSellers ? "animate" : "initial"}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-gradient-orange">BEST</span> SELLERS
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our most popular shoes that athletes around the world trust
            </p>
          </motion.div>
          
          <motion.div 
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="initial"
            animate={loadedSections.bestSellers ? "animate" : "initial"}
          >
            <AnimatePresence mode="wait">
              {loadedSections.bestSellers ? (
                sampleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))
              ) : (
                [1, 2, 3, 4].map((i) => (
                  <ProductSkeleton key={i} />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Limited Edition Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black"
        variants={sectionVariants}
        initial="initial"
        animate={loadedSections.limited ? "animate" : "initial"}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-gradient-green">LIMITED</span> EDITION
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Exclusive designs available for a limited time only
            </p>
          </motion.div>
          
          <motion.div 
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="initial"
            animate={loadedSections.limited ? "animate" : "initial"}
          >
            <AnimatePresence mode="wait">
              {loadedSections.limited ? (
                sampleProducts.slice(0, 3).map((product, index) => (
                  <motion.div
                    key={`limited-${product.id}`}
                    variants={itemVariants}
                    layout
                  >
                    <ProductCard {...product} isNew={true} />
                  </motion.div>
                ))
              ) : (
                [1, 2, 3].map((i) => (
                  <ProductSkeleton key={`limited-${i}`} />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>
      
      {/* New Arrivals Section */}
      <motion.section 
        className="py-20 px-4"
        variants={sectionVariants}
        initial="initial"
        animate={loadedSections.newArrivals ? "animate" : "initial"}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              NEW <span className="text-gradient-orange">ARRIVALS</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The latest innovations in athletic footwear technology
            </p>
          </motion.div>
          
          <motion.div 
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="initial"
            animate={loadedSections.newArrivals ? "animate" : "initial"}
          >
            <AnimatePresence mode="wait">
              {loadedSections.newArrivals ? (
                [...sampleProducts].reverse().map((product, index) => (
                  <motion.div
                    key={`new-${product.id}`}
                    variants={itemVariants}
                    layout
                  >
                    <ProductCard {...product} isNew={true} />
                  </motion.div>
                ))
              ) : (
                [1, 2, 3, 4].map((i) => (
                  <ProductSkeleton key={`new-${i}`} />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Newsletter Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-br from-[var(--neon-green)]/10 to-[var(--neon-orange)]/10"
        variants={sectionVariants}
        initial="initial"
        animate={loadedSections.newsletter ? "animate" : "initial"}
      >
        <div className="container mx-auto text-center">
          {loadedSections.newsletter ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                STAY IN THE <span className="text-gradient-green">GAME</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Get exclusive access to new releases, special offers, and athletic tips
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-gray-900 text-white border border-gray-700 rounded-full focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--neon-green)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--neon-green)] text-black font-bold rounded-full hover:glow-green transition-all"
                >
                  SUBSCRIBE
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="h-12 bg-gray-800 rounded w-3/4 mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-800 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-12 bg-gray-800 rounded w-96 mx-auto animate-pulse"></div>
            </div>
          )}
        </div>
      </motion.section>
      
      <Footer />
    </motion.div>
  );
}
