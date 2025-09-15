'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Minus, 
  Plus, 
  X, 
  ShoppingBag, 
  Truck, 
  Shield, 
  RotateCcw, 
  Tag,
  ArrowRight,
  CreditCard,
  Lock
} from 'lucide-react';
import Link from 'next/link';

// Real cart data based on actual sneaker images
const initialCartItems = [
  {
    id: '1',
    name: 'Air Force 1 Low',
    brand: 'Nike',
    price: 110,
    originalPrice: 130,
    quantity: 1,
    size: '10',
    color: 'White/Black',
    image: '/nike-air-force-1.jpg',
    isOnSale: true
  },
  {
    id: '3',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    quantity: 2,
    size: '9',
    color: 'Core Black/White',
    image: '/adidas-samba-og.jpg',
    isOnSale: false
  },
  {
    id: '4',
    name: '2002R',
    brand: 'New Balance',
    price: 140,
    quantity: 1,
    size: '11',
    color: 'Grey/White',
    image: '/new-balance-2002r.jpg',
    isOnSale: false
  }
];

// Loading skeleton component
const CartItemSkeleton = () => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
    <div className="flex space-x-4">
      <div className="w-24 h-24 bg-gray-700 rounded-lg"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
        <div className="flex justify-between items-end mt-4">
          <div className="h-6 bg-gray-700 rounded w-20"></div>
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const heroVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const summaryVariants = {
    initial: { 
      opacity: 0, 
      x: 30,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const trustBadgeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const discountAmount = subtotal * discount;
  const total = subtotal + shipping + tax - discountAmount;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    // Simple promo code logic
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.10);
      setIsPromoApplied(true);
    } else if (promoCode.toLowerCase() === 'save20') {
      setDiscount(0.20);
      setIsPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  if (cartItems.length === 0 && !isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-black"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <Header />
        
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <motion.div 
                className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingBag className="w-12 h-12 text-gray-500" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
              <p className="text-gray-400 mb-8">
                Looks like you haven&#39;t added any shoes to your cart yet.
              </p>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--neon-green)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--neon-green)] text-black font-bold rounded-full hover:glow-green transition-all"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <Footer />
      </motion.div>
    );
  }

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
        animate="animate"
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SHOPPING <span className="text-gradient-orange">CART</span>
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Review your selected items before checkout
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Cart Items ({isLoading ? '...' : cartItems.length})
                </h2>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[var(--neon-green)] hover:text-white transition-colors font-medium"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  // Loading skeletons
                  <>
                    {[1, 2, 3].map((index) => (
                      <CartItemSkeleton key={index} />
                    ))}
                  </>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex space-x-4">
                          {/* Product Image */}
                          <motion.div 
                            className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ShoppingBag className="w-8 h-8 text-gray-500" />
                          </motion.div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                <p className="text-gray-400">{item.brand}</p>
                                <div className="flex space-x-4 text-sm text-gray-400 mt-1">
                                  <span>Size: {item.size}</span>
                                  <span>Color: {item.color}</span>
                                </div>
                              </div>
                              <motion.button
                                onClick={() => removeItem(item.id)}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                            </div>

                            <div className="flex justify-between items-end">
                              {/* Price */}
                              <div className="flex items-center space-x-2">
                                <motion.span 
                                  className="text-xl font-bold text-[var(--neon-green)]"
                                  key={item.price}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  ${item.price}
                                </motion.span>
                                {item.isOnSale && item.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ${item.originalPrice}
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-3">
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-white" />
                                </motion.button>
                                <motion.span 
                                  className="text-white font-medium w-8 text-center"
                                  key={item.quantity}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.quantity}
                                </motion.span>
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-white" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Trust Badges */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700"
                variants={trustBadgeVariants}
                initial="initial"
                animate="animate"
              >
                {[
                  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $100" },
                  { icon: RotateCcw, title: "30-Day Returns", subtitle: "Easy returns policy" },
                  { icon: Shield, title: "Secure Payment", subtitle: "SSL protected" }
                ].map((badge, index) => (
                  <motion.div 
                    key={badge.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <badge.icon className="w-8 h-8 text-[var(--neon-green)] mx-auto mb-2" />
                    </motion.div>
                    <p className="text-sm text-gray-400">{badge.title}</p>
                    <p className="text-xs text-gray-500">{badge.subtitle}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            variants={summaryVariants}
            initial="initial"
            animate="animate"
          >
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Promo Code</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                        disabled={isPromoApplied}
                      />
                      {!isPromoApplied ? (
                        <motion.button
                          onClick={applyPromoCode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 bg-[var(--neon-green)] text-black font-bold rounded-lg hover:glow-green transition-all"
                        >
                          <Tag className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-4 py-3 bg-green-500/20 text-green-400 rounded-lg flex items-center"
                        >
                          Applied
                        </motion.div>
                      )}
                    </div>
                    <AnimatePresence>
                      {isPromoApplied && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-green-400 text-sm mt-2"
                        >
                          Promo code applied! Save {(discount * 100).toFixed(0)}%
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Price Breakdown */}
                  <motion.div 
                    className="space-y-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <motion.span
                        key={subtotal}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ${subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <AnimatePresence>
                      {discountAmount > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between text-green-400"
                        >
                          <span>Discount</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <motion.span 
                          className="text-[var(--neon-green)]"
                          key={total}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          ${total.toFixed(2)}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--neon-green)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-[var(--neon-green)] text-black font-bold rounded-lg hover:glow-green transition-all mb-4 flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Secure Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Payment Methods */}
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-gray-400 text-sm mb-3">We accept</p>
                    <div className="flex justify-center space-x-3">
                      {['VISA', 'PP', 'AP', 'GP'].map((method, index) => (
                        <motion.div 
                          key={method}
                          className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center"
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {method === 'VISA' ? (
                            <CreditCard className="w-6 h-4 text-gray-400" />
                          ) : (
                            <span className="text-xs text-gray-400 font-bold">{method}</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Continue Shopping */}
                  <Link href="/products">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-3 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-all"
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </motion.div>
  );
}