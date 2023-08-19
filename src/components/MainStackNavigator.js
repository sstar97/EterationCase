import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './ProductListScreen';
import ProductDetailScreen from './ProductDetailScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName="Products" headerMode="none">
    <Stack.Screen name="Products" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
