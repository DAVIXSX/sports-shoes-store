'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  // Sneaker images data
  const sneakerImages = [
    {
      src: '/nike-air-force-1.jpg',
      name: 'Air Force 1 Low',
      brand: 'Nike',
      price: '$110'
    },
    {
      src: '/nike-air-max-ltd-3.jpg',
      name: 'Air Max LTD 3',
      brand: 'Nike',
      price: '$85'
    },
    {
      src: '/adidas-samba-og.jpg',
      name: 'Samba OG',
      brand: 'Adidas',
      price: '$100'
    },
    {
      src: '/new-balance-2002r.jpg',
      name: '2002R',
      brand: 'New Balance',
      price: '$140'
    },
    {
      src: '/nike-air-max-portal.jpg',
      name: 'Air Max Portal',
      brand: 'Nike',
      price: '$75'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % sneakerImages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [sneakerImages.length]);

  const currentShoe = sneakerImages[currentImageIndex];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-[var(--neon-green)]/20 border border-[var(--neon-green)] rounded-full mb-6"
            >
              <span className="text-[var(--neon-green)] font-semibold text-sm">LIMITED EDITION</span>
            </motion.div>

<motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">UNLEASH</span>
              <br />
              <span className="text-gradient-green">YOUR</span>
              <br />
              <span className="text-gradient-orange">SPEED</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-300 text-lg mb-8 max-w-lg"
            >
              Experience the next generation of athletic performance with our revolutionary sports shoes. 
              Engineered for champions, designed for everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--neon-green)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[var(--neon-green)] text-black px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center group"
                >
                  SHOP NOW
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center group hover:bg-white hover:text-black transition-colors"
              >
                <Play className="mr-2 w-5 h-5" />
                WATCH VIDEO
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
className="mt-12 grid grid-cols-3 gap-4 sm:gap-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--neon-green)]">50K+</div>
                <div className="text-gray-400 text-sm">Happy Athletes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--neon-orange)]">25+</div>
                <div className="text-gray-400 text-sm">Sports Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-gray-400 text-sm">Performance</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Shoe Image Container */}
            <motion.div
              animate={{ 
                rotateY: [0, 3, 0],
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
<div className="w-full h-72 sm:h-80 md:h-[420px] lg:h-[500px] bg-gradient-to-br from-[var(--neon-green)]/20 to-[var(--neon-orange)]/20 rounded-3xl relative overflow-hidden border border-gray-800/50">
                {/* Animated Shoe Images */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      rotateY: -90,
                      x: 100
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      x: 0
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      rotateY: 90,
                      x: -100
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 15,
                        rotateX: 5
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentShoe.src}
                        alt={`${currentShoe.brand} ${currentShoe.name}`}
                        fill
                        className="object-cover rounded-3xl"
                        style={{
                          filter: 'drop-shadow(0 25px 50px rgba(0, 255, 136, 0.3))'
                        }}
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Dynamic Glow Effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-[var(--neon-green)]/10 to-transparent"
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-[var(--neon-green)]/40 blur-2xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Floating Product Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${currentImageIndex}`}
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute top-4 right-4 bg-[var(--neon-orange)]/20 backdrop-blur-md border border-[var(--neon-orange)]/50 rounded-2xl p-4 z-20"
              >
                <motion.div 
                  className="text-[var(--neon-orange)] font-bold text-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEW DROP
                </motion.div>
                <div className="text-white text-xs font-medium">{currentShoe.brand}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`price-${currentImageIndex}`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute bottom-8 left-4 bg-[var(--neon-green)]/20 backdrop-blur-md border border-[var(--neon-green)]/50 rounded-2xl p-4 z-20"
              >
                <motion.div 
                  className="text-[var(--neon-green)] font-bold text-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {currentShoe.price}
                </motion.div>
                <div className="text-white text-xs font-medium">{currentShoe.name}</div>
              </motion.div>
            </AnimatePresence>

            {/* Image Indicators */}
<div className="absolute bottom-2 sm:-bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {sneakerImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-[var(--neon-green)] w-8' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[var(--neon-green)] rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;