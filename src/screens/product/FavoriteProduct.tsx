import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';
import { useTheme } from '../../context/ThemeContext';

export default function FavoriteProduct({ navigation }: any) {
    const { addToCart, items } = useCart();
    const { favorites, toggleFavorite } = useFavorite();
    const { theme } = useTheme();
    
    const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Filtrer les produits favoris
    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Favorite</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {favoriteProducts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-outline" size={64} color={theme.colors.textMuted} />
                        <Text style={[styles.emptyText, { color: theme.colors.text }]}>Aucun favori</Text>
                        <Text style={[styles.emptySubtext, { color: theme.colors.textMuted }]}>
                            Ajoutez des produits à vos favoris
                        </Text>
                    </View>
                ) : (
                    <View style={styles.cardRow}>
                        {favoriteProducts.map(product => (
                            <TouchableOpacity
                                key={product.id}
                                style={[styles.card, { backgroundColor: theme.colors.card }]}
                                onPress={() => navigation.navigate("ProductDetails", { product })}
                            >
                                <Image source={product.image} style={styles.cardImage} />

                                <TouchableOpacity 
                                    style={styles.favoriteBtn}
                                    onPress={() => toggleFavorite(product.id)}
                                >
                                    <Ionicons 
                                        name={favorites.includes(product.id) ? "heart" : "heart-outline"} 
                                        size={20} 
                                        color={favorites.includes(product.id) ? "#FF0000" : theme.colors.primary} 
                                    />
                                </TouchableOpacity>

                                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                                    {product.title}
                                </Text>
                                <Text style={[styles.cardSub, { color: theme.colors.textMuted }]}>
                                    {product.subtitle}
                                </Text>

                                <View style={styles.cardBottom}>
                                    <Text style={[styles.cardPrice, { color: theme.colors.primary }]}>
                                        Rp {product.price.toLocaleString()}
                                    </Text>

                                    <TouchableOpacity 
                                        style={styles.addBtn}
                                        onPress={() => addToCart(product)}
                                    >
                                        <Ionicons name="add" size={22} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* BOTTOM TAB */}
            <View style={[styles.bottomTab, { backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name="home" size={26} color={theme.colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart" size={26} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.cartIconContainer}
                >
                    <Ionicons name="cart-outline" size={26} color={theme.colors.textMuted} />
                    {cartItemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails')}>
                    <Ionicons name="person-outline" size={26} color={theme.colors.textMuted} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    card: {
        width: '47%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        height: 110,
        borderRadius: 12,
        marginBottom: 10,
    },
    favoriteBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    cardSub: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#00512C',
    },
    addBtn: {
        backgroundColor: '#00512C',
        padding: 6,
        borderRadius: 20,
    },
    bottomTab: {
        height: 70,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cartIconContainer: {
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#00512C',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
    },
});

