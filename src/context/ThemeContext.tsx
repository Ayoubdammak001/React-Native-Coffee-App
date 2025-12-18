import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type ThemeName = 'light' | 'dark';

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  primary: string;
  border: string;
  card: string;
  input: string;
};

type Theme = {
  name: ThemeName;
  colors: ThemeColors;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (name: ThemeName) => void;
};

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#000000',
  textMuted: '#666666',
  primary: '#00512C',
  border: '#EAEAEA',
  card: '#FFFFFF',
  input: '#F4F4F4',
};

const darkColors: ThemeColors = {
  background: '#0F1714',
  surface: '#131D19',
  text: '#F5F5F5',
  textMuted: '#A0A0A0',
  primary: '#4DD0A5',
  border: '#223029',
  card: '#1B2621',
  input: '#1F2D26',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<ThemeName>('light');

  const theme = useMemo<Theme>(() => {
    return {
      name,
      colors: name === 'light' ? lightColors : darkColors,
    };
  }, [name]);

  const toggleTheme = () => {
    setName(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newName: ThemeName) => setName(newName);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};


