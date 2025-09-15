'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, ZoomIn, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

// Pre-generate static params for GitHub Pages static export
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
  ];
}

// Sample product data
const productData = {
  id: '1',
  name: 'Air Max Pro Runner',
  brand: 'Nike',
  price: 149,
  originalPrice: 199,
  rating: 4.8,
  reviews: 342,
  description: 'Experience ultimate comfort and performance with the Air Max Pro Runner. Featuring Nike\'s revolutionary Air cushioning technology, these shoes deliver exceptional energy return with every step. Perfect for runners who demand both style and substance.',
  features: [
    'Nike Air cushioning for maximum comfort',
    'Lightweight mesh upper for breathability',
    'Durable rubber outsole with traction pattern',
    'Reflective details for low-light visibility',
    'Responsive foam midsole'
  ],
  images: [
    '👟', // Placeholder - replace with actual images
    '👟',
    '👟',
    '👟',
    '👟'
  ],
  colors: [
    { name: 'Black/White', value: '#000000', image: '👟' },
    { name: 'Red/Black', value: '#ff0000', image: '👟' },
    { name: 'Blue/White', value: '#0000ff', image: '👟' },
    { name: 'Green/Black', value: '#00ff88', image: '👟' }
  ],
  sizes: [
    { size: 'US 7', available: true },
    { size: 'US 8', available: true },
    { size: 'US 9', available: true },
    { size: 'US 10', available: false },
    { size: 'US 11', available: true },
    { size: 'US 12', available: true }
  ]
};

const reviews = [
  {
    id: 1,
    name: 'Alex Johnson',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Amazing shoes! The comfort level is incredible and they look fantastic. Perfect for my daily runs.',
    verified: true
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    rating: 4,
    date: '1 month ago',
    comment: 'Great quality and style. The only minor issue is they run slightly small, so consider sizing up.',
    verified: true
  },
  {
    id: 3,
    name: 'David Chen',
    rating: 5,
    date: '2 months ago',
    comment: 'Best running shoes I\'ve ever owned. The cushioning is perfect and they\'re very durable.',
    verified: true
  }
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    console.log('Added to cart:', {
      product: productData.name,
      color: productData.colors[selectedColor].name,
      size: selectedSize,
      quantity
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden aspect-square"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-full h-full flex items-center justify-center text-9xl">
                  {productData.images[selectedImage]}
                </div>
                
                {/* Zoom Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsZoomed(true)}
                  className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-[var(--neon-green)] hover:text-black transition-colors"
                >
                  <ZoomIn className="w-6 h-6" />
                </motion.button>

                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-[var(--neon-orange)] transition-colors"
                >
                  <Heart className="w-6 h-6" />
                </motion.button>
              </motion.div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-4">
                {productData.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center text-3xl border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-[var(--neon-green)]' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {image}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <p className="text-[var(--neon-green)] font-semibold mb-2">{productData.brand}</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{productData.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(productData.rating)
                            ? 'text-[var(--neon-orange)] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">{productData.rating}</span>
                  <span className="text-gray-400">({productData.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-bold text-[var(--neon-green)]">
                    ${productData.price}
                  </span>
                  {productData.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      ${productData.originalPrice}
                    </span>
                  )}
                  {productData.originalPrice && (
                    <span className="px-3 py-1 bg-[var(--neon-orange)] text-black text-sm font-bold rounded-full">
                      SAVE ${productData.originalPrice - productData.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Color: <span className="text-[var(--neon-green)]">{productData.colors[selectedColor].name}</span>
                </h3>
                <div className="flex gap-3">
                  {productData.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full border-2 transition-colors ${
                        selectedColor === index 
                          ? 'border-[var(--neon-green)]' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {productData.sizes.map((sizeOption) => (
                    <motion.button
                      key={sizeOption.size}
                      whileHover={{ scale: sizeOption.available ? 1.05 : 1 }}
                      whileTap={{ scale: sizeOption.available ? 0.95 : 1 }}
                      onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
                      disabled={!sizeOption.available}
                      className={`py-3 px-4 rounded-xl border-2 font-medium transition-colors ${
                        selectedSize === sizeOption.size
                          ? 'border-[var(--neon-green)] bg-[var(--neon-green)] text-black'
                          : sizeOption.available
                          ? 'border-gray-600 text-white hover:border-gray-500'
                          : 'border-gray-800 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {sizeOption.size}
                      {!sizeOption.available && (
                        <span className="block text-xs">Out of Stock</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-600 rounded-xl">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 text-white hover:text-[var(--neon-green)] transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className="px-6 py-3 text-white font-medium">{quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 text-white hover:text-[var(--neon-green)] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--neon-green)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[var(--neon-green)] text-black font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:glow-green transition-all"
                >
                  <ShoppingCart className="w-6 h-6" />
                  ADD TO CART - ${productData.price * quantity}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border-2 border-[var(--neon-orange)] text-[var(--neon-orange)] font-bold text-lg rounded-xl hover:bg-[var(--neon-orange)] hover:text-black transition-colors"
                >
                  BUY NOW
                </motion.button>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 border border-gray-600 text-white rounded-xl flex items-center justify-center gap-2 hover:border-gray-500 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Truck className="w-5 h-5 text-[var(--neon-green)]" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Shield className="w-5 h-5 text-[var(--neon-green)]" />
                  <span>2-year warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <RotateCcw className="w-5 h-5 text-[var(--neon-green)]" />
                  <span>30-day free returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-20">
            <div className="border-b border-gray-800 mb-8">
              <div className="flex gap-8">
                {['description', 'features', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 font-medium capitalize transition-colors border-b-2 ${
                      activeTab === tab
                        ? 'text-[var(--neon-green)] border-[var(--neon-green)]'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl"
                >
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {productData.description}
                  </p>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl"
                >
                  <ul className="space-y-4">
                    {productData.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <div className="w-2 h-2 bg-[var(--neon-green)] rounded-full"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl space-y-8"
                >
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-800 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-orange)] rounded-full flex items-center justify-center text-black font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-semibold">{review.name}</h4>
                              {review.verified && (
                                <span className="px-2 py-1 bg-[var(--neon-green)] text-black text-xs font-bold rounded">
                                  VERIFIED
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-[var(--neon-orange)] fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="aspect-square flex items-center justify-center text-[20rem]">
                {productData.images[selectedImage]}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}