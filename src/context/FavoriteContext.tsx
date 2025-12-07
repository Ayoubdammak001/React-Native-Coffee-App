import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteContextType {
    favorites: number[];
    addToFavorites: (productId: number) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    toggleFavorite: (productId: number) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

const FAVORITES_KEY = '@favorites';

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    // Charger les favoris au démarrage
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
            if (favoritesData) {
                setFavorites(JSON.parse(favoritesData));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const saveFavorites = async (newFavorites: number[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const addToFavorites = (productId: number) => {
        setFavorites(prev => {
            if (!prev.includes(productId)) {
                const newFavorites = [...prev, productId];
                saveFavorites(newFavorites);
                return newFavorites;
            }
            return prev;
        });
    };

    const removeFromFavorites = (productId: number) => {
        setFavorites(prev => {
            const newFavorites = prev.filter(id => id !== productId);
            saveFavorites(newFavorites);
            return newFavorites;
        });
    };

    const isFavorite = (productId: number) => {
        return favorites.includes(productId);
    };

    const toggleFavorite = (productId: number) => {
        if (isFavorite(productId)) {
            removeFromFavorites(productId);
        } else {
            addToFavorites(productId);
        }
    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
};

