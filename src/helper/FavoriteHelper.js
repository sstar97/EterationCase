// FavoriteHelper.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

const addToFavorites = async (product) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = [...favorites, product];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

const removeFromFavorites = async (productId) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

const getFavorites = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export { addToFavorites, removeFromFavorites, getFavorites };
