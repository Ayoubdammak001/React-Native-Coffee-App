import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '@user_data';
const USERS_KEY = '@registered_users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Récupérer les utilisateurs existants
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      // Vérifier si l'email existe déjà
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return { success: false, error: 'Cet email est déjà utilisé' };
      }

      // Créer le nouvel utilisateur
      const newUser = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        password: password, // ⚠️ En production, utiliser bcrypt ou une autre méthode de hachage
        name: name || '',
        createdAt: new Date().toISOString(),
      };

      // Sauvegarder l'utilisateur
      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Connecter automatiquement l'utilisateur
      const userToStore = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
      setUser(userToStore);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Récupérer les utilisateurs
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      // Trouver l'utilisateur
      const foundUser = users.find(
        (u: any) => u.email === email.toLowerCase().trim() && u.password === password
      );

      if (!foundUser) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Connecter l'utilisateur
      const userToStore = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
      setUser(userToStore);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erreur lors de la connexion' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};