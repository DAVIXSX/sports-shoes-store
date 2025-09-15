'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  type?: 'checkbox' | 'radio';
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  options, 
  selectedValues, 
  onChange, 
  type = 'checkbox' 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (optionId: string) => {
    if (type === 'radio') {
      onChange([optionId]);
    } else {
      const newValues = selectedValues.includes(optionId)
        ? selectedValues.filter(id => id !== optionId)
        : [...selectedValues, optionId];
      onChange(newValues);
    }
  };

  return (
    <div className="border-b border-gray-800 pb-6 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3 overflow-hidden"
          >
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type={type}
                  name={title}
                  checked={selectedValues.includes(option.id)}
                  onChange={() => handleToggle(option.id)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 ${type === 'radio' ? 'rounded-full' : 'rounded-md'} border-gray-600 mr-3 flex items-center justify-center group-hover:border-[var(--neon-green)] transition-colors`}>
                  {selectedValues.includes(option.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-3 h-3 bg-[var(--neon-green)] ${type === 'radio' ? 'rounded-full' : 'rounded-sm'}`}
                    />
                  )}
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {option.label}
                  {option.count && (
                    <span className="text-gray-500 ml-2">({option.count})</span>
                  )}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterToggle: () => void;
  resultsCount: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onFilterToggle,
  resultsCount
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for shoes..."
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[var(--neon-green)] transition-colors"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-400">
        {resultsCount} products found
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        {/* Filter Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFilterToggle}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white hover:border-[var(--neon-green)] transition-colors lg:hidden"
        >
          <Filter className="w-5 h-5" />
          Filters
        </motion.button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-[var(--neon-green)] transition-colors"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { FilterSection, SearchAndFilter };