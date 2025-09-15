'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Home,
  Grid3x3,
  Zap,
  Heart,
  Baby,
  Percent,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'All Products', href: '/products', icon: Grid3x3 },
    { name: 'Men', href: '/products?category=men', icon: Zap },
    { name: 'Women', href: '/products?category=women', icon: Heart },
    { name: 'Kids', href: '/products?category=kids', icon: Baby },
    { name: 'Sale', href: '/products?sale=true', icon: Percent },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

return (
<header className="fixed top-0 left-0 right-0 z-50 header-surface border-b border-gray-800 gpu-hint">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-orange)] rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-black" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient-green">
              SneakPeak
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
className="group relative px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-800/50"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-[var(--neon-green)] transition-colors" />
                      </motion.div>
                      <span className="text-white group-hover:text-[var(--neon-green)] transition-colors duration-300 font-medium">
                        {item.name}
                      </span>
                    </div>
                    {/* Hover effect line */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-orange)] rounded-full"
                      whileHover={{ width: '80%', x: '-40%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
className="hidden md:flex items-center bg-gray-900/80 rounded-full px-4 py-2 w-80 border border-gray-700 hover:border-[var(--neon-green)]/50 transition-colors duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="text-gray-400 w-5 h-5 mr-3" />
            </motion.div>
            <input
              type="text"
              placeholder="Search for shoes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
className="relative p-3 text-white hover:text-[var(--neon-green)] transition-colors duration-300 rounded-full hover:bg-gray-800/50 group"
              >
                <User className="w-6 h-6" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[var(--neon-green)]/30"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
            
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
className="relative p-3 text-white hover:text-[var(--neon-orange)] transition-colors duration-300 rounded-full hover:bg-gray-800/50 group"
              >
                <ShoppingCart className="w-6 h-6" />
                <motion.span 
                  className="absolute -top-1 -right-1 bg-[var(--neon-orange)] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  3
                </motion.span>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[var(--neon-orange)]/30"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-3 text-white hover:text-[var(--neon-green)] transition-colors rounded-full hover:bg-gray-800/50"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Search */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
className="md:hidden mt-4 flex items-center bg-gray-900/80 rounded-full px-4 py-2 border border-gray-700"
        >
          <Search className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            placeholder="Search for shoes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
          />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gradient-to-br from-black to-gray-900 border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 py-3 text-white hover:text-[var(--neon-green)] transition-colors border-b border-gray-800 last:border-b-0 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-full bg-gray-800 group-hover:bg-[var(--neon-green)]/20 transition-colors"
                      >
                        <Icon className="w-5 h-5 group-hover:text-[var(--neon-green)] transition-colors" />
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                      {item.name === 'Sale' && (
                        <motion.span 
                          className="text-xs px-2 py-1 bg-[var(--neon-orange)] text-black rounded-full font-bold"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          HOT
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;