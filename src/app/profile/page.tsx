'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Edit3, 
  Save,
  X,
  Star,
  Package,
  CreditCard
} from 'lucide-react';

// Sample user data
const userData = {
  id: '1',
  name: 'davis',
  email: 'nextgendev.davis@gmail.com',
  phone: '+213 555005351',
  address: 'algeria , algiers',
  joinDate: '2023-01-15',
  profileImage: '/profile-placeholder.jpg'
};

// Sample order history
const orderHistory = [
  {
    id: 'ORD-001',
    date: '2024-01-10',
    total: 299.99,
    status: 'Delivered',
    items: [
      { name: 'AirMax Pro Runner', quantity: 1, price: 149.99 },
      { name: 'UltraBoost 22', quantity: 1, price: 149.99 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-05',
    total: 189.99,
    status: 'Shipped',
    items: [
      { name: 'React Infinity', quantity: 1, price: 189.99 }
    ]
  }
];

// Sample wishlist
const wishlist = [
  {
    id: '1',
    name: 'ZoomX Vaporfly',
    brand: 'Nike',
    price: 229,
    image: '/shoe1.jpg'
  },
  {
    id: '2',
    name: 'Pegasus 40',
    brand: 'Nike',
    price: 139,
    image: '/shoe2.jpg'
  }
];

// Loading skeleton components
const ProfileSkeleton = () => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
    <div className="text-center mb-6">
      <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4"></div>
      <div className="h-6 bg-gray-800 rounded w-32 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-800 rounded w-48 mx-auto"></div>
    </div>
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-gray-800 rounded-lg"></div>
      ))}
    </div>
  </div>
);

const ContentSkeleton = () => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
    <div className="flex justify-between items-center mb-6">
      <div className="h-8 bg-gray-800 rounded w-48"></div>
      <div className="h-10 bg-gray-800 rounded w-20"></div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-4 bg-gray-800 rounded w-20"></div>
          <div className="h-12 bg-gray-800 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);

  // Simulate loading states
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate tab switching loading
  useEffect(() => {
    if (!isLoading) {
      setTabLoading(true);
      const timer = setTimeout(() => {
        setTabLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isLoading]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const sidebarVariants = {
    initial: { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const tabContentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    console.log('Saving user data:', editData);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
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
      <motion.section 
        className="pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 to-black"
        variants={heroVariants}
        initial="initial"
        animate={isLoading ? "initial" : "animate"}
      >
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center space-y-4">
              <div className="h-16 bg-gray-800 rounded w-80 mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-800 rounded w-64 mx-auto animate-pulse"></div>
            </div>
          ) : (
            <motion.div className="text-center mb-8">
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                MY <span className="text-gradient-green">PROFILE</span>
              </motion.h1>
              <motion.p 
                className="text-gray-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Manage your account and track your athletic journey
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            variants={sidebarVariants}
            initial="initial"
            animate={isLoading ? "initial" : "animate"}
          >
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                {/* Profile Image */}
                <motion.div 
                  className="text-center mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-orange)] rounded-full mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <User className="w-12 h-12 text-black" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">{userData.name}</h3>
                  <p className="text-gray-400">{userData.email}</p>
                </motion.div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-[var(--neon-green)] text-black font-bold'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>
            )}
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            variants={contentVariants}
            initial="initial"
            animate={isLoading ? "initial" : "animate"}
          >
            {isLoading ? (
              <ContentSkeleton />
            ) : (
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <AnimatePresence mode="wait">
                  {tabLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center py-12"
                    >
                      <motion.div
                        className="w-8 h-8 border-2 border-[var(--neon-green)] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeTab}
                      variants={tabContentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                    {!isEditing ? (
                      <motion.button
                        onClick={() => setIsEditing(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-[var(--neon-green)] text-black font-bold rounded-lg hover:glow-green transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </motion.button>
                    ) : (
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={handleSave}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-[var(--neon-green)] text-black font-bold rounded-lg hover:glow-green transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          onClick={handleCancel}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                            <User className="w-5 h-5 text-[var(--neon-green)]" />
                            <span className="text-white">{userData.name}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                            <Mail className="w-5 h-5 text-[var(--neon-green)]" />
                            <span className="text-white">{userData.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                            <Phone className="w-5 h-5 text-[var(--neon-green)]" />
                            <span className="text-white">{userData.phone}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Member Since</label>
                        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                          <Calendar className="w-5 h-5 text-[var(--neon-green)]" />
                          <span className="text-white">{new Date(userData.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6">
                      <label className="block text-gray-400 mb-2">Address</label>
                      <textarea
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--neon-green)] transition-colors"
                        rows={3}
                      />
                    </div>
                  )}

                  {!isEditing && (
                    <div className="mt-6">
                      <label className="block text-gray-400 mb-2">Address</label>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                        <MapPin className="w-5 h-5 text-[var(--neon-green)] mt-0.5" />
                        <span className="text-white">{userData.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">{order.id}</h3>
                            <p className="text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-xl font-bold text-[var(--neon-green)] mt-1">
                              ${order.total}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-gray-300">
                              <span>{item.name} (x{item.quantity})</span>
                              <span>${item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white">{item.name}</h3>
                            <p className="text-gray-400">{item.brand}</p>
                            <p className="text-xl font-bold text-[var(--neon-green)] mt-2">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 py-2 bg-[var(--neon-green)] text-black font-bold rounded-lg hover:glow-green transition-all"
                          >
                            Add to Cart
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                          <span className="text-gray-300">Email notifications for new products</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                          <span className="text-gray-300">SMS notifications for order updates</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                          <span className="text-gray-300">Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-3">Security</h3>
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white">Change Password</span>
                            <Edit3 className="w-4 h-4 text-gray-400" />
                          </div>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white">Two-Factor Authentication</span>
                            <span className="text-sm text-gray-400">Disabled</span>
                          </div>
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-3">Account Actions</h3>
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          <span className="text-white">Download My Data</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-3 bg-red-900/50 border border-red-800 rounded-lg hover:bg-red-900/70 transition-all"
                        >
                          <span className="text-red-400">Delete Account</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}