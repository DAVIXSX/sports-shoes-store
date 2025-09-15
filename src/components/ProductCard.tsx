'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  colors?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  isNew = false,
  isOnSale = false,
  colors = []
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[var(--neon-green)] transition-all duration-300"
    >
      {/* Product Image */}
<div className="relative h-60 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-700">
        <Image
          src={image}
          alt={`${brand} ${name}`}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
        >
          <Link href={`/products/${id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-[var(--neon-green)] text-black rounded-full hover:glow-green"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-[var(--neon-orange)] text-black rounded-full hover:glow-orange"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-[var(--neon-green)] text-black text-xs font-bold rounded-full">
              NEW
            </span>
          )}
          {isOnSale && (
            <span className="px-3 py-1 bg-[var(--neon-orange)] text-black text-xs font-bold rounded-full">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-[var(--neon-green)] transition-colors"
        >
          <Heart className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        <p className="text-gray-400 text-sm font-medium mb-1">{brand}</p>
        
        {/* Product Name */}
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[var(--neon-green)] transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-[var(--neon-orange)] fill-current'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm">({reviews})</span>
        </div>

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm">Colors:</span>
            <div className="flex gap-1">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border border-gray-600"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
              {colors.length > 4 && (
                <span className="text-gray-400 text-xs">+{colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[var(--neon-green)] font-bold text-xl">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${originalPrice}
              </span>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[var(--neon-green)] text-black font-bold rounded-full text-sm hover:glow-green transition-all"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;