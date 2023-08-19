// FavoriteScreen.js

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites, removeFromFavorites } from '../context/FavoriteContext'; // FavoriteHelper dosyanızın yolunu doğru şekilde ayarlayın

const FavoriteScreen = () => {
  const { favorites, dispatch } = useFavorites(); // FavoriteContext dosyanızın yolunu doğru şekilde ayarlayın

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteContainer}
      onPress={() => removeFromFavorites(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoritePrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No favorites yet.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  favoriteImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritePrice: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default FavoriteScreen;
