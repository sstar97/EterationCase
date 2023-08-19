import React from 'react';
import { Image, View, Text, Button } from 'react-native';
import { addToCart } from '../helper/CartHelper'; // CartHelper dosyanızın yolunu doğru şekilde ayarlayın

const ProductDetailScreen = ({ route }) => {
  const item = route.params;
  console.log(route.params)
  console.log(item)
  return item ? (
    <View style={{ padding: 16 }}>
      <Image source={{ uri: item.image }} style={{width: '100%', height: 300}} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Button
        title="Add to Cart"
        onPress={() => {
          addToCart(item); // Sepete ekleme işlemi burada yapılıyor
        }}
      />
    </View>
  ) : null;
};

export default ProductDetailScreen;
