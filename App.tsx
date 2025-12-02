import React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicNavigation } from './src/navigation/PublicNavigation';
import AppTemplate from './src/screens/templates/AppTemplate';
import AppNavigation from './src/navigation/AppNavigation';
import { CartProvider } from './src/context/CartContext';

function App() {
  console.log();
  
  return (
    <CartProvider>
      <AppTemplate>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </AppTemplate>
    </CartProvider>
  );
}





export default App;