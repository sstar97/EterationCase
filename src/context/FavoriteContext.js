// FavoriteContext.js

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToFavorites, removeFromFavorites } from '../helper/FavoriteHelper';

const FavoriteContext = createContext();

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return [...state, action.product];
    case 'REMOVE_FROM_FAVORITES':
      return state.filter(item => item.id !== action.productId);
    case 'CLEAR_FAVORITES':
      return [];
    default:
      return state;
  }
};

const FavoriteProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoriteReducer, []);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          dispatch({ type: 'LOAD_FAVORITES', favorites: JSON.parse(storedFavorites) });
        }
      } catch (error) {
        console.error('Error fetching favorites data:', error);
      }
    };

    fetchFavoritesData();
  }, []);

  useEffect(() => {
    const storeFavoritesData = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error storing favorites data:', error);
      }
    };

    storeFavoritesData();
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, dispatch, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};

export { FavoriteProvider, useFavorites };
