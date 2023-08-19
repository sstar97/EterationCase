import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
import { FavoriteProvider } from './src/context/FavoriteContext';
import MainStackNavigator from './src/components/MainStackNavigator';
import ProductListScreen from './src/components/ProductListScreen';
import CartScreen from './src/components/CartScreen';
import FavoriteScreen from './src/components/FavoriteScreen';
import ProfileScreen from './src/components/ProfileScreen';
import ProductDetailScreen from './src/components/ProductDetailScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <NavigationContainer>
    <CartProvider>
      <FavoriteProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, focused, size }) => {
              let name;
              switch (route.name) {
                case 'Products':
                  name = focused ? 'home' : 'home-outline';
                  break;
                case 'Cart':
                  name = focused ? 'cart' : 'cart-outline';
                  break;
                case 'Favorites':
                  name = focused ? 'heart' : 'heart-outline';
                  break;
                case 'Profile':
                  name = focused ? 'person' : 'person-outline';
                  break;
              }
              return <Ionicons color={color} name={name} size={size} />;
            },
            tabBarActiveTintColor: '#E04403',
            tabBarInactiveTintColor: '#808080',
          })}
        >
          <Tab.Screen name="Products" component={MainStackNavigator} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Favorites" component={FavoriteScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="ProductDetail" options={{ tabBarVisible: false }} component={ProductDetailScreen} />
        </Tab.Navigator>
      </FavoriteProvider>
    </CartProvider>
  </NavigationContainer>
);

export default MainTabNavigator;
