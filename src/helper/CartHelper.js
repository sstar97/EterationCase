// CartHelper.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@cart';

const getCartFromStorage = async () => {
  try {
    const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  } catch (error) {
    console.error('Error retrieving cart from storage:', error);
    return [];
  }
};

const saveCartToStorage = async (cart) => {
  try {
    const cartJson = JSON.stringify(cart);
    await AsyncStorage.setItem(CART_STORAGE_KEY, cartJson);
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const addToCart = async (product) => {
  const cart = await getCartFromStorage();
  const updatedCart = [...cart, product];
  await saveCartToStorage(updatedCart);
  return updatedCart;
};

const removeFromCart = async (productId) => {
  const cart = await getCartFromStorage();
  const updatedCart = cart.filter(item => item.id !== productId);
  await saveCartToStorage(updatedCart);
  return updatedCart;
};

export { addToCart, removeFromCart };
