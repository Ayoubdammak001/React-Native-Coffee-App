import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { PropsWithChildren } from 'react';
import { useTheme } from '../../context/ThemeContext';

function AppTemplate(props: PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {props.children}
    </SafeAreaProvider>
  );
}
export default AppTemplate;