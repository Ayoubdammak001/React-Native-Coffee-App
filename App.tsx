import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PublicNavigation } from './src/navigation/PublicNavigation';
import AppTemplate from './src/screens/templates/AppTemplate';
import AppNavigation from './src/navigation/AppNavigation';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { FavoriteProvider } from './src/context/FavoriteContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoriteProvider>
          <AppTemplate>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </AppTemplate>
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;