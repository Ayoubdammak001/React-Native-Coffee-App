import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenTemplate from './ScreenTemplate';
import React, { PropsWithChildren } from 'react';
function AppTemplate(props: PropsWithChildren) {
  const isDarkMode = useColorScheme() === 'dark';
 return (
  <SafeAreaProvider>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {props.children}
  </SafeAreaProvider>
);
}
export default AppTemplate;