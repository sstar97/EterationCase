// ProductListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { useCart } from '../context/CartContext'; // CartContext dosyanızın yolunu doğru şekilde ayarlayın
import { addToFavorites, removeFromFavorites, getFavorites } from '../helper/FavoriteHelper'; // FavoriteHelper dosyanızın yolunu doğru şekilde ayarlayın
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://5fc9346b2af77700165ae514.mockapi.io/products';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const { cart, dispatch } = useCart(); // CartContext dosyanızın yolunu doğru şekilde ayarlayın
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));

    getFavorites().then(favorites => setFavorites(favorites));
  }, []);

  const renderProductItem = ({ item }) => {
    const isFavorite = favorites.some(favorite => favorite.id === item.id);

    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductDetail', item )} // ProductDetailScreen'e geçiş
      >        
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Button
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={() => {
              if (isFavorite) {
                removeFromFavorites(item.id).then(updatedFavorites => setFavorites(updatedFavorites));
              } else {
                addToFavorites(item).then(updatedFavorites => setFavorites(updatedFavorites));
              }
            }}
          />
          <Button
            title="Add to Cart"
            onPress={() => dispatch({ type: 'ADD_TO_CART', product: item })}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductListScreen;
