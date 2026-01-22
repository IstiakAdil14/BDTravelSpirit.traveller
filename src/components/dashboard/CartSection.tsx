'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, MapPin, Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  location: string;
  price: string;
  image?: string;
}

interface CartSectionProps {
  cartItems: CartItem[];
}

export default function CartSection({ cartItems }: CartSectionProps) {
  const total = cartItems.reduce((sum, item) => {
    return sum + parseInt(item.price.replace('৳', '').replace(',', ''));
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
            <p className="text-sm text-gray-500">{cartItems.length} items selected</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {cartItems.slice(0, 2).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group flex items-center space-x-4 p-3 hover:bg-white/60 rounded-xl transition-all duration-300"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-lg">
                  🏞️
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {item.name}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-1">
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-blue-600">{item.price}</div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-4 border-t border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">Total Amount:</span>
            <span className="font-bold text-xl text-blue-600">৳{total.toLocaleString()}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <CreditCard className="w-4 h-4" />
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
      
      {cartItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Cart is empty</h4>
          <p className="text-xs text-gray-500 mb-4">Add some amazing destinations!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse Tours
          </motion.button>
        </motion.div>
      )}
      
      {cartItems.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-4 border-t border-gray-200"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300"
          >
            View {cartItems.length - 2} more items in cart
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}