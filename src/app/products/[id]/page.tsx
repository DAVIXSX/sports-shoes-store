import React from 'react';
import ProductClient, { ProductData } from './ProductClient';

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

// Sample product data (server-side)
const productData: ProductData = {
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

export default function ProductPage({ params }: { params: { id: string } }) {
  // For demo, use the same product data regardless of id
  return <ProductClient product={productData} />;
}
