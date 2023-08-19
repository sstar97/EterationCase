// CartContext.js

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart, removeFromCart } from '../helper/CartHelper'; // CartHelper dosyanızın yolunu doğru şekilde ayarlayın

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.productId);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          dispatch({ type: 'LOAD_CART', cart: JSON.parse(storedCart) });
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const storeCartData = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error storing cart data:', error);
      }
    };

    storeCartData();
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
