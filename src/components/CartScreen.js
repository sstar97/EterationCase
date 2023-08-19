// CartScreen.js

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useCart } from '../context/CartContext'; // CartContext dosyanızın yolunu doğru şekilde ayarlayın

const CartScreen = () => {
  const { cart, dispatch, removeFromCart } = useCart(); // CartContext dosyanızın yolunu doğru şekilde ayarlayın

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <View style={styles.cartItemQuantity}>
          <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_FROM_CART', productId: item.id })}>
            <Text style={styles.cartItemQuantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => dispatch({ type: 'ADD_TO_CART', product: item })}>
            <Text style={styles.cartItemQuantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Your Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {cart.length > 0 && (
        <Button
          title="Clear Cart"
          onPress={clearCart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartItemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cartItemQuantityButton: {
    fontSize: 20,
    color: 'blue',
    marginHorizontal: 8,
  },
  cartItemQuantityText: {
    fontSize: 18,
  },
});

export default CartScreen;
