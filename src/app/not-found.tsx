'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-8xl lg:text-9xl font-bold text-gradient-green mb-4">404</div>
            <div className="text-6xl mb-6">👟💨</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Oops! This page ran away
            </h1>
            <p className="text-gray-400 text-lg">
              Looks like this page laced up and sprinted off. 
              But don&#39;t worry, we&#39;ll help you find your way back to the action!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--neon-green)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--neon-green)] text-black px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:glow-green transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>

            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[var(--neon-orange)] text-[var(--neon-orange)] px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-[var(--neon-orange)] hover:text-black transition-colors"
              >
                <Search className="w-5 h-5" />
                Browse Products
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12"
          >
            <p className="text-gray-500 text-sm">
              Error Code: 404 - Page Not Found
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}