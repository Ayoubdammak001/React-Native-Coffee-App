import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CartItem {
    id: string;
    product: {
        id: number;
        title: string;
        subtitle: string;
        price: number;
        image: any;
    };
    size: string;
    sugarLevel: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, size?: string, sugarLevel?: string) => void;
    updateQuantity: (itemId: string, change: number) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: any, size: string = 'Small', sugarLevel: string = 'No Sugar') => {
        setItems(prevItems => {
            // Vérifier si le produit avec les mêmes options existe déjà
            const existingItem = prevItems.find(
                item => 
                    item.product.id === product.id && 
                    item.size === size && 
                    item.sugarLevel === sugarLevel
            );

            if (existingItem) {
                // Si existe, augmenter la quantité
                return prevItems.map(item =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Sinon, ajouter un nouvel item
                const newItem: CartItem = {
                    id: `${product.id}-${size}-${sugarLevel}-${Date.now()}`,
                    product: {
                        id: product.id,
                        title: product.title,
                        subtitle: product.subtitle,
                        price: product.price,
                        image: product.image,
                    },
                    size,
                    sugarLevel,
                    quantity: 1,
                };
                return [...prevItems, newItem];
            }
        });
    };

    const updateQuantity = (itemId: string, change: number) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const removeFromCart = (itemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

