import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartProvider } from './CartContext';
import { FavoriteProvider } from './FavoriteContext';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';

describe('CartScreen', () => {
  it('renders correctly', () => {
    render(
      <CartProvider>
        <CartScreen />
      </CartProvider>
    );
  });

  it('adds item to cart', () => {
    const { getByText } = render(
      <CartProvider>
        <CartScreen />
      </CartProvider>
    );

    fireEvent.press(getByText('Add to Cart'));

    // Expectations here
  });
});

describe('FavoriteScreen', () => {
  it('renders correctly', () => {
    render(
      <FavoriteProvider>
        <FavoriteScreen />
      </FavoriteProvider>
    );
  });

  it('adds item to favorites', () => {
    const { getByText } = render(
      <FavoriteProvider>
        <FavoriteScreen />
      </FavoriteProvider>
    );

    fireEvent.press(getByText('Add to Favorites'));

    // Expectations here
  });

  it('removes item from favorites', () => {
    const { getByText } = render(
      <FavoriteProvider>
        <FavoriteScreen />
      </FavoriteProvider>
    );

    fireEvent.press(getByText('Remove from Favorites'));

    // Expectations here
  });
});
